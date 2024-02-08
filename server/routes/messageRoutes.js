import express from "express"
import { getMessages, sendMessage, deleteMessage } from "../controllers/message.js"

const router = express.Router();

router.post("/:id", getMessages);
router.patch("/delete/:id", deleteMessage);
router.post("/send/:id", sendMessage);

export default router
