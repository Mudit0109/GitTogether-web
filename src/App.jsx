import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Chat from "./components/Chat";
import Connections from "./components/Connections";
import Feed from "./components/Feed";
import Footer from './components/Footer';
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Requests from "./components/Requests";
import Signup from "./components/Signup";
import appStore from './utils/appStore';



function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Navbar/>
        <Navbar />
        <Navbar/>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          
          {/* Protected routes wrapped by Body */}
          <Route element={<Body />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests/>} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
