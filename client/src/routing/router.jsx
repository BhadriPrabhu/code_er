import { Route, Routes } from "react-router";
import Login from "../screens/login";
import TestLaunch from "../screens/testLaunch";
import CodingTestPage from "../screens/codingTestPage";
import AdminDashboard from "../screens/adminpage";
import ProtectedRoute from "./protectedRouting";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* User pages */}
      <Route
        path="/launchtest"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <TestLaunch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/testpage"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <CodingTestPage />
          </ProtectedRoute>
        }
      />

      {/* Admin pages */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
