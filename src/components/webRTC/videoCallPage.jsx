import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
} from "react-icons/fa";
import { io } from "socket.io-client";
import * as localStorage from "../../utils/localStorage.util.js";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

socket.on("connect_error", (err) => {
  console.error("Socket.IO connection error:", err);
});

export default function VideoCallPage() {
  const { roomId } = useParams();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [userName, setUserName] = useState("");
  const peerConnectionRef = useRef(null);
  const navigate = useNavigate();
  const userInfo = localStorage.getLocalStorage()?.user;

  useEffect(() => {
    setUserName(userInfo?.name || "User");

    const localStreamSetup = async () => {
      try {
        // Get local media stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Join the room
        socket.emit("join-room", roomId, userInfo?.user_id);

        // Handle new user connection
        socket.on("user-connected", async (newUserId) => {
          console.log("User connected:", newUserId);
          const pc = createPeerConnection(stream);
          try {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.emit("offer", { roomId, offer, userId: newUserId });
          } catch (error) {
            console.error("Error creating or sending offer:", error);
          }
        });

        // Handle incoming offer
        socket.on("receive-offer", async ({ offer, userId }) => {
          console.log("Received offer from:", userId);
          const pc = createPeerConnection(stream);
          try {
            await pc.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            socket.emit("answer", { roomId, answer, userId });
          } catch (error) {
            console.error("Error handling offer:", error);
          }
        });

        // Handle incoming answer
        socket.on("receive-answer", async ({ answer, userId }) => {
          console.log("Received answer from:", userId);
          if (peerConnectionRef.current) {
            try {
              await peerConnectionRef.current.setRemoteDescription(
                new RTCSessionDescription(answer)
              );
            } catch (error) {
              console.error("Error setting remote description:", error);
            }
          }
        });

        // Handle incoming ICE candidate
        socket.on("receive-ice-candidate", ({ candidate, userId }) => {
          console.log("Adding ICE candidate for:", userId);
          if (peerConnectionRef.current) {
            try {
              peerConnectionRef.current.addIceCandidate(
                new RTCIceCandidate(candidate)
              );
            } catch (error) {
              console.error("Error adding ICE candidate:", error);
            }
          }
        });

        // Handle user disconnection
        socket.on("user-disconnected", (disconnectedUserId) => {
          console.log("User disconnected:", disconnectedUserId);
          if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
          }
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
          }
        });

        // Handle room full event
        socket.on("room-full", () => {
          alert("Room is full. Only two users are allowed.");
          navigate(-1);
        });
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    localStreamSetup();

    // Cleanup on component unmount
    return () => {
      socket.emit("leave-room", roomId, userInfo?.user_id);
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
      if (localVideoRef.current?.srcObject) {
        localVideoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [roomId, userInfo?.user_id, navigate]);

  // Create a new peer connection
  const createPeerConnection = (localStream) => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerConnectionRef.current = pc;

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          roomId,
          candidate: event.candidate,
          userId: userInfo?.user_id,
        });
      }
    };

    // Handle remote stream
    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Add local stream tracks to the peer connection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    return pc;
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    const stream = localVideoRef.current.srcObject;
    stream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setIsMuted(!isMuted);
  };

  // Toggle camera on/off
  const toggleCamera = () => {
    const stream = localVideoRef.current.srcObject;
    stream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setIsCameraOff(!isCameraOff);
  };

  // End the call
  const handleEndCall = () => {
    socket.emit("leave-room", roomId, userInfo?.user_id);
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <div className="relative w-full max-w-6xl h-[70vh] grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 rounded-xl shadow-lg">
        <div className="relative w-full h-full bg-black rounded-lg">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className={`w-full h-full rounded-lg ${
              isCameraOff ? "hidden" : ""
            }`}
          />
          {isCameraOff && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-lg">
              <span className="text-white text-2xl">{userName}</span>
            </div>
          )}
        </div>
        <video
          ref={remoteVideoRef}
          autoPlay
          className="w-full h-full bg-black rounded-lg"
        />
      </div>
      <div className="mt-4 flex gap-4">
        <button onClick={toggleMute} className="bg-gray-200 p-3 rounded-full">
          {isMuted ? (
            <FaMicrophoneSlash className="text-red-500" />
          ) : (
            <FaMicrophone className="text-green-500" />
          )}
        </button>
        <button onClick={toggleCamera} className="bg-gray-200 p-3 rounded-full">
          {isCameraOff ? (
            <FaVideoSlash className="text-red-500" />
          ) : (
            <FaVideo className="text-green-500" />
          )}
        </button>
        <button onClick={handleEndCall} className="bg-red-500 p-3 rounded-full">
          <FaPhoneSlash className="text-white" />
        </button>
      </div>
    </div>
  );
}
