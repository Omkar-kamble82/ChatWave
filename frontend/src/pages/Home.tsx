import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/Authcontext"
import toast from "react-hot-toast"

type Props = {}

const Home = (props: Props) => {

  const { setValue } = useUserContext();
  const logout = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_AUTH_URI}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            toast.success("Logged out successfully")
            setValue(null)
        }
    } catch(err) {
        console.log(err)
    }
  }

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}

export default Home