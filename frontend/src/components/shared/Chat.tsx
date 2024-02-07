import Noconversation from "@/components/shared/Noconversation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users } from 'lucide-react';
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useChatContext } from "@/context/Chatcontext"
import { useState, useEffect } from "react";
import { useUserContext } from "@/context/Authcontext";

type userobject = {
    createdAt: string
    profilePic:string
    updatedAt:string
    username:string
    _v:number
    _id:string
}

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
}

type props = {
  users: userobject[]
}

const Chat = (props: props) => {
    const { users } = props
    const { setChat, chat } = useChatContext()
    const [message, setMessage] = useState<message[]>([
        {
            "_id": "65c388c3c1f7102d36f30edb",
            "senderId": "65c10a54e3541caaa3da5b01",
            "receiverId": "65c10989e3541caaa3da5afc",
            "message": "hi john!!",
            "type": "text",
            "deletestatus": false,
            "createdAt": "2024-02-07T13:42:27.295Z",
            "updatedAt": "2024-02-07T13:42:27.295Z",
            "__v": 0
        },
        {
            "_id": "65c388f3c1f7102d36f30edf",
            "senderId": "65c10a54e3541caaa3da5b01",
            "receiverId": "65c10989e3541caaa3da5afc",
            "message": "How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!!",
            "type": "text",
            "deletestatus": false,
            "createdAt": "2024-02-07T13:43:15.250Z",
            "updatedAt": "2024-02-07T13:43:15.250Z",
            "__v": 0
        },
        {
            "_id": "65c38919c1f7102d36f30ee3",
            "senderId": "65c10989e3541caaa3da5afc",
            "receiverId": "65c10a54e3541caaa3da5b01",
            "message": "Hello Alice!!",
            "type": "text",
            "deletestatus": false,
            "createdAt": "2024-02-07T13:43:53.998Z",
            "updatedAt": "2024-02-07T13:43:53.998Z",
            "__v": 0
        },
        {
            "_id": "65c3894ac1f7102d36f30ee7",
            "senderId": "65c10989e3541caaa3da5afc",
            "receiverId": "65c10a54e3541caaa3da5b01",
            "message": "I'm fine!! what about you",
            "type": "text",
            "deletestatus": false,
            "createdAt": "2024-02-07T13:44:42.267Z",
            "updatedAt": "2024-02-07T13:44:42.267Z",
            "__v": 0
        },
        {
            "_id": "65c388c3c1f7102d36f30edb",
            "senderId": "65c10a54e3541caaa3da5b01",
            "receiverId": "65c10989e3541caaa3da5afc",
            "message": "hi john!!",
            "type": "text",
            "deletestatus": false,
            "createdAt": "2024-02-07T13:42:27.295Z",
            "updatedAt": "2024-02-07T13:42:27.295Z",
            "__v": 0
        },
        {
            "_id": "65c388f3c1f7102d36f30edf",
            "senderId": "65c10a54e3541caaa3da5b01",
            "receiverId": "65c10989e3541caaa3da5afc",
            "message": "How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!! How are you!!",
            "type": "text",
            "deletestatus": false,
            "createdAt": "2024-02-07T13:43:15.250Z",
            "updatedAt": "2024-02-07T13:43:15.250Z",
            "__v": 0
        },
        {
            "_id": "65c38919c1f7102d36f30ee3",
            "senderId": "65c10989e3541caaa3da5afc",
            "receiverId": "65c10a54e3541caaa3da5b01",
            "message": "Hello Alice!!",
            "type": "text",
            "deletestatus": false,
            "createdAt": "2024-02-07T13:43:53.998Z",
            "updatedAt": "2024-02-07T13:43:53.998Z",
            "__v": 0
        },
        {
            "_id": "65c3894ac1f7102d36f30ee7",
            "senderId": "65c10989e3541caaa3da5afc",
            "receiverId": "65c10a54e3541caaa3da5b01",
            "message": "I'm fine!! what about you",
            "type": "text",
            "deletestatus": false,
            "createdAt": "2024-02-07T13:44:42.267Z",
            "updatedAt": "2024-02-07T13:44:42.267Z",
            "__v": 0
        }
    ])
    const { value } = useUserContext();
    const convo = chat

    // const getmessages = async () => {
    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_SERVER_AUTH_URI}api/message/${chat?._id}`, {
    //             method: 'POST',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(value?._id),
    //         })
    //         const json = await response.json()
    //         if (!response.ok) {
    //             toast.error(json.error)
    //             return
    //         }
    //         setMessage(json as any)
    //         console.log("Json",message)
    //     } catch(err: any) {
    //         toast.error(err)
    //     }
    // }
    
    //   useEffect(() => {
    //     if(chat){
    //         const user = getmessages()
    //         console.log(user)
    //     }
        
    //   }, [])
  return (
    <>
    <div className="w-[55px] min-h-[93vh] max-h-[100vh] border-r-[1px] border-gray-600 sm:hidden overflow-y-scroll">
        <div className="mt-[10px] flex flex-col gap-2">
            <Dialog>
                <DialogTrigger className="py-2 px-[2px] border-[2px] border-gray-600 rounded-lg mx-2 hover:bg-[#999999]/40 cursor-pointer mb-[20px]"><Users /></DialogTrigger>
                <DialogContent className="w-[96%] max-h-[400px] overflow-y-scroll">
                <DialogHeader>
                <DialogTitle>User list:</DialogTitle>
                <DialogDescription>
                    Select a user to start a converstion
                </DialogDescription>
                </DialogHeader>
                <div className="mt-[10px] flex flex-col gap-2">
                    {users?.map((user,id) =>(
                    <span key={id} onClick={() => setChat(user)}>
                        <span className="flex gap-3 items-center hover:bg-[#32999f]/90 rounded-lg hover:text-white transition-all duration-500 font-semibold p-2">
                            <img className="h-[34px] w-[34px] object-fill rounded-full" src={user.profilePic} alt={user.username} />
                            <p className="sm:text-[15px] md:text-[18px] text-grey-700">{user.username}</p>
                        </span>
                        {id === (users.length - 1 ) ?<></> : <hr/>}
                    </span>
                    ))}
                </div>
            </DialogContent>
            </Dialog>
            {users?.map((user,id) =>(
            <span key={id} onClick={() => setChat(user)}>
                <span className={`flex gap-3 items-center hover:bg-[#32999f]/90 rounded-lg hover:text-white transition-all duration-500 font-semibold p-2 ${chat && chat.username === user.username ? "bg-[#32999f]/90" : "bg-transparent"}`}>
                    <img className="h-[30px] w-[35px] object-fill rounded-full" src={user.profilePic} alt={user.username} />
                </span>
                {id === (users.length - 1 ) ?<></> : <hr/>}
            </span>
            ))}
        </div>
    </div>
    <div className="w-full sm:h-[98vh] border-t-2">
        {convo ? 
            <div className="flex flex-col justify-between h-[90vh] sm:h-[98vh] md:h-[91vh]">
            <div className="h-[60px] py-3 bg-grey-200 w-full border-black border-b-[1px]">
                <span className="text-2xl px-5 md:text-3xl font-bold text-gray-700">To: <span className="text-[#32999f]">{chat?.username || ""}</span></span>
            </div>
            <div className="h-[100%] flex-1 mx-2 my-3 flex flex-col gap-3 overflow-y-scroll">
                {message.map((ms, id) => (
                    <span key={id} className={`flex items-center gap-1 ${ms.senderId === value?._id && 'justify-end'}`}>
                        {ms.senderId !== value?._id && <img className="h-[30px] w-[30px] rounded-full" src={chat.profilePic} alt="avatar"/>}
                        <p className={`${ms.senderId === value?._id ? `bg-[#32999f] text-white justify-end` : `bg-gray-800 text-white`} p-2 rounded-xl`}>{ms.message}</p>
                    </span>
                ))}
            </div>
            <div className="mb-2 border-t-[1px] border-gray-600 px-4 flex items-center gap-2 justify-center">
                <Input placeholder="message...." className="w-[80%] mt-4"/>
                <Button className="mt-4">Send</Button>
            </div>
            </div>
        :
        <Noconversation />
        }
    </div></>
  )
}

export default Chat