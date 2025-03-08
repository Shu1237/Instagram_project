import React, { useEffect } from "react";
import { FiVideo, FiPhone } from "react-icons/fi";

export default function VideoCall({
  setIsVideoCallActive,
  localVideoRef,
  remoteVideoRef,
  peerConnectionRef,
}) {
  useEffect(() => {
    const startVideoCall = async () => {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = localStream;

      const peerConnection = new RTCPeerConnection();
      peerConnectionRef.current = peerConnection;

      localStream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, localStream));

      peerConnection.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      // Add signaling logic here (e.g., using WebSocket or any signaling server)
    };

    startVideoCall();
  }, [localVideoRef, remoteVideoRef, peerConnectionRef]);

  return null;
}
