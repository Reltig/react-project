import { useEffect, useState } from "react";
import axios from "axios";
import CartCard from "../components/CartCard";

export default function Cart() {
    const [cart, setCart] = useState([])
    useEffect(() => {
        axios.get("/user-cart")
            .then((res) => {
                setCart(res.data);
                console.log(res.data);
            });
    }, []);

    return (
        <div className="bg-blue-100 flex items-center">
            <ul className="w-96 mx-auto">
                {cart.map(prod => (
                    <CartCard 
                        key={prod._id}
                        id={prod._id}
                        value={prod.value}
                        name={prod.name} 
                        description={prod.description} 
                        price={prod.price} 
                        filename={prod.filename}/>
                ))}
            </ul>
        </div>
    );
}