import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export default function RegisterAndLogging() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggingOrRegister, setIsLoggingOrRegister] = useState("register");
    const {setUsername:setLoggedInUsername, setId} = useContext(UserContext)

    async function handleSubmit(ev){
        ev.preventDefault();
        const url = isLoggingOrRegister === "register" ? "register" : "login";
        const {data} = await axios.post(url, {username, password});
        setLoggedInUsername(username);
        setId(data.id);
    }

    return (
        <div className="bg-blue-100 h-screen flex items-center">
            <form className="w-64 mx-auto" onSubmit={handleSubmit}>
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
                <button className="bg-blue-700 block w-full p-2">
                    {isLoggingOrRegister === "login" ? "Login" : "Register"}
                </button>
                {isLoggingOrRegister == "register" && (
                    <div className="text-center mt-2">
                        Alreadry a member? 
                        <button onClick={() => setIsLoggingOrRegister("login")}>
                            Login here
                        </button>
                    </div>
                )}
                {isLoggingOrRegister == "login" && (
                    <div className="text-center mt-2">
                        Don't have account?
                        <button onClick={() => setIsLoggingOrRegister("register")}>
                            Register here
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}