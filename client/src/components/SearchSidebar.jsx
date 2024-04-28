import { useContext } from "react";
import { ProductFilterContext } from "../ProductFilterContext";

export default function SearchSidebar() {
    const {nameStartWithFilter, setNameStartWithFilter} = useContext(ProductFilterContext)

    function handle(ev){
        ev.preventDefault()
        setNameStartWithFilter(ev.target.value);
    }

    return (
        <aside className="bg-fuchsia-900 w-64 p-2">
            Enter name:
            <input type="text" value={nameStartWithFilter} onChange={handle}/>
        </aside>
    );
}