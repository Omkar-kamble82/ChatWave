import Navbar from "@/components/shared/Navbar"
import { useEffect, useState } from "react"
import { useUserContext } from "@/context/Authcontext"
import toast from "react-hot-toast"
import Sidebar from "@/components/shared/Sidebar"
import Chat from "@/components/shared/Chat"

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
  const [users, setUsers] = useState<userobject[]>( )

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
        console.log(users)
    } catch(err: any) {
        toast.error(err)
    }
}

  useEffect(() => {
    const user = getuser()
    console.log(user)
  }, [])

// [
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
// ]
  
  return (
    <div>
      <Navbar />
      <div className="sm:h-[98vh] w-full flex">
        {/* @ts-ignore */}
        <Sidebar users={users}/>
        {/* @ts-ignore */}
        <Chat users={users}/>
      </div>
    </div>
  )
}

export default Home