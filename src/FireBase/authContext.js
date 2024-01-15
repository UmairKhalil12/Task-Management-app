import { onAuthStateChanged } from "firebase/auth";
import { useState , useEffect } from "react";
import { createContext } from "react";
import { auth } from "./FireBase";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const[currentUser , SetcurrentUser] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(auth , (user)=>{
            SetcurrentUser(user);
        })
    } , [])

    return(
        <AuthContext.Provider
        value={{currentUser}}
        >        
        {children}
        </AuthContext.Provider>
    )

}