import { createContext, PropsWithChildren } from "react";

interface AuthContextType {}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
   


  return <AuthContext.Provider value={{}}>
    {children}
    </AuthContext.Provider>;
};
