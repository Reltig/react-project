import { Link } from "react-router-dom";

export default function SiteHeader() {
    return (
        //TODO: экспорт сюда и в Main App из одного места
        <header className="h-15 bg-red-200">
            Header
            <ul className="flex">
                <li className="mr-2"><Link to="/">Home</Link></li>
                <li className="mr-2"><Link to="/add-good">Add good</Link></li>
                <li className="mr-2"><Link to="/cart">Cart</Link></li>
            </ul>
        </header>
    );
}