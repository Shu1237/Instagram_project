import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
} from "react-icons/fa";

export default function VideoCallPage() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const navigate = useNavigate();
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  useEffect(() => {
    const startVideoCall = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        setIsCalling(true);
      } catch (error) {
        console.error("Error starting video call:", error);
      }
    };

    startVideoCall();

    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
      if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
        remoteVideoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  const handleEndCall = () => {
    navigate(-1);
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
  };

  const toggleMute = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject
        .getAudioTracks()
        .forEach((track) => (track.enabled = !isMuted));
    }
    setIsMuted(!isMuted);
  };

  const toggleCamera = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject
        .getVideoTracks()
        .forEach((track) => (track.enabled = !isCameraOff));
    }
    setIsCameraOff(!isCameraOff);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black relative">
      <div className="relative w-full max-w-6xl h-[70vh] grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-xl shadow-lg">
        <video
          ref={remoteVideoRef}
          autoPlay
          className="w-full h-full object-cover bg-black rounded-lg"
        />
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className={`w-full h-full object-cover bg-black rounded-lg ${
            isCameraOff ? "hidden" : ""
          }`}
        />
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={toggleMute}
          className="bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
        >
          {isMuted ? (
            <FaMicrophoneSlash className="text-red-500" />
          ) : (
            <FaMicrophone className="text-green-500" />
          )}
        </button>
        <button
          onClick={toggleCamera}
          className="bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
        >
          {isCameraOff ? (
            <FaVideoSlash className="text-red-500" />
          ) : (
            <FaVideo className="text-green-500" />
          )}
        </button>
        <button
          onClick={handleEndCall}
          className="bg-red-500 p-3 rounded-full shadow-md hover:bg-red-700 transition"
        >
          <FaPhoneSlash className="text-white" />
        </button>
      </div>
      {!isCalling && (
        <p className="mt-4 text-gray-500 animate-pulse">Connecting...</p>
      )}
    </div>
  );
}
