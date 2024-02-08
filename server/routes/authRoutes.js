import express from "express"
import { login, logout, signup, getUsers } from "../controllers/auth.js"

const router = express.Router()

router.get("/:id", getUsers)
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

export default router