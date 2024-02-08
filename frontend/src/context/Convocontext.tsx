import { createContext, useContext, useEffect, type ReactNode, useState, FC } from "react";
import { message } from "../components/shared/Convo"

type messageobj = {
    messages: message[] | []
}

type convoContext = {
    convo: messageobj | []
    setConvo: (newValue: messageobj | []) => void
}

const Mycontext = createContext<convoContext | null>(null)

type MyContextProviderProps = {
    children: ReactNode;
}

export const ConvoContextProvider: FC<MyContextProviderProps> = ({ children }) => {
    // @ts-ignore
    const [convo, setConvo] = useState<messageobj>(JSON.parse(localStorage.getItem("convo")) || []);
    useEffect(() => {
        if (convo) {
          localStorage.setItem("convo", JSON.stringify(convo));
        }
      }, [convo]);
      const contextValue: convoContext = {
        convo,
        // @ts-ignore
        setConvo
    }

    return (
        <Mycontext.Provider value={contextValue}>
            {children}
        </Mycontext.Provider>
    )
}

export default Mycontext

export const useConvoContext = () => {
    const context = useContext(Mycontext);
    if (!context) {
      throw new Error("useConvoContext must be used within a ConvoContextProvider");
    }
    return context;
  };