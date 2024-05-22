import { Link } from "react-router-dom";

export default function SiteHeader() {
    return (
        <header className="h-15 bg-blue-500 flex static">
            <Link to="/" className="text-white text-lg pl-2">Online-shop.shop</Link>
            <div>
                <ul className="flex absolute right-0 text-white">
                    <li className="mr-2"><Link to="/">Home</Link></li>
                    <li className="mr-2"><Link to="/add-good">Add good</Link></li>
                    <li className="mr-2"><Link to="/cart">Cart</Link></li>
                    <li className="mr-2"><Link to="/orders">Orders</Link></li>
                </ul>
            </div>
        </header>
    );
}