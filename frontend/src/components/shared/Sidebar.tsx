import { useUserContext } from "@/context/Authcontext"

type userobject = {
    createdAt: string
    profilePic:string
    updatedAt:string
    username:string
    __v:number
    _id:string
}

type props = {
  users: userobject[]
}
  
const Sidebar = (props: props) => {
    const { value } = useUserContext();
    const { users } = props
  return (
    <span className="hidden sm:block sm:w-[240px] border-t-2 md:w-[300px] bg-white p-5 shadow-2xl overflow-y-scroll">
        <div>
        <span className="sm:text-2xl md:text-3xl font-bold text-gray-700">Hello, <span className="text-[#32999f]">{value?.username}</span></span>
            <div className="mt-[30px] flex flex-col gap-2">
                {users?.map((user,id) =>(
                <span key={user._id}>
                    <span className="flex gap-3 items-center hover:bg-[#32999f]/90 rounded-lg hover:text-white transition-all duration-500 font-semibold p-2">
                        <img className="h-[34px] w-[34px] object-fill rounded-full" src={user.profilePic} alt={user.username} />
                        <p className="sm:text-[15px] md:text-[18px] text-grey-700">{user.username}</p>
                    </span>
                    {id === (users.length - 1 ) ?<></> : <hr/>}
                </span>
                ))}
            </div>
        </div>
    </span>
  )
}

export default Sidebar
