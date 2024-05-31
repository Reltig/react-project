import { useContext, useEffect, useState } from "react";
import { ProductFilterContext } from "../ProductFilterContext";
import axios from "axios";

export default function SearchSidebar() {
    const {
        nameStartWithFilter, 
        setNameStartWithFilter,
        lowestPrice, 
        setLowestPrice,
        highestPrice, 
        setHighestPrice,
        category, 
        setCategory
    } = useContext(ProductFilterContext);

    const [categories, setCategories] = useState([]);

    useEffect(()=> {
        axios.get("/categories").then(res => setCategories(res.data));
    }, [])

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
            <div className="flex">
                <p>Category:&nbsp;</p>
                <select name="" value={category} onChange={e => setCategory(e.target.value)}>
                    {categories.map(category => 
                        <option key={category._id} value={category.name}>{category.name}</option>
                    )}
                </select>
            </div>
        </aside>
    );
}