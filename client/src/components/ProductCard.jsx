import { useEffect } from "react";
import logo from '../assets/react.svg'
import axios from "axios";

export default function ProductCard({id, name, description, price, filename}) {

    function handleAddToCart(ev){
        ev.preventDefault();
        axios
            .post(`/add-to-cart/${id}`)
            .then((res) => console.log(`Add to cart product with id: ${id}`))
        console.log(ev.target.type)
    }

    return (
        <div className="bg-white w-60 h-60 m-3 items-center">
            <img src={filename ? `http://localhost:4000/files/${filename}` :  logo} alt="" width="150" className="mx-auto"/>
            <div className="w-20 mx-auto">
                <h2>{name}</h2>
                <div>{description}</div>
                <div>{price}</div>
                <input type="button" onClick={handleAddToCart} className="bg-green-500" value="Add to cart" />
            </div>
        </div>
    );
}