import { useEffect } from "react";
import logo from '../assets/react.svg'
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductCard({id, name, description, price, filename}) {

    function handleAddToCart(ev){
        ev.preventDefault();
        axios
            .post(`/add-to-cart/${id}`)
            .then((res) => console.log(`Add to cart product with id: ${id}`))
        console.log(ev.target.type)
    }

    return (
        <div className="bg-white h-60 m-2 p-2 items-center flex">
            <Link to={`/products/${id}`}>
                <img src={filename ? `http://localhost:4000/files/${filename}` :  logo} 
                    alt="" 
                    width={150} height={150}/>
            </Link>
            <div className="p-2">
                <b className="">{name}</b>
                <div>{description}</div>
            </div>
            <div className="ml-auto">
                <div>Цена: {price}</div>
                <input type="button" onClick={handleAddToCart} className="bg-green-500 p-1 rounded-sm" value="Add to cart" />
            </div>
        </div>
    );
}