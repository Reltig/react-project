import { useContext } from "react";
import { ProductFilterContext } from "../ProductFilterContext";

export default function SearchSidebar() {
    const {
        nameStartWithFilter, 
        setNameStartWithFilter,
        lowestPrice, 
        setLowestPrice,
        highestPrice, 
        setHighestPrice
    } = useContext(ProductFilterContext)

    function handle(setFunc){
        return (ev) => {
            ev.preventDefault()
            setFunc(ev.target.value);
        }
    }

    return (
        <aside className="rounded-sm bg-slate-200 p-3 my-2">
            <div className="mb-2">
                Enter name:
                <input type="text" value={nameStartWithFilter} onChange={handle(setNameStartWithFilter)}/>
            </div>
            <div className="mb-2 flex">
                <div className="mr-7">
                    From:
                    <input className="w-12" type="text" value={lowestPrice} onChange={handle(setLowestPrice)}/>
                </div>
                <div>
                    To:
                    <input className="w-12" type="text" value={highestPrice} onChange={handle(setHighestPrice)}/>
                </div>
            </div>
        </aside>
    );
}