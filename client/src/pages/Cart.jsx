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

    function createOrder(ev){
        ev.preventDefault();
        axios.post("/cart/create-order").then((res)=> console.log(res))
    }

    return (
        <div className="bg-blue-100 items-center min-h-screen">
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
            <div className="w-20 mx-auto">
                <input className="p-2 bg-white border-2 border-black" type="button" value="Create order" onClick={createOrder} />
            </div>
        </div>
    );
}