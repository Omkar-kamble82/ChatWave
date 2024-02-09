import { createContext, useState, useEffect, useContext } from "react";
import { useUserContext } from "./Authcontext";
import io from "socket.io-client";

// @ts-ignore
const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

// @ts-ignore
export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { value } = useUserContext();
    // @ts-ignore
	useEffect(() => {
		if (value) {
			const socket = io(import.meta.env.VITE_SERVER_AUTH_URI, {
				query: {
					userId: value._id,
				},
				transports: ["websocket"],
			});
            // @ts-ignore
			setSocket(socket);
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
                // @ts-ignore
				socket.close();
				setSocket(null);
			}
		}
	}, [value]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
