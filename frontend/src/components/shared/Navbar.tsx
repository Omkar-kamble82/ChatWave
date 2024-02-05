import logo from "../../assets/logo.png"
import toast from "react-hot-toast"
import { useUserContext } from "@/context/Authcontext"
import { Button } from "../ui/button"

const Navbar = () => {

    const { setValue } = useUserContext();
    const logout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_AUTH_URI}api/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (response.ok) {
                toast.success("Logged out successfully")
                setValue(null)
                localStorage.removeItem("user");
            }
        } catch(err) {
            console.log(err)
        }
      }
  return (
    <nav className='w-full shadow-2xl flex justify-between items-center p-3'>
        <img className="w-[200px] sm:w-[250px] cursor-pointer" src={logo} alt="logo"/>
        <Button onClick={logout}>Logout</Button>
    </nav>
  )
}

export default Navbar