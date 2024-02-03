const express = require("express")
const { login, logout, signup, getUsersForSidebar } = require("../controllers/auth")
const authMiddleware = require("../middleware/Authmiddleware")

const router = express.Router()

router.get("/", authMiddleware, getUsersForSidebar)
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

module.exports = router