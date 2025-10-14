import { useState } from "react";
import { useNavigate } from "react-router";
import useUserStore from "../store/store";
import api from "../api/api";


export default function Login() {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);
  const setRole = useUserStore((state) => state.setRole);
  const setPassword = useUserStore((state) => state.setPassword);
  const setParticipate = useUserStore((state) => state.setParticipate);
  const setAttended = useUserStore((state) => state.setAttended)
  const setEmail = useUserStore((state) => state.setEmail);

  const [auth, setAuth] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleLogin = () => {
    if(!auth.email || !auth.password){
      setError("Please enter both email and password.");
      return;
    }
    const body = { email: auth.email, password: auth.password };
    api.post(`${import.meta.env.VITE_API}/api/login`, body)
      .then((res) => {
        console.log(res)
        const role = res.data.role; // get role string
        setRole(role);
        const item = res.data.isParticipate;
        setParticipate(item);
        setAttended(item ? true : false)
        setEmail(auth.email);
        setPassword(auth.password);
        login(); // sets isAuth = true
        setAuth({ email: "", password: "" });

        // Navigate based on role
        if (role === "admin") navigate("/admin");
        else navigate("/launchtest");
      })
      .catch((err) => {
        console.error(err);
        setAuth({ email: "", password: "" });
        if (err.response?.data?.message) setError(err.response.data.message);
        else setError("Something went wrong. Try again!");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#040816] text-gray-100 relative overflow-hidden px-4 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#00ffff20_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:20px_20px] md:bg-[size:22px_22px] animate-pulse-slow animate-gridMove"></div>

      <div className="absolute -top-20 -right-20 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-cyan-500/30 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-blue-700/30 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md bg-[#0A1224]/90 backdrop-blur-lg rounded-2xl border border-cyan-400/30 shadow-[0_0_40px_rgba(0,255,255,0.15)] p-6 sm:p-8 transition-transform">

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-cyan-400 tracking-[0.2em] sm:tracking-[0.25em]">
            CODE<span className="text-white"> ER</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2 italic">
            “Debug • Fix • Dominate”
          </p>
          <div className="w-12 sm:w-16 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-2 sm:mt-3 rounded-full"></div>
        </div>

        <div className="flex justify-center items-center text-xs sm:text-sm text-cyan-400 font-medium gap-2 mt-3 sm:mt-4">
          <img
            src="/ieeelogo.png"
            alt="IEEE Logo"
            className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]"
          />
          <span className="tracking-wider">| BIT Student Branch</span>
        </div>

        <div className="flex flex-col space-y-4 sm:space-y-5">
          {error && (
            <div className="flex items-center bg-red-600/80 text-white text-sm sm:text-base px-3 py-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                />
              </svg>
              {error}
            </div>
          )}

          <div>
            <label className="text-xs sm:text-sm text-gray-300">Email ID</label>
            <input
              type="email"
              required
              onChange={(e) => setAuth({ ...auth, email: e.target.value })}
              value={auth.email}
              className="w-full mt-1 px-3 py-2.5 sm:py-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:border-cyan-400 transition placeholder-gray-500 text-sm sm:text-base"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm text-gray-300">Password</label>
            <input
              type="password"
              onChange={(e) => setAuth({ ...auth, password: e.target.value.toLowerCase() })}
              value={auth.password}
              required
              className="w-full mt-1 px-3 py-2.5 sm:py-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:border-cyan-400 transition placeholder-gray-500 text-sm sm:text-base"
            />
          </div>

          <button
            onClick={handleLogin}
            className="py-2.5 sm:py-3 rounded-md bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 font-semibold tracking-wide hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            aria-label="Enter Debug Zone"
          >
            Enter Debug Zone
          </button>
        </div>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
          <span className="text-cyan-400">#CodeWarriors</span> — Every bug is a challenge.
        </p>
      </div>
    </div>
  );
}