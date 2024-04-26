import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setUsername:setLoggedInUsername, setId} = useContext(UserContext)

    async function register(ev){
        ev.preventDefault();
        console.log(username, password);
        const {data} = await axios.post("/register", {username, password});
        setLoggedInUsername(username);
        setId(data.id);
    }

    return (
        <div className="bg-blue-100 h-screen flex items-center">
            <form className="w-64 mx-auto" onSubmit={register}>
                <input type="text" 
                    value={username}
                    onChange={ev=>setUsername(ev.target.value)} 
                    placeholder="username" 
                    className="block w-full p-2 mb-2 border-s-4"/>
                <input type="password" 
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} 
                    placeholder="password" 
                    className="block w-full p-2 mb-2 border-s-4"/>
                <button className="bg-blue-700 block w-full p-2">Register</button>
            </form>
        </div>
    );
}