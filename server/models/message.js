import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
        type: {
			type: String,
			required: true,
			enum: ["text", "video", "photo", "file"],
		},
		deletestatus: {
			type: Boolean,
            default: false,
		}
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
