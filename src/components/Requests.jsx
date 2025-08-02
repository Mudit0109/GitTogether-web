import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import RequestCard from "./RequestCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/requests/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      const msg = err?.response?.data?.error || "Something went wrong";
      console.log(msg);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/requests/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data));
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="pt-10 px-4 min-h-screen relative bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="absolute inset-0 z-0 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 opacity-20 blur-3xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Connection Requests</h2>

        {!requests || requests.length === 0 ? (
          <p className="text-gray-300 text-center">No requests received.</p>
        ) : (
          <ul className="space-y-6 flex flex-col items-center">
            {requests.map((req) => (
              <li key={req._id} className="w-3xl">
                <RequestCard
                  user={req.fromUserId}
                  onAccept={() => reviewRequest("accepted", req._id)}
                  onReject={() => reviewRequest("rejected", req._id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Requests;
