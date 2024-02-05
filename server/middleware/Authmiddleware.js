const jwt = require("jsonwebtoken")
const User = require("../models/user")

const authMiddleware = async (req, res, next) => {
	try {
		const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWMwNTA5Y2JmZWIwOGMyYWFkMWFhYWYiLCJpYXQiOjE3MDcxNDEwOTUsImV4cCI6MTcwNzIyNzQ5NX0.M5MwER8gTNAKXgGh4OuoAkSTUwXB1LlijnO_pGK-Re4";
		console.log("token: ",token)
		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decoded)
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}
		const user = await User.findById(decoded.userId).select("-password");
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		req.user = user;
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = authMiddleware
