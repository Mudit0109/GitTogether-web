import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Aurora from "./Aurora";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
  }, [user, navigate]);

  return (
    <>
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* Galaxy background section with overlay text */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {/* Galaxy stars background */}

        {/* Overlay content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
            Welcome to GitTogether!
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto drop-shadow-md">
            Connect, collaborate, and code with other developers in your community.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/login"
              className="px-6 py-3 rounded-lg bg-pink-600 hover:bg-pink-700 transition-all duration-300 font-semibold text-white"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-6 py-3 rounded-lg border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-semibold"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
