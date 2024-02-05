import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/Authcontext"
import toast from "react-hot-toast"
const Home = () => {

  const { setValue, value } = useUserContext();
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

  const getuser = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_AUTH_URI}api/auth/${value?._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json()
        if (!response.ok) {
            return
        }
        console.log(json)
    } catch(err) {
        console.log(err)
    }
}

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
      <Button onClick={getuser}>get</Button>

    </div>
  )
}

export default Home