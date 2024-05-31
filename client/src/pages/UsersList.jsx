import { useEffect, useState } from "react"
import axios from "axios"
import UserCard from "../components/UserCard"

export default function UsersList() {
    const [list, setList] = useState([])

    useEffect(()=>{
        axios.get("/users").then(res => setList(res.data));
    }, [])
    
    return (
        <div className="bg-blue-300 min-h-screen p-2">
            {list.map((userData) => (
                    <UserCard 
                        key={userData._id}
                        id={userData._id}
                        username={userData.username}/>
            ))}
        </div>
    )
}