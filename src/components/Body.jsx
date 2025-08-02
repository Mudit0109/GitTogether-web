import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import Navbar from "./Navbar";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    // if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/login");
      }
      console.error("Failed to fetch user profile:", err);
    }
  };

  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-10">
        <Outlet />
      </main>
      {/* <Footer/> */}
    </div>
  );
};

export default Body;
