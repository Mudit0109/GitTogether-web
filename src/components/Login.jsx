import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        BASE_URL + "/login",
        { email: emailId, password },
        { withCredentials: true }
      );

      console.log("Login successful:", result.data);
      dispatch(addUser(result.data));
      return navigate("/feed");
    } catch (err) {
      const msg = err?.response?.data?.error || "Something went wrong";
      setError(msg);
      console.error("Login failed:", msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 relative">
      {/* Background Glow & Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-40 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-40 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl p-8 bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-white transition-transform duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
          Login to GitTogether
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="form-control">
            <label className="text-sm text-white/80 mb-1">Email</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="email@example.com"
              className="input w-full bg-white/10 placeholder-white/70 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 border border-white/20 transition-all duration-200"
              required
            />
          </div>

          <div className="form-control">
            <label className="text-sm text-white/80 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full bg-white/10 placeholder-white/70 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-white/20 transition-all duration-200"
              required
            />
            <div className="flex justify-end text-xs mt-1">
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:brightness-110 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-white/70">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-pink-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
