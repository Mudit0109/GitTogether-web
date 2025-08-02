import { useEffect, useState } from "react";

const phrases = [
  "Connecting developers…",
  "Building together…",
  "Coding community…",
  "GitTogether in progress…",
];

const LoadingPage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500); // change phrase every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 opacity-20 blur-2xl animate-pulse"></div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

        {/* Animated phrase */}
        <p className="text-2xl font-semibold drop-shadow-lg min-w-[220px] text-center">
          {phrases[index]}
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
