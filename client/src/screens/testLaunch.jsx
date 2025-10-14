import { useNavigate } from "react-router";
import useUserStore from "../store/store";
import api from "../api/api";
import { useState, useCallback, useEffect } from "react";

export default function TestLaunch() {
  const navigate = useNavigate();
  const preferredLang = useUserStore((state) => state.preferredLang);
  const email = useUserStore((state) => state.email);
  const password = useUserStore((state) => state.password);
  const setPreferredLang = useUserStore((state) => state.setPreferredLang);
  const setQuestions = useUserStore((state) => state.setQuestions);
  const logout = useUserStore((state) => state.logout);
  const setParticipate = useUserStore((state) => state.setParticipate);
  const setAttended = useUserStore((state) => state.setAttended);
  const Participate = useUserStore((state) => state.isParticipate);
  const [showWarning, setShowWarning] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isParticipate, setIsParticipate] = useState(false);

  const testStartTime = new Date("2025-10-08T17:00:00");
  const testEndTime = new Date("2025-10-15T20:00:00");
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date();
    if (now < testStartTime) return 0;
    return Math.max(0, Math.floor((testEndTime - now) / 1000));
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now < testStartTime || now > testEndTime) {
        setTimeLeft(0);
        clearInterval(timer);
      } else {
        setTimeLeft(Math.floor((testEndTime - now) / 1000));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [testStartTime, testEndTime]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const dismissWarning = useCallback(() => {
    setShowWarning(false);
  }, []);

  const handleStartTest = useCallback(() => {
    if (!preferredLang) {
      alert("Select Preferred Language.");
      return;
    }
    setShowModal(true);
  }, [preferredLang]);

  const handleProceed = () => {
    setShowModal(false);
    const body = {
      email: email,
      preferred_lang: preferredLang,
      is_participate: true,
    };
    api.post("/api/test", body)
      .then((e) => {
        const result = e.data.message.rows?.[0]?.["?column?"] || [];
        const item = e.data.res || {};
        setQuestions(result);
        setIsParticipate(!!item.is_participate);
        setParticipate(!!item.is_participate);
        navigate("/testpage");
        // Trigger fullscreen
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.error("Failed to enter fullscreen:", err);
          });
        }


      })
      .catch((err) => {
        console.error("Error starting test:", err);
        alert("Failed to start test. Please try again.");
      });
  };

  const handleLogout = () => {
    logout();
    setIsParticipate(false);
    setAttended(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-[#040816] text-gray-100 font-[Montserrat] relative overflow-hidden px-4 sm:px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#00ffff20_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:20px_20px] md:bg-[size:22px_22px] animate-gridMove"></div>

      <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-700/20 blur-[100px] rounded-full"></div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between p-6 sm:p-8 lg:p-10 gap-8">
        {/* LEFT PANEL */}
        <div className="flex-1 bg-[#0A1224]/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
          <div className="flex justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-3">
              Welcome, <span className="text-white">Debugger</span>
            </h1>
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              {password[0]?.toUpperCase() || "D"}
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-400 mb-6">
            Gear up to enter the <span className="text-cyan-400 font-semibold">Code ER</span> Arena.
          </p>

          <div className="bg-[#09132A] border border-cyan-500/20 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">Test Info</h2>
            <p><span className="text-gray-400">Duration:</span> <span className="text-white font-medium">30 mins (5 PM – 8 PM)</span></p>
            <p><span className="text-gray-400">Languages:</span> <span className="text-white font-medium">C / Python</span></p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-3">
              <span className="text-sm">Preferred Language:</span>
              <div className="flex gap-2">
                {["C", "Python"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setPreferredLang(lang)}
                    className={`px-4 py-1.5 rounded-md border text-sm transition-all ${preferredLang === lang
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent"
                      : "border-cyan-400/30 text-gray-400 hover:text-cyan-300"
                      }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {timeLeft > 0 ? (timeLeft > 0 && timeLeft < 10800) && (
              <div className="bg-cyan-700/30 text-white px-3 py-1 rounded-md font-semibold text-sm sm:text-base shadow-md">
                Test Portal closes in {formatTime(timeLeft)}
              </div>
            ) : (
              <div className="mt-4 bg-red-700/30 text-red-400 px-3 py-1 rounded-md font-semibold text-sm shadow-md">
                Test Portal is closed
              </div>
            )}
          </div>

          {showWarning && (
            <div className="relative bg-gradient-to-r from-yellow-900/20 to-red-900/20 border border-yellow-500/40 rounded-xl p-5 mb-6 animate-pulseGlow">
              <p className="text-yellow-300 font-semibold mb-1">⚠️ Read Instructions First</p>
              <p className="text-gray-300 text-sm">
                Avoid refreshing or switching tabs during the test. Once submitted, changes cannot be made.
              </p>
              <button
                onClick={dismissWarning}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex flex-col gap-4 mt-6">
            {!Participate ? (
              <button
                onClick={handleStartTest}
                disabled={timeLeft <= 0 || !preferredLang}
                className={`w-full py-3 rounded-md font-semibold text-lg transition-all ${timeLeft <= 0 || !preferredLang
                  ? "bg-gray-600/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:scale-105"
                  }`}
              >
                {!preferredLang ? "Select Preferred Language to Continue" : "Start Debugging"}
              </button>
            ) : (
              <button className="w-full py-3 rounded-md bg-red-800 font-semibold text-lg">
                Already Attended
              </button>
            )}
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-md font-semibold text-lg bg-red-500 hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-1/3 bg-[#0A1224]/80 border border-cyan-500/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,255,255,0.05)]">
          <h2 className="text-xl font-semibold text-cyan-300 mb-4">Instructions ⚙️</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
            <li>Ensure a stable internet connection before starting.</li>
            <li>Select only one language - C or Python.</li>
            <li>Do not refresh or close the tab once started.</li>
            <li>Exiting fullscreen will terminate the test.</li>
            <li>Switching tabs will immediately end your test.</li>
            <li>Inspect element, copy-paste, or console access is blocked.</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-1 right-4 text-xs text-gray-400 italic z-50">
        Developed By{" "}
        <a
          href="https://www.linkedin.com/in/bhadri-prabhu-k-7a111b326"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 font-semibold hover:underline"
        >
          Bhadri Prabhu K
        </a>
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-[#0A1224] border border-cyan-500/30 rounded-2xl max-w-md w-full p-6 text-center shadow-xl">
            <h2 className="text-xl font-bold text-cyan-400 mb-3">Final Instructions ⚠️</h2>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Once you start, the screen will go fullscreen.
              Exiting fullscreen or switching tabs will <span className="text-red-400 font-semibold">end your test immediately</span>.
              You have 30 minutes to complete the debugging questions.
            </p>

            <ul className="text-left list-disc text-sm text-gray-300 space-y-2 pl-5 mb-6">
              <li>Do NOT press F12 or open developer tools.</li>
              <li>Do NOT refresh, minimize, or switch applications.</li>
              <li>Do NOT copy-paste or use any external code editor.</li>
              <li>Stay focused — your time continues even if idle.</li>
            </ul>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-md border border-cyan-500/30 text-gray-300 hover:text-white hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleProceed}
                className="px-6 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
