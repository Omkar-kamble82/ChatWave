const express = require("express")
const { login, logout, signup, getUsers } = require("../controllers/auth")
const { getMessages, sendMessage, deleteMessage } = require("../controllers/message")

const router = express.Router()

router.get("/:id", getUsers)
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.post("/messages/:id", getMessages);
router.patch("/delete/:id", deleteMessage);
router.post("/send/:id", sendMessage);

module.exports = router