import React, { useEffect, useState } from "react";
import api from "../api/api";
import * as XLSX from "xlsx";
import useUserStore from "../store/store";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", questionSet: "", userRole: false });
  const [message, setMessage] = useState("");
  const [excelUsers, setExcelUsers] = useState([]);
  const [selectedQuestionSet, setSelectedQuestionSet] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [viewData, setViewData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const logout = useUserStore((state) => state.logout);
  const setParticipate = useUserStore((state) => state.setParticipate);
  const setAttended = useUserStore((state) => state.setAttended);

  // Static mapping for question sets
  const questionSetMap = {
    questionSet1: () => import("../store/questionSet1"),
    // questionSet2: () => import("../store/questionSet2"),
    // questionSet3: () => import("../store/questionSet3"),
    // Add more here when ready
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Load question set dynamically
  const loadQuestionSet = async (setName) => {
    const loader = questionSetMap[setName];
    if (!loader) return null;
    try {
      const module = await loader();
      return module.default;
    } catch (err) {
      console.error("Error loading question set:", err);
      return null;
    }
  };

  // 🔹 Add single user
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.questionSet) {
      setMessage("Please fill all fields!");
      return;
    }

    const questions = await loadQuestionSet(form.questionSet);
    if (!questions) {
      setMessage("❌ Failed to load questions!");
      return;
    }

    const body = {
      name: form.name,
      email: form.email,
      questions,
      user_role: form.userRole ? "admin" : "user",
    };

    try {
      await api.post("/admin/add-user", body);
      setMessage("✅ User added successfully!");
      setForm({ name: "", email: "", questionSet: "", userRole: false });
      fetchUsers();
    } catch (err) {
      console.error("Error adding user:", err);
      setMessage("❌ Failed to add user!");
    }
  };

  // 🔹 Read Excel file
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Expect columns: Name, Email
      const formatted = jsonData.map((row) => ({
        name: (row.Name || row.name || "").toLowerCase(),
        email: row.Email || row.email || "",
      }));

      setExcelUsers(formatted);
    };
    reader.readAsArrayBuffer(file);
  };

  // 🔹 Bulk upload users
  const handleBulkUpload = async () => {
    if (excelUsers.length === 0) {
      alert("⚠️ No users loaded from Excel!");
      return;
    }
    if (!selectedQuestionSet) {
      alert("⚠️ Please select a question set first!");
      return;
    }

    const questions = await loadQuestionSet(selectedQuestionSet);
    if (!questions) {
      alert("❌ Failed to load question set!");
      return;
    }

    try {
      const body = {
        users: excelUsers.map((u) => ({
          name: u.name,
          email: u.email,
          questions,
          user_role: "user",
        })),
      };

      await api.post(`admin/bulk-add-users`, body);
      alert("✅ Bulk upload successful!");
      setExcelUsers([]);
      fetchUsers();
    } catch (err) {
      console.error("Error uploading users:", err);
      alert("❌ Bulk upload failed!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Filter + sort users
  const filteredUsers = users.filter(
    (user) =>
      user.password?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const markDiff = (b.total_marks ?? 0) - (a.total_marks ?? 0);
    if (markDiff !== 0) return markDiff;
    const timeToSeconds = (t) =>
      t ? t.split(":").reduce((acc, val) => acc * 60 + +val, 0) : Infinity;
    return timeToSeconds(a.time) - timeToSeconds(b.time);
  });

  const USERS_PER_PAGE = 10;
  const totalPages = Math.ceil(sortedUsers.length / USERS_PER_PAGE);
  const displayedUsers = sortedUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  // 🔹 Delete user
  const handleDeleteUser = async (email) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/admin/delete-user/${email}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // 🔹 View user details
  const handleView = (email) => {
    setIsOpen(true);
    api.post("/admin/user-details", { email })
      .then((res) => {setViewData(res.data)})
      .catch((err) => console.error("Failed to fetch details:", err));
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    logout();
    setParticipate(false);
    setAttended(false);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-gray-800 p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </header>

      {/* Add Single User */}
      <div className="bg-gray-800 p-6 rounded-lg mb-10 max-w-xl mx-auto shadow-lg">
        <h2 className="text-xl mb-4 font-semibold text-center">Add Single User</h2>
        <form onSubmit={handleAddUser} className="flex flex-col gap-3 text-black">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value.toLowerCase() })}
            className="p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="p-2 rounded"
          />
          <select
            value={form.questionSet}
            onChange={(e) => setForm({ ...form, questionSet: e.target.value })}
            className="p-2 rounded"
          >
            <option value="">Select Question Set</option>
            <option value="questionSet1">Question Set 1</option>
            {/* Add more sets when available */}
          </select>
          <div className="text-white flex items-center gap-2">
            <p>Admin:</p>
            <input
              type="checkbox"
              checked={form.userRole}
              onChange={(e) => setForm({ ...form, userRole: e.target.checked })}
              className="p-2 w-4 h-4"
            />
          </div>
          <button className="bg-green-600 p-2 rounded hover:bg-green-700 text-white font-semibold">
            Add User
          </button>
        </form>
        {message && <p className="text-center mt-3 text-sm text-gray-300">{message}</p>}
      </div>

      {/* Bulk Upload */}
      <div className="bg-gray-800 p-6 rounded-lg mb-10 max-w-xl mx-auto shadow-lg">
        <h2 className="text-xl mb-4 font-semibold text-center">Bulk Upload Users</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="p-2 bg-gray-700 rounded text-white w-full"
        />
        <select
          value={selectedQuestionSet}
          onChange={(e) => setSelectedQuestionSet(e.target.value)}
          className="p-2 rounded mt-3 text-black w-full"
        >
          <option value="">Select Question Set</option>
          <option value="questionSet1">Question Set 1</option>
        </select>
        <button
          onClick={handleBulkUpload}
          disabled={excelUsers.length === 0}
          className="bg-cyan-600 mt-3 p-2 rounded w-full hover:bg-cyan-700 disabled:opacity-50"
        >
          Upload {excelUsers.length} Users
        </button>
      </div>


      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Box */}
          <div
            className="bg-white rounded-2xl shadow-xl w-11/12 max-h-[90vh] overflow-y-auto sm:w-3/4 lg:w-1/2 p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold mb-1 text-center text-blue-700">
              User Details
            </h2>

            {/* User Info */}
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-black">
                <span className="font-semibold text-gray-700">Name:</span>{" "}
                {viewData.password || ""}
              </p>
              <p className="text-black">
                <span className="font-semibold text-gray-700">Email:</span>{" "}
                {viewData.email || ""}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Total Marks:</span>{" "}
                <span className="text-green-600 font-bold">
                  {viewData.total_marks || ""}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-700">Preferred Language:</span>{" "}
                <span className="text-green-600 font-bold">
                  {viewData.preferred_lang || ""}
                </span>
              </p>
            </div>

            {/* Answers List */}
            <div className="space-y-3">
              {viewData?.answers?.map((ans, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-gray-800">
                      Question {ans.questionId}
                    </h3>
                    <span
                      className={`font-semibold ${ans.earnedMarks === 0
                        ? "text-red-600"
                        : ans.earnedMarks >= 8
                          ? "text-green-600"
                          : "text-yellow-600"
                        }`}
                    >
                      +{ans.earnedMarks}
                    </span>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-2 rounded-md text-xs overflow-x-auto">
                    {ans.userAnswer}
                  </pre>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Leaderboard */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto max-w-7xl mx-auto">
        <h2 className="text-xl mb-4 text-center font-semibold">Leaderboard</h2>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full max-w-md rounded bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3">Rank</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Preferred Lang</th>
              <th className="p-3">Total Marks</th>
              <th className="p-3">Time Taken</th>
              <th className="p-3">Participated</th>
              <th className="p-3">Tab Changed</th>
              <th className="p-3">FullScreen out</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user, idx) => (
              <tr key={user.id} className={idx % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}>
                <td className="p-3">{(currentPage - 1) * USERS_PER_PAGE + idx + 1}</td>
                <td className="p-3">{user.password}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.preferred_lang}</td>
                <td className="p-3">{user.total_marks ?? 0}</td>
                <td className="p-3">{user.time ?? "-"}</td>
                <td className="p-3">{user.is_participate ? "Yes" : "No"}</td>
                <td className="p-3">{user.is_tab_change ? "Yes" : "No"}</td>
                <td className="p-3">{user.is_fullscreen_out ? "Yes" : "No"}</td>
                <td className="p-3">{user.user_role}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleView(user.email)}
                    className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.email)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${page === currentPage ? "bg-cyan-600" : "bg-gray-700"
                }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
