import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      const result = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { age, gender, photoUrl, skills: skillsArray, about },
        { withCredentials: true }
      );

      dispatch(addUser(result.data.user));
      setSuccess(result.data.message);
      setTimeout(() => navigate("/profile"), 1500);
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
      <div className="absolute top-10 left-20 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse z-0"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse z-0"></div>

      {/* Profile Edit Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl p-8 bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-white">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
          Edit Your Profile
        </h2>

        {photoUrl && (
          <img
            src={photoUrl}
            alt="Preview"
            className="h-24 w-24 mx-auto rounded-full object-cover border-4 border-white/30 shadow-md mb-4"
          />
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-white/80 mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-white/10 text-white px-4 py-2 rounded-xl placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Enter your age"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-white/10 text-white px-4 py-2 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            >
              <option value="" disabled>Select your gender</option>
              <option value="male" className="text-black">Male</option>
              <option value="female" className="text-black">Female</option>
              <option value="other" className="text-black">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Photo URL</label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full bg-white/10 text-white px-4 py-2 rounded-xl placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Skills</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., React, Node.js, MongoDB"
              className="w-full bg-white/10 text-white px-4 py-2 rounded-xl placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell us about yourself"
              className="w-full bg-white/10 text-white px-4 py-2 rounded-xl placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-sm text-center">{success}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:brightness-110 text-white font-semibold py-2 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
