const express = require("express")
const { login, logout, signup, getUsers } = require("../controllers/auth")

const router = express.Router()

router.get("/:id", getUsers)
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

module.exports = router