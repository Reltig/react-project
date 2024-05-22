import axios from "axios"
import { useEffect, useState } from "react"
import OrderCard from "../components/OrderCard";

export default function Orders() {
    
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("/orders").then((res) => setOrders(res.data));
    }, [])
    
    return (
        <div>
            <ul>
                {orders.map((o) => (
                    <OrderCard 
                        key={o._id}
                        products={o.result}/>
                ))}
            </ul>
        </div>
    )
}