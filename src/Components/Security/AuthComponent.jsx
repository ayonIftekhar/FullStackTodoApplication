import { createContext, useState } from "react";

export const securityContext = createContext();


export default function AuthComponent( { children }){

    const [isAuthorized , setAuthorized] = useState(false);

    const [currentUser , setCurrentUser] = useState("");

    const [token , setToken] = useState(null);

    function Logout(){
        setAuthorized(false);
    }

    function Login(){
        setAuthorized(true);
    }

    return (
        <securityContext.Provider value={ {isAuthorized , Login , Logout , currentUser , setCurrentUser , token , setToken} }>
            {children}
        </securityContext.Provider>
    )
}