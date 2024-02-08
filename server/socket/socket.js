import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "https://chatwave-c458d.web.app",
		methods: ["GET", "POST", "PATCH"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;
	io.emit("getOnlineUsers", Object.keys(userSocketMap));
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };