import { AuthProvider } from "@/context/AuthContext";
import { PropsWithChildren } from "react";


export const AppProvider = ({children}: PropsWithChildren) => {


    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}