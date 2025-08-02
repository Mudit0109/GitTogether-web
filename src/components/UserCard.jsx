import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return null;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const url = `${BASE_URL}/requests/send/${status}/${userId}`;
      const res = await axios.post(url, {}, { withCredentials: true });
      console.log("Request success:", res.data);
      dispatch(removeUserFromFeed(userId)); // Pass userId to remove from feed
    } catch (err) {
      const msg = err?.response?.data?.error || err.message || "Something went wrong";
      console.error(msg);
      alert(msg); // Optionally show user error
    }
  };

  return (
    <div className="w-125 rounded-3xl p-16 shadow-[0_15px_30px_rgba(0,0,0,0.9)] border border-white/20 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden transition transform hover:scale-105 duration-300">
      {/* Gradient blur background */}
      <div className="absolute inset-0 z-0 rounded-3xl bg-gradient-to-tr from-pink-700 via-purple-800 to-indigo-800 opacity-30 blur-3xl"></div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <img
          src={user.photoUrl || "https://i.pravatar.cc/150?img=3"}
          alt={user.firstname}
          className="w-44 h-44 rounded-full border-4 border-white shadow-xl object-cover"
        />

        <h3 className="mt-8 text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          {user.firstname || "Unknown User"}
        </h3>

        <p className="text-xl text-white/70 mt-2 capitalize">{user.gender}</p>

        {user.about && (
          <p className="text-lg text-white/80 mt-6 px-6">{user.about}</p>
        )}

        {user.skills && user.skills.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-4 justify-center">
            {user.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-white/25 text-white text-base px-5 py-2 rounded-full shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 mt-10 flex justify-between w-full">
        <button
          onClick={() => handleSendRequest("ignored", user._id)}
          className="px-8 py-4 rounded-xl bg-white/25 text-white hover:bg-red-600 hover:text-white text-base transition duration-300 shadow-lg"
        >
          Ignore
        </button>
        <button
          onClick={() => handleSendRequest("interested", user._id)}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-700 to-pink-600 text-white text-base transition duration-300 shadow-lg hover:shadow-xl"
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
