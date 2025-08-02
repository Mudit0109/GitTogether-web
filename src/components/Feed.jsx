import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import LoadingPage from './LoadingPage';
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/login");
      } else {
        console.error("Failed to fetch feed:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <div className="text-white relative">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="pt-10 px-4 text-white relative">
      {/* THEME BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#ff007a] via-[#7f00ff] to-[#00e0ff] opacity-30 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-25 blur-2xl" />
      </div>

      <div className="relative z-10">
        {!feed || feed.length === 0 ? (
          <>
            <p className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mt-10 text-center">
              No new users found Yet.
            </p>
          </>
        ) : (
          <ul className="space-y-5 flex flex-col items-center m-5">
            {feed && (
              <li key={feed[0]._id}>
                <UserCard user={feed[0]} />
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Feed;
