

const RequestCard = ({ user, onAccept, onReject }) => {
  if (!user) return null;
  return (
    <div className="w-full flex min-w-[700px] rounded-3xl p-6 shadow-[0_15px_30px_rgba(0,0,0,0.9)] border border-white/20 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden transition transform hover:scale-[1.01] duration-300">
      {/* Blurred background */}
      <div className="absolute inset-0 z-0 rounded-3xl bg-gradient-to-tr from-pink-700 via-purple-800 to-indigo-800 opacity-30 blur-3xl"></div>

      {/* Image */}
      <div className="relative z-10 w-40 h-40 flex-shrink-0">
        <img
          src={user.photoUrl || "https://i.pravatar.cc/150?img=3"}
          alt={user.firstname}
          className="w-full h-full rounded-2xl object-cover border-4 border-white shadow-xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between ml-6 text-left w-full">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            {user.firstname || "Unknown"}
          </h3>

          <p className="text-white/70 text-lg capitalize">{user.gender}</p>

          {user.about && <p className="text-white/80 mt-2 text-sm">{user.about}</p>}

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

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={onReject}
            className="px-6 py-2 rounded-xl bg-white/25 text-white hover:bg-red-600 transition duration-300"
          >
            Reject
          </button>
          <button
            onClick={onAccept}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-600 to-teal-500 text-white transition duration-300"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
