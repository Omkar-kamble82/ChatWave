import Noconversation from "@/components/shared/Noconversation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useChatContext } from "@/context/Chatcontext"

type userobject = {
    createdAt: string
    profilePic:string
    updatedAt:string
    username:string
    _v:number
    _id:string
}

type props = {
  users: userobject[]
}

const Chat = (props: props) => {
    const { users } = props
    const { setChat, chat } = useChatContext()
    const convo = chat

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
            <div className="h-[100%] flex-1"></div>
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