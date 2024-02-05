const jwt = require("jsonwebtoken")

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});
	res.cookie("jwt", token, {
		domain: "http://localhost:5173/",
		maxAge: 3 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: "strict",
		secure: process.env.NODE_ENV !== "development",
	});
};

module.exports = generateTokenAndSetCookie
