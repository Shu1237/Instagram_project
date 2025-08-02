import "../lib/App.css";
import React from "react";

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
import SeeAll from "../pages/seeAll";
import SplashScreen from "../ui/SplashScreen";
import { useAppInitialization } from "../../hooks/useAppLoading";
export default function App() {
  const { isInitializing, initializationError } = useAppInitialization();

  // Show splash screen during app initialization
  if (isInitializing) {
    return <SplashScreen />;
  }

  // Show error screen if initialization failed
  if (initializationError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Initialization Error
          </h1>
          <p className="text-red-500 mb-4">
            Failed to initialize the application
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
        path="/see-all"
        element={
          <ProtectedRoute>
            <SeeAll />
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
