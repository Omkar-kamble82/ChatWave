const express = require("express")
const { getMessages, sendMessage, deleteMessage } = require("../controllers/message")
const authMiddleware = require("../middleware/Authmiddleware")

const router = express.Router();

router.get("/:id", authMiddleware, getMessages);
router.patch("/delete/:id", authMiddleware, deleteMessage);
router.post("/send/:id", authMiddleware, sendMessage);

module.exports = router
