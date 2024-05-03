import { useEffect } from "react";
import logo from '../assets/react.svg'

export default function ProductCard({name, description, price, filename}) {

    return (
        <div className="bg-white w-60 h-60 m-3 items-center">
            <img src={filename ? `http://localhost:4000/files/${filename}` :  logo} alt="" width="150" className="mx-auto"/>
            <div className="w-20 mx-auto">
                <h2>{name}</h2>
                <div>{description}</div>
                <div>{price}</div>
            </div>
        </div>
    );
}