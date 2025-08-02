import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Page Not Found</p>
      <p className="text-gray-400 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-2 rounded bg-white text-black font-semibold hover:bg-gray-300 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
