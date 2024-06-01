import axios from "axios";
import { useEffect, useState } from "react";
import ProductImg from "../components/ProductImage"

export default function CartCard({id, name, description, price, filename, value}) {
    const [count, setCount] = useState(value);

    function handleDelete(ev){
        ev.preventDefault();
        axios.delete(`/cart/modify-value/${id}`);
        setCount(0);
    }

    function modifyValue(m) {
        return ((ev) => {
            ev.preventDefault();
            axios.patch(`/cart/modify-value/${id}`, {value: m});
            setCount(c => c+m);
        })
    }
    
    return (
        <div className="bg-white rounded mb-2 p-3">
            <h1>{name}</h1>
            <ProductImg filename={filename} width={50} height={50}/>
            <p>{description}</p>
            <p>Цена: {price}</p>
            <div className="flex">
                <p>Количество:</p>
                <button onClick={modifyValue(1)} className="text-white bg-green-500 w-4">+</button>
                <div className="px-2 mx-2 border border-solid border-black rounded-sm">{count}</div>
                <button onClick={modifyValue(-1)} className="text-white bg-red-500 w-4">-</button>
            </div>
            <input type="button" onClick={handleDelete} className="bg-red-500" value="Delete"/>
        </div>
    );
}