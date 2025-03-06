import "../lib/App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/home";
import Login from "../auth/login";
import Signup from "../auth/register";
import Profile from "../pages/profile";
import Message from "../pages/message";
import DashBoardPage from "../pages/dashboard";
import ForgotPassword from "../auth/forgetpassword";
import PassWordSecurity from "../pages/password-security";
import NotFound from "../pages/404";
import Verify2FA from "../auth/verify2fa";
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verify-2fa" element={<Verify2FA />} />
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/message/:id/:idfr" element={<Message />} />
      <Route path="dashboardPage" element={<DashBoardPage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/password-security" element={<PassWordSecurity />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
