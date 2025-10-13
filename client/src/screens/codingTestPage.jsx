import { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import useUserStore from "../store/store";
import { useNavigate } from "react-router";
import axios from "axios";

export default function CodingTestPage() {
  const questions = useUserStore((state) => state.questions);
  const email = useUserStore((state) => state.email);
  const preferred_lang = useUserStore((state) => state.preferredLang);
  const participate = useUserStore((state) => state.isParticipate);
  const setAttended = useUserStore((state) => state.setAttended);
  const isAttended = useUserStore((state) => state.isAttended);
  const navigate = useNavigate();

  const [currentQ, setCurrentQ] = useState(0);
  const [code, setCode] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [submitOver, setSubmitOver] = useState(false);
  const [answers, setAnswers] = useState([]);

  const timerRef = useRef(null);
  const tabChangedRef = useRef(false);
  const isEndingRef = useRef(false);


  useEffect(() => {
    if (participate && isAttended) {
      navigate("/launchtest", { replace: true });
    }
  }, [participate, isAttended, navigate]);


  useEffect(() => {
    return () => {
      isEndingRef.current = false;
    };
  }, []);


  useEffect(() => {
    document.documentElement.requestFullscreen?.();

    const handleTabSwitch = () => {
      if (isEndingRef.current) return;
      if (!tabChangedRef.current) {
        tabChangedRef.current = true;
        alert("Tab switch or app switch detected! Test terminated.");
        axios
          .post(`${import.meta.env.VITE_API}/api/istab`, { email, is_tab_change: true, is_end: true })
          .catch((err) => console.error(err));
        endTest();
      }
    };

    const handleFullScreenChange = () => {
      if (isEndingRef.current) return;
      if (!document.fullscreenElement) {
        alert("Exited fullscreen! Test terminated.");
        axios
          .post(`${import.meta.env.VITE_API}/api/isfull`, { email, is_fullscreen_out: true, is_end: true })
          .catch((err) => console.error(err));
        endTest();
      }
    };

    // Detect visibility change (tab switch, backgrounding)
    const handleVisibilityChange = () => {
      if (document.hidden) handleTabSwitch();
    };

    // Detect window blur (desktop app switch)
    const handleBlur = () => handleTabSwitch();

    // Detect page close or navigation away
    const handlePageHide = () => handleTabSwitch();

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [email]);

  // --- Timer ---
  useEffect(() => {
    timerRef.current = setInterval(() => setTimeLeft((prev) => Math.max(prev - 1, 0)), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      alert("Time’s up! Test auto-submitted.");
      endTest();
    }
  }, [timeLeft]);

  useEffect(() => {
    const disableKeys = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
        alert("Inspecting is disabled during the test!");
      }
    };
    const block = (e) => e.preventDefault();
    document.addEventListener("keydown", disableKeys);
    document.addEventListener("contextmenu", block);
    document.addEventListener("copy", block);
    document.addEventListener("paste", block);
    return () => {
      document.removeEventListener("keydown", disableKeys);
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("copy", block);
      document.removeEventListener("paste", block);
    };
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // --- Submit Current Question ---
  const handleSubmit = () => {
    const currentQuestion = questions[currentQ];
    if (!currentQuestion) return;

    const normalize = (str) =>
      str
        .replace(/\r/g, "")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join("\n")
        .replace(/\s+/g, "")
        .toLowerCase();

    const normalizedUserCode = normalize(code);
    const correctAnswers = (currentQuestion.evaluation_answers || []).map((a) => normalize(a.answer));

    let earned = 0;
    for (const correct of correctAnswers) {
      if (normalizedUserCode === correct) {
        earned = 10;
        break;
      }
    }

    setAnswers((prev) => [...prev, { questionId: currentQuestion.id, userAnswer: code, earnedMarks: earned }]);
    setScore((prev) => prev + earned);

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setCode("");
    } else {
      setSubmitOver(true);
      console.log(`✅ Test Completed! Total Score: ${score + earned}`);
    }
  };

  // --- Finish Test ---
  const handleFinish = () => {
    alert("Finish Test");

    const formatTimeBackend = (seconds) => {
      const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
      const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
      const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
      return `${hrs}:${mins}:${secs}`;
    };

    const totalTime = 30 * 60;
    const timeUsed = totalTime - timeLeft;

    const body = {
      email,
      is_finish: true,
      is_end: true,
      total_marks: score,
      time: formatTimeBackend(timeUsed),
      answers,
    };

    axios
      .post(`${import.meta.env.VITE_API}/api/isFinish`, body)
      .then((res) => console.log("Submitted successfully", res.data))
      .catch((err) => console.error(err));

    endTest();
  };

  const endTest = () => {
    isEndingRef.current = true;
    clearInterval(timerRef.current);
    document.exitFullscreen?.();
    navigate("/launchtest");
    setAttended(true);
  };

  const currentQuestion = questions[currentQ] || {};

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#040816] text-gray-100 font-[Montserrat] overflow-hidden relative">
      {/* Header Controls */}
      <div className="fixed md:absolute bg-[#040816]/90 backdrop-blur-md border-b border-cyan-500/20 top-0 left-0 right-0 z-10 px-4 pt-4 pb-4 flex flex-wrap justify-between items-center gap-2">
        <div className="bg-blue-600/30 px-3 py-2 rounded-md text-sm sm:text-base font-semibold border border-blue-500/30">
          Code ER
        </div>
        <div className="flex gap-2 sm:gap-4 items-center">
          <div className="bg-cyan-600/30 px-3 py-2 rounded-md text-sm sm:text-lg font-semibold border border-cyan-500/30">
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={handleFinish}
            className="px-3 sm:px-4 py-2 bg-gradient-to-r from-cyan-700 to-blue-900 text-sm sm:text-lg font-semibold rounded-lg hover:scale-105 transition"
          >
            Finish
          </button>
        </div>
      </div>

      {/* ===== LEFT SIDE ===== */}
      <div className="w-full md:w-1/2 p-4 sm:p-6 sm:pt-20 md:p-8 md:pt-20 lg:p-10 lg:pt-20 pt-20 bg-[#0A1224]/90 border-b md:border-b-0 md:border-r border-cyan-500/20">
        <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-3">Debug Task {currentQ + 1}</h2>
        <p className="text-gray-300 text-sm sm:text-base mb-2">{currentQuestion.title}</p>
        <p className="text-gray-400 text-xs sm:text-sm italic mb-4">
          (This code contains an intentional error. Identify and correct it.)
        </p>

        <div className="rounded-lg overflow-hidden border border-cyan-500/30 bg-[#0E1B33]">
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/20 px-3 py-2 border-b border-cyan-500/20 text-xs sm:text-sm font-semibold text-cyan-300">
            Buggy Code:
          </div>

          <MonacoEditor
            height="35vh"
            language={preferred_lang === "C" ? "c" : "python"}
            theme="vs-dark"
            value={currentQuestion.question || endTest()}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 13,
              lineNumbers: "on",
              padding: { top: 10 },
              contextmenu: false,
            }}
            onMount={(editor) => {
              editor.onKeyDown((e) => {
                if (e.ctrlKey || e.metaKey) e.preventDefault();
              });
              editor.updateOptions({ contextmenu: false });
            }}
          />

          <div className="border-t border-cyan-500/20 bg-[#08152A] px-3 py-3 text-xs sm:text-sm">
            <p className="text-cyan-300 font-semibold mb-1">Expected Output:</p>
            <pre className="text-gray-200 font-mono whitespace-pre-wrap text-xs sm:text-sm">
              {currentQuestion.expected_output || "*****\n****\n***\n**\n*"}
            </pre>
          </div>
        </div>
      </div>

      {/* ===== RIGHT SIDE ===== */}
      <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 md:pt-20 lg:p-10 lg:pt-20 pt-20 flex flex-col">
        <div className="flex justify-between mb-3 items-center text-xs sm:text-base">
          <span>Preferred Language: {preferred_lang}</span>
          <button
            onClick={handleSubmit}
            disabled={submitOver}
            className={`px-3 py-2 rounded-md text-sm sm:text-base transition ${submitOver
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105"
              }`}
          >
            Submit
          </button>
        </div>

        <div className="rounded-lg overflow-hidden border border-cyan-500/30 bg-[#0E1B33]">
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/20 px-3 py-2 border-b border-cyan-500/20 text-xs sm:text-sm font-semibold text-cyan-300">
            Corrected Code:
          </div>

          <MonacoEditor
            height="65vh"
            defaultLanguage={preferred_lang === "C" ? "c" : "python"}
            theme="vs-dark"
            value={code}
            onChange={(v) => setCode(v)}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 13,
              lineNumbers: "on",
              padding: { top: 10 },
              contextmenu: false,
            }}
            onMount={(editor) => {
              editor.onKeyDown((e) => {
                if (e.ctrlKey || e.metaKey) e.preventDefault();
              });
              editor.updateOptions({ contextmenu: false });
            }}
          />
        </div>
      </div>
    </div>
  );
}
