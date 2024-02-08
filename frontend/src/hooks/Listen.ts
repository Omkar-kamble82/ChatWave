import { useEffect } from "react";

import { useSocketContext } from "../context/Socketcontext";
import { useConvoContext } from "@/context/Convocontext";

type message = {
    _id: string,
    senderId: string,
    receiverId: string,
    message: string,
    type: string,
    deletestatus: Boolean,
    createdAt: string,
    updatedAt: string,
    __v: number
    shouldShake?: Boolean
}

const useListenMessages = () => {
    // @ts-ignore
	const { socket } = useSocketContext();
	const { convo, setConvo } = useConvoContext();
	useEffect(() => {
		socket?.on("newMessage", (newMessage: message) => {
            newMessage.shouldShake = true;
            delete newMessage.shouldShake
            // @ts-ignore
            setConvo([...convo, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setConvo, convo]);
};
export default useListenMessages;