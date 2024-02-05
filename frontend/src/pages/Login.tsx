import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import loginimg from "../assets/login.jpg"
import logo from "../assets/logo.png"
import { User } from "@/context/Authcontext"
import { useUserContext } from "@/context/Authcontext"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const signup = z.object({
    username: z.string().min(2, 'Username must be at least 2 characters'),
    password: z.string().min(4, 'password must be at least 4 characters'),
})
  
const Login = () => {

    const { setValue } = useUserContext();

    const form = useForm<z.infer<typeof signup>>({
        resolver: zodResolver(signup),
        defaultValues: {
          username: "",
        },
      })

      async function onSubmit(values: z.infer<typeof signup>) {
        const data = {username: values.username, password: values.password }
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_AUTH_URI}api/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const json = await response.json()
            if (!response.ok) {
                toast.error(json.error)
                return
            }
            setValue(json as User)
        } catch (err: any) {
            toast.error(err.message)
        }
    }

  return (
    <div className="min-h-[100vh] w-[100vw] flex">
        <div className="flex justify-center items-center w-full sm:w-[54vw]">
            <div className="w-[340px] sm:w-[400px] px-3 mx-2 py-4 rounded-[1rem] shadow-2xl border-2 border-black/10" >
                <img  className="w-[240px] mb-[14px]" src={logo} alt="logo-image" />
                <h1 className="text-4xl font-bold dancing mb-[5px]">Login</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input className="" placeholder="eg: JohnDoe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="************" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">Login</Button>
                        <p className="text-[13px] mt-[4px]">Don't have an accout? <a href="/signup" className="underline cursor-pointer text-[#00ADB5]">Signup</a></p>
                    </form>
                </Form>
            </div>
        </div>
        <div className="hidden sm:block h-[100vh] w-[46vw] relative">
            <img className="h-full w-full object-cover" src={loginimg} alt="signup-image" />
            <div className="absolute inset-0 bg-[black]/45" />
        </div>
    </div>
  )
}

export default Login