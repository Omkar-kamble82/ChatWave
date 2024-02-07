import { createContext, useContext, useEffect, type ReactNode, useState, FC } from "react";
import { userobject } from "@/pages/Home";

type userContext = {
    chat: userobject | null
    setChat: (newValue: userobject | null) => void
}

const Mycontext = createContext<userContext | null>(null)

type MyContextProviderProps = {
    children: ReactNode;
}

export const ChatContextProvider: FC<MyContextProviderProps> = ({ children }) => {
    // @ts-ignore
    const [chat, setChat] = useState<userobject>(JSON.parse(localStorage.getItem("chat")) || null);
    useEffect(() => {
        if (chat) {
          localStorage.setItem("chat", JSON.stringify(chat));
        }
      }, [chat]);
      const contextValue: userContext = {
        chat,
        // @ts-ignore
        setChat
    }

    return (
        <Mycontext.Provider value={contextValue}>
            {children}
        </Mycontext.Provider>
    )
}

export default Mycontext

export const useChatContext = () => {
    const context = useContext(Mycontext);
    if (!context) {
      throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
  };