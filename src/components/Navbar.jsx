import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import GeminiImage from '../assets/GeminiImage.png';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice'; // <-- import addUser

const Navbar = () => {
  const dispatch = useDispatch(); // hooks first
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);


  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <div className="navbar fixed top-0 z-50 w-full bg-gradient-to-r from-white/10 via-black/30 to-white/10 backdrop-blur-lg backdrop-saturate-200 border-b border-white/20 shadow-lg text-white">
        <div className="flex-1">
          <Link to={user ? "/feed" : "/"} className="btn btn-ghost text-xl">
            <img src={GeminiImage} alt="Logo" className="h-50 object-contain" />
          </Link>
        </div>

        {/* Right side navigation */}
        <div className="flex items-center gap-4 pr-4">
          {user ? (
            <>
              <Link to="/feed" className="btn btn-ghost">Feed</Link>
              <Link to="/profile" className="btn btn-ghost">Profile</Link>
              <Link to="/connections" className="btn btn-ghost">Connections</Link>
              <Link to="/requests" className="btn btn-ghost">Requests</Link>
              <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img alt="Avatar" src={user.photoUrl} />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
