import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addConnections } from "../utils/connectionSlice"; // triple 'n' check your slice
import { BASE_URL } from "../utils/constants";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connections = useSelector((store) => store.connection); // make sure this matches your reducer key

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data || []));
    } catch (err) {
      console.error("Failed to fetch connections:", err);
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-10 px-4 text-white relative min-h-screen overflow-hidden">
      {/* Glowing animated background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#00FFC6] via-[#7F00FF] to-[#1E1E1E] blur-3xl opacity-30 animate-pulse rounded-2xl" />

      {/* Glass effect container */}
      <div>
        {!Array.isArray(connections) || connections.length === 0 ? (
          <p className="text-gray-300 text-center">No connections yet.</p>
        ) : (
          <ul className="space-y-5 flex flex-col items-center m-5 w-full">
            {connections.map((user) => (
              <li key={user._id} className="w-full max-w-5xl px-15">
                <ConnectionCard user={user} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Connections;
