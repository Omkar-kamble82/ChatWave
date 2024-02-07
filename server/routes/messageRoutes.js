const express = require("express")
const { getMessages, sendMessage, deleteMessage } = require("../controllers/message")

const router = express.Router();

router.get("/:id", getMessages);
router.patch("/delete/:id", deleteMessage);
router.post("/send/:id", sendMessage);

module.exports = router
