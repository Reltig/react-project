import { useContext } from "react";
import { ProductFilterContext } from "../ProductFilterContext";

export default function SearchSidebar() {
    const {nameStartWithFilter, setNameStartWithFilter} = useContext(ProductFilterContext)

    function handle(ev){
        ev.preventDefault()
        setNameStartWithFilter(ev.target.value);
    }

    return (
        <aside className="rounded-sm bg-slate-200 p-3 my-2">
            Enter name:
            <input type="text" value={nameStartWithFilter} onChange={handle}/>
        </aside>
    );
}