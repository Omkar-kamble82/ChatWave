import { MessagesSquare } from 'lucide-react';

const Noconversation = () => {
  return (
    <div className="flex mt-[35vh] sm:m-[35vh] justify-center items-center">
        <span className="flex flex-col justify-center items-center gap-2">
        <p className="text-3xl font-bold text-gray-800">Start your coversation</p>
        <MessagesSquare size={70}/>
        </span>
    </div>
  )
}

export default Noconversation