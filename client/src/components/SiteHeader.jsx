import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function SiteHeader() {
    const { role } = useContext(UserContext);

    async function logout(ev){
        ev.preventDefault();
        await axios.get("/logout");
        localStorage.removeItem("token");
    }

    return (
        <header className="h-15 bg-blue-500 flex static">
            <Link to="/" className="text-white text-lg pl-2">Online-shop.shop</Link>
            <div>
                <ul className="flex absolute right-0 text-white">
                    <li className="mr-2"><Link to="/">Home</Link></li>
                    {role === "user" && (
                        <>
                        <li className="mr-2"><Link to="/cart">Cart</Link></li>
                        </>
                    )}
                    {role === "admin" && (
                        <>
                            <li className="mr-2"><Link to="/add-good">Add good</Link></li>
                            <li className="mr-2"><Link to="/orders">Orders</Link></li>
                            <li className="mr-2"><Link to="/users">Users</Link></li>
                        </>
                    )}
                    <li onClick={logout}>
                        <Link to="/">Logout</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}