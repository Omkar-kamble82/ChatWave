import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Paperclip } from 'lucide-react';
import { Image } from 'lucide-react';
import { FileVideo } from 'lucide-react';
import { FileAudio2 } from 'lucide-react';
import { File } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config";
import { v4 } from "uuid";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "@/context/Authcontext";
import {message} from "./Convo"
import { useConvoContext } from "@/context/Convocontext";
import { useChatContext } from "@/context/Chatcontext";
import { Button } from "../ui/button";

const Dropdown = () => {

    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("")
    const [url, setUrl] = useState("")
    const { value } = useUserContext()
    const { convo, setConvo } = useConvoContext()
    const { chat } = useChatContext()


    const ImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const image = e.target.files?.[0];
        if (image == null) return;
        const imageRef = ref(storage, `ChatImages/${image.name}`);
        await uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                url = String(url)
                setUrl(url);
                setLoading(false)
            });
        });
    };
    const uplaodMeassge = async () => {
        if(url === ""){
            toast.error("Please upload an image")
            return
        }
        const data = { message: url, type: type, senderId: value?._id}
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_AUTH_URI}api/message/send/${chat?._id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const json: message = await response.json()
            if (Array.isArray(convo)) {
                // @ts-ignore
                setConvo([...convo, json])
            }
            setLoading(false)
            toast.success("uploaded successfully")
            setUrl("")
        } catch (err: any) {
            toast.error(err.message)
        }
    }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger  className="h-[40px] mt-[15px] border-2 px-1 rounded-lg"><Paperclip /></DropdownMenuTrigger>
        <DropdownMenuContent>
            <Dialog>
                <DialogTrigger className="" onClick={() => {setType("image")}}><div className="flex justify-center items-center gap-2 rounded-lg px-2 py-1"><Image size={18} /><span>Image</span></div></DialogTrigger>
                <DialogContent className="w-[96%] max-h-[400px] overflow-y-scroll">
                <DialogHeader>
                <DialogTitle>Upload Image: </DialogTitle>
                <DialogDescription>
                    Select a image to upload
                </DialogDescription>
                <div className="w-full px-2 py-4 border-2 rounded-md">
                    <input accept="image/*" onChange={(e) => {ImageUpload(e)}} type="file" />
                </div>
                {loading && <p className="text-rose-500 font-bold">Loading....</p>}
                {url !== "" && <p className="text-[#308030] font-bold">Image Uploaded</p>}
                <Button onClick={uplaodMeassge}>Send</Button>
                </DialogHeader>
                </DialogContent>
            </Dialog>
            <DropdownMenuSeparator/>
            <Dialog>
                <DialogTrigger className="" onClick={() => {setType("video")}}><div className="flex justify-center items-center gap-2 rounded-lg px-2 py-1"><FileVideo size={18} /><span>Video</span></div></DialogTrigger>
                <DialogContent className="w-[96%] max-h-[400px] overflow-y-scroll">
                <DialogHeader>
                <DialogTitle>Upload Video: </DialogTitle>
                <DialogDescription>
                    Select a video to upload (Max size: 10mb)
                </DialogDescription>
                <div className="w-full px-2 py-4 border-2 rounded-md">
                    <input accept="video/*" size={10485760} onChange={(e) => {ImageUpload(e)}} type="file" />
                </div>
                {loading && <p className="text-rose-500 font-bold">Loading....</p>}
                {url !== "" && <p className="text-[#308030] font-bold">Video Uploaded</p>}
                <Button onClick={uplaodMeassge}>Send</Button>
                </DialogHeader>
                </DialogContent>
            </Dialog>
            <DropdownMenuSeparator/>
            <Dialog>
                <DialogTrigger className="" onClick={() => {setType("audio")}}><div className="flex justify-center items-center gap-2 rounded-lg px-2 py-1"><FileAudio2 size={18} /><span>Audio</span></div></DialogTrigger>
                <DialogContent className="w-[96%] max-h-[400px] overflow-y-scroll">
                <DialogHeader>
                <DialogTitle>Upload Audio: </DialogTitle>
                <DialogDescription>
                    Select a audio to upload (Max size: 10mb)
                </DialogDescription>
                <div className="w-full px-2 py-4 border-2 rounded-md">
                    <input accept="audio/*" size={10485760} onChange={(e) => {ImageUpload(e)}} type="file" />
                </div>
                {loading && <p className="text-rose-500 font-bold">Loading....</p>}
                {url !== "" && <p className="text-[#308030] font-bold">Audio Uploaded</p>}
                <Button onClick={uplaodMeassge}>Send</Button>
                </DialogHeader>
                </DialogContent>
            </Dialog>
            <DropdownMenuSeparator/>
            <Dialog>
                <DialogTrigger className="" onClick={() => {setType("file")}}><div className="flex justify-center items-center gap-2 rounded-lg px-2 py-1"><File size={18} /><span>File</span></div></DialogTrigger>
                <DialogContent className="w-[96%] max-h-[400px] overflow-y-scroll">
                <DialogHeader>
                <DialogTitle>Upload File: </DialogTitle>
                <DialogDescription>
                    Select a file to upload (Max size: 10mb)
                </DialogDescription>
                <div className="w-full px-2 py-4 border-2 rounded-md">
                    <input accept=".pdf, .doc, .docx" size={10485760} onChange={(e) => {ImageUpload(e)}} type="file" />
                </div>
                {loading && <p className="text-rose-500 font-bold">Loading....</p>}
                {url !== "" && <p className="text-[#308030] font-bold">File Uploaded</p>}
                <Button onClick={uplaodMeassge}>Send</Button>
                </DialogHeader>
                </DialogContent>
            </Dialog>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
