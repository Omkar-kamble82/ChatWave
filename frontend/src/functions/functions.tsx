import { useUserContext } from "@/context/Authcontext";
import { User } from "@/context/Authcontext";
import toast from "react-hot-toast";
export const getuser = async () => {
    let id: string[] = []
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_AUTH_URI_LOCAL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json: User[] = await response.json()
        if (!response.ok) {
            return
        }
        json.forEach(j => {
            id.push(j._id)
        });
        console.log(id)
    } catch(err) {
        console.log(err)
    }
    return id
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