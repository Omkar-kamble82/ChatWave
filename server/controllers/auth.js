import bcrypt from "bcryptjs"
import User from "../models/user.js"
import generateTokenAndSetCookie from "../utils/generateToken.js"

const getUsers = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({ _id: id })
		const userobj = {
			_id: user._id,
			username: user.username,
		}
		console.log(id)
		const filteredUsers = await User.find({ _id: { $ne: userobj } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

const signup = async (req, res) => {
	try {
		const { username, password, confirmPassword } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const ProfilePic = `https://avatar.iran.liara.run/public/?username=${username}`;

		const newUser = new User({
			username,
			password: hashedPassword,
			profilePic: ProfilePic,
		});

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				username: newUser.username,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		const token = generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			username: user.username,
			token: token
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export { signup, logout, login, getUsers }