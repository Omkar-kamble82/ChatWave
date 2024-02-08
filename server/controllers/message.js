import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const sendMessage = async (req, res) => {
	try {
		const { message, type, senderId } = req.body;
		const { id: receiverId } = req.params;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
			type
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}


		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sending message: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const { senderId } = req.body;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages");

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getting messages: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

const deleteMessage = async (req, res) => {
	try {
		const { id } = req.params;
		const message = await Message.findOneAndUpdate({ _id: id }, { deletestatus: true })
		res.status(200).json(message);
	} catch (error) {
		console.log("Error in deleting message: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

export { getMessages, sendMessage, deleteMessage }