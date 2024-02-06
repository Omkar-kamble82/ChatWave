import Navbar from "@/components/shared/Navbar"
import { useEffect, useState } from "react"
import { useUserContext } from "@/context/Authcontext"
import toast from "react-hot-toast"
import Sidebar from "@/components/shared/Sidebar"
import Noconversation from "@/components/shared/Noconversation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StepBack } from 'lucide-react';


type userobject = {
  createdAt: string
  profilePic:string
  updatedAt:string
  username:string
  __v:number
  _id:string
}

const Home = () => {
  const { value } = useUserContext();
  const [users, setUsers] = useState<userobject[]>()
const convo = true
  const getuser = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_AUTH_URI}api/auth/${value?._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json: userobject[] = await response.json()
        if (!response.ok) {
            return
        }
        setUsers(json)
    } catch(err: any) {
        toast.error(err)
    }
}

  useEffect(() => {
    const user = getuser()
    console.log(user)
  }, [])
  
  return (
    <div>
      <Navbar />
      <div className="sm:h-[98vh] w-full flex">
        {/* @ts-ignore */}
        <Sidebar users={users}/>
        <div className="w-[55px] border-r-[1px] border-gray-600 sm:hidden overflow-y-scroll">
          <div className="mt-[10px] flex flex-col gap-2">
            <span className="py-2 px-[2px] border-[2px] border-gray-600 rounded-lg mx-2 hover:bg-[#999999]/40 cursor-pointer mb-[20px]"><StepBack /></span>
                {users?.map((user,id) =>(
                <span key={user._id}>
                    <span className="flex gap-3 items-center hover:bg-[#32999f]/90 rounded-lg hover:text-white transition-all duration-500 font-semibold p-2">
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
                  <span className="text-2xl px-5 md:text-3xl font-bold text-gray-700">To: <span className="text-[#32999f]">Alice</span></span>
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
        </div>
      </div>
    </div>
  )
}

export default Home