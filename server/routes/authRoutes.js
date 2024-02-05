const express = require("express")
const { login, logout, signup, getUsers, getallusers } = require("../controllers/auth")
const authMiddleware = require("../middleware/Authmiddleware")

const router = express.Router()

router.get("/", getallusers)
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

module.exports = router