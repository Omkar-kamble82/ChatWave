import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  process.env.CLIENT,
  process.env.LOCAL,
]
const io = new Server(server, {
  cors: {
     origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
           callback(null, true);
        } else {
           callback(new Error('Not allowed by CORS'));
        }
     },
     methods: ["GET", "POST", "PATCH"],
  },
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
