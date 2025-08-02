import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/signup`, form, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.errors?.[0] ||
        "Something went wrong";
      setError(msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 relative">
      {/* Glowing Backgrounds */}
      <div className="absolute top-10 left-24 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse z-0"></div>
      <div className="absolute bottom-16 right-24 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse z-0"></div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl p-8 bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-white transition-transform duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
          Sign Up for GitTogether
        </h2>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="form-control">
            <label className="text-sm text-white/80 mb-1">First Name</label>
            <input
              type="text"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              placeholder="John"
              className="input w-full bg-white/10 placeholder-white/70 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 border border-white/20 transition-all duration-200"
              required
            />
          </div>

          <div className="form-control">
            <label className="text-sm text-white/80 mb-1">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              placeholder="Doe"
              className="input w-full bg-white/10 placeholder-white/70 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-white/20 transition-all duration-200"
            />
          </div>

          <div className="form-control">
            <label className="text-sm text-white/80 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="input w-full bg-white/10 placeholder-white/70 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 border border-white/20 transition-all duration-200"
              required
            />
          </div>

          <div className="form-control">
            <label className="text-sm text-white/80 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input w-full bg-white/10 placeholder-white/70 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-white/20 transition-all duration-200"
              required
            />
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:brightness-110 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-white/70">
          Already have an account?{" "}
          <a href="/login" className="text-pink-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
