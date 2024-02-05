import { useUserContext } from "@/context/Authcontext";
import { User } from "@/context/Authcontext";
import toast from "react-hot-toast";
export const getuser = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_AUTH_URI_LOCAL}api/auth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json: User[] = await response.json()
        if (!response.ok) {
            return
        }
        console.log(json)
    } catch(err) {
        console.log(err)
    }
}

export const logout = async () => {
    try {
        const { setValue } = useUserContext();
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