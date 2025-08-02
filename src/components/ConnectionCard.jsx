import { useNavigate } from "react-router-dom";

const ConnectionCard = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  const handleChatClick = () => {
    navigate(`/chat/${user._id}`);
  };

  return (
    <div className="w-full max-w-3xl flex items-center justify-between rounded-3xl p-6 shadow-[0_15px_30px_rgba(0,0,0,0.9)] border border-white/20 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden transition transform hover:scale-[1.01] duration-300">
      {/* Blurred gradient background */}
      
      <div className="absolute inset-0 z-0 rounded-3xl bg-gradient-to-tr from-pink-700 via-purple-800 to-indigo-800 opacity-30 blur-3xl"></div>

      {/* Image & Info Section */}
      <div className="relative z-10 flex items-center w-full">
        {/* Image */}
        <div className="w-40 h-40 flex-shrink-0">
          <img
            src={
              user.photoUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeE8Sti7nupldscJu8jVr8ecoimhS5tkG-3Q&s"
            }
            alt={user.firstname}
            className="w-full h-full rounded-2xl object-cover border-4 border-white shadow-xl"
          />
        </div>

        {/* Content */}
        <div className="ml-6 flex flex-col justify-center text-left">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            {user.firstname || "Unknown User"}
          </h3>

          <p className="text-white/70 text-lg capitalize">{user.gender}</p>

          {user.about && (
            <p className="text-white/80 mt-2 text-sm">{user.about}</p>
          )}

          {user.skills && user.skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {user.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-white/25 text-white text-sm px-4 py-1 rounded-full shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Button Section */}
      <div className="relative z-10 ml-6 flex-shrink-0">
        <button
          onClick={handleChatClick}
          className="w-24 h-14 flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg font-semibold rounded-lg shadow-2xl transition duration-300"
        >
          Chat
        </button>
      </div>
    </div>
  );
};

export default ConnectionCard;
