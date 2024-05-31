import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext=createContext({});

export default function UserContextProvider({children}) {
    const [username, setUsername] = useState(null);
    const [id, setId] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        axios.get("/profile").then(res => {
            setId(res.data.userId);
            setUsername(res.data.username);
            setRole(res.data.role);
        })
    }, [username])

    return (
        <UserContext.Provider value={{username, setUsername, id, setId, role, setRole}}>
            {children}
        </UserContext.Provider>
    )
}

