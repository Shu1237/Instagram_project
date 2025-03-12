import { Server as SocketIOServer } from "socket.io";
const signaling = async (httpServer) => {
  // Create WebSocket server
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "http://localhost:5173", // Allow client-side connection
      credentials: true,
    },
  });

  const rooms = {}; // Store room participants

  io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
      if (!rooms[roomId]) {
        rooms[roomId] = new Set();
      }
      rooms[roomId].add(userId);

      socket.join(roomId);
      socket.to(roomId).emit("user-connected", userId);
      console.log(`User ${userId} joined room ${roomId}`);
    });
    socket.on("offer", ({ roomId, offer, userId }) => {
      if (rooms[roomId]?.has(userId)) {
        console.log(`User ${userId} OFFERED`);
        socket.to(roomId).emit("receive-offer", { offer, userId });
      } else {
        console.warn(`Invalid offer from user ${userId} in room ${roomId}`);
      }
    });

    socket.on("answer", ({ roomId, answer, userId }) => {
      if (rooms[roomId]?.has(userId)) {
        console.log(`User ${userId} ANSWERED`);
        socket.to(roomId).emit("receive-answer", { answer, userId });
      } else {
        console.warn(`Invalid answer from user ${userId} in room ${roomId}`);
      }
    });

    socket.on("ice-candidate", ({ roomId, candidate, userId }) => {
      if (rooms[roomId]?.has(userId)) {
        console.log("Received ICE candidate from:", userId);
        socket.to(roomId).emit("receive-ice-candidate", { candidate, userId });
      }
    });

    socket.on("leave-room", (roomId, userId) => {
      if (rooms[roomId]) {
        rooms[roomId].delete(userId);
        socket.to(roomId).emit("user-disconnected", userId);
        socket.leave(roomId);
        console.log(`User ${userId} left room ${roomId}`);

        // If the room is empty, delete it
        if (rooms[roomId].size === 0) {
          delete rooms[roomId];
        }
      }
    });
  });
};
export default signaling;
