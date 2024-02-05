import { createContext, useContext, useEffect, type ReactNode, useState, FC } from "react";

export type User = {
    _id: string;
    username: string;
    token: string;
}

type userContext = {
    value: User | null
    setValue: (newValue: User | null) => void
}

const Mycontext = createContext<userContext | null>(null)

type MyContextProviderProps = {
    children: ReactNode;
}

export const UserContextProvider: FC<MyContextProviderProps> = ({ children }) => {
    // @ts-ignore
    const [value, setValue] = useState<User>(JSON.parse(localStorage.getItem("user")) || null);
    useEffect(() => {
        if (value) {
          localStorage.setItem("user", JSON.stringify(value));
        }
      }, [value]);
      const contextValue: userContext = {
        value,
        // @ts-ignore
        setValue
    }

    return (
        <Mycontext.Provider value={contextValue}>
            {children}
        </Mycontext.Provider>
    )
}

export default Mycontext

export const useUserContext = () => {
    const context = useContext(Mycontext);
    if (!context) {
      throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
  };