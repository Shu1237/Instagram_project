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
import Explore from "../pages/explore";
import Reels from "../pages/reels";
import ProtectedRoute from "../auth/ProtectedRoute";

import Darkmode from "../Darkmode/darkmode";
import TrackingActivity from "../pages/tracking_activity";
import ForgotPassword from "../auth/forgetpassword";
import PassWordSecurity from "../pages/password-security";
import NotFound from "../pages/404";
import Verify2FA from "../auth/verify2fa";
import VideoCallPage from "../webRTC/videoCallPage";
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/verify-2fa" element={<Verify2FA />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/explore"
        element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reels"
        element={
          <ProtectedRoute>
            <Reels />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/message/:id/:idfr"
        element={
          <ProtectedRoute>
            <Message />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboardPage"
        element={
          <ProtectedRoute>
            <DashBoardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tracking-activity/:status"
        element={
          <ProtectedRoute>
            <TrackingActivity />
          </ProtectedRoute>
        }
      />
      <Route
        path="/password-security"
        element={
          <ProtectedRoute>
            <PassWordSecurity />
          </ProtectedRoute>
        }
      />
      <Route
        path="/video-call/:roomId"
        element={
          <ProtectedRoute>
            <VideoCallPage />
          </ProtectedRoute>
        }
      />

      {/* Test route */}
      <Route path="test" element={<Darkmode />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
