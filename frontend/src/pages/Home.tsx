import Navbar from "@/components/shared/Navbar"
import { useEffect, useState } from "react"
import { useUserContext } from "@/context/Authcontext"
import toast from "react-hot-toast"
import Sidebar from "@/components/shared/Sidebar"
import Chat from "@/components/shared/Chat"
import useListenMessages from "@/hooks/Listen";

export type userobject = {
  createdAt: string
  profilePic:string
  updatedAt:string
  username:string
  _v:number
  _id:string
}

const Home = () => {
  const { value } = useUserContext();
  // const [users, setUsers] = useState<userobject[]>([
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  //   {_id: '65c10989e3541caaa3da5afc', username: 'john', profilePic: 'https://avatar.iran.liara.run/public/?username=john', createdAt: '2024-02-05T16:15:05.808Z', updatedAt: '2024-02-05T16:15:05.808Z', _v: 0},
  // ])
  const [users, setUsers] = useState<userobject[]>([])

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
    getuser()
  }, [])
  
  return (
    <div>
      <Navbar />
      <div className="h-[84vh] sm:h-[98vh] w-full flex">
        <Sidebar users={users}/>
        <Chat users={users}/>
      </div>
    </div>
  )
}

export default Home