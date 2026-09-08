import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

type authContextType = {
    isLoggedIn: boolean;
    login : () => void;
}

const authContext = createContext<authContextType|null>(null);


export function AuthProvider({children}: {children: React.ReactNode}){
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const login = () => {
        setIsLoggedIn(true);
    }
    return (
        <authContext.Provider value={{isLoggedIn, login}}>
            {children}
        </authContext.Provider>
    )
}


export function useAuth(){
    const context = useContext(authContext);
    if(!context){
        throw new Error("load context failed");
    }
    return context;
}