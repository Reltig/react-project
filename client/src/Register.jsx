import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export default function RegisterAndLogging() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggingOrRegister, setIsLoggingOrRegister] = useState("register");
    const [role, setRole] = useState("");
    const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);

    function changeRole(ev){
        ev.preventDefault();
        setRole(ev.target.value);
    }

    async function handleSubmit(ev){
        ev.preventDefault();
        const url = isLoggingOrRegister === "register" ? "register" : "login";
        const {data} = await axios.post(url, {username, password, role});
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
                {isLoggingOrRegister == "register" && (
                    <div className="flex">
                        <input type="radio" name="role" value="admin" onChange={changeRole} id="adm" />
                        <label htmlFor="adm">Admin</label>
                        &nbsp;
                        <input type="radio" name="role" value="user" onChange={changeRole} id="usr" />
                        <label htmlFor="usr">User</label>
                    </div>
                )}
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