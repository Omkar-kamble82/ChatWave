import { useChatContext } from "@/context/Chatcontext"
import { useUserContext } from "@/context/Authcontext"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import Noconvo from "./Noconvo"
import { useSocketContext } from "@/context/Socketcontext"
import { useConvoContext } from "@/context/Convocontext"

export type message = {
    _id: string,
    senderId: string,
    receiverId: string,
    message: string,
    type: string,
    deletestatus: Boolean,
    createdAt: string,
    updatedAt: string,
    __v: number
}

const Convo = () => {
    const { chat } = useChatContext()
    const { value } = useUserContext();
    // @ts-ignore
    const { socket } = useSocketContext
    const { convo, setConvo } = useConvoContext()
    const lastMessageRef = useRef();

    function formatTimeString(input: string): string {
        const dateObject = new Date(input);
        let hours = dateObject.getHours();
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const formattedTime = `${hours}:${minutes} ${ampm}`;
        return formattedTime;
    }

    const getmessages = async () => {
        const senderId = {senderId: value?._id}
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_AUTH_URI_LOCAL}api/message/${chat?._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(senderId),
            })
            const json = await response.json()
            if (!response.ok) {
                toast.error(json.error)
                return
            }
            setConvo(json)
        } catch(err: any) {
            toast.error(err)
        }
    }
    
      useEffect(() => {
            getmessages()        
      }, [chat])

      useEffect(() => {
		setTimeout(() => {
            // @ts-ignore
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 20);
	}, [convo]);
  return (
    <div className="h-[100%] flex-1 mx-2 my-3 flex flex-col gap-3 overflow-y-scroll">
        {/* @ts-ignore */}
        {(convo.length !== 0) ?
        (<>{/* @ts-ignore */}
            {convo?.map((ms, id) => (
                // @ts-ignore
                <span key={id} className={`flex flex-col ${ms.senderId === value?._id && 'justify-end'}`} ref={lastMessageRef}>
                    <span key={id} className={`flex items-center gap-1 ${ms.senderId === value?._id && 'justify-end'}`}>
                        {ms.senderId !== value?._id && <img className="h-[30px] w-[30px] rounded-full" src={chat?.profilePic} alt="avatar"/>}
                        <p className={`${ms.senderId === value?._id ? `bg-[#32999f] text-white justify-end` : `bg-gray-800 text-white`} p-2 rounded-xl`}>{ms.message}</p>
                    </span>
                    <p className={`${ms.senderId === value?._id && 'text-right'} text-[10px]`}>{formatTimeString(ms.createdAt)}</p>
                </span>
            ))}
        </>): (
            <Noconvo />
        )}
    </div>
  )
}

export default Convo