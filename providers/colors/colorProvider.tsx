import { THEMES } from "@/assets/themes/themesConfig"
import { ColorType } from "@/types/themes"
import { createContext, useContext, useMemo } from "react"
import { useColorScheme } from "react-native"

type colorContexType = {
    colors: ColorType
}

const colorContext = createContext<colorContexType | null>(null)

export function ColorProvider({children}:{children: React.ReactNode}){
    const theme = useColorScheme()
    const colors = useMemo(()=>{
        if (theme === "dark"){
            return THEMES.dark
        }
        return THEMES.light
    },[theme])
    return (
        <colorContext.Provider value={{colors}}>
            {children}
        </colorContext.Provider>
    )
}

export function useColor(){
    const context = useContext(colorContext)
    if (!context){
        throw Error("Load Color Failed")
    }
    return context
}