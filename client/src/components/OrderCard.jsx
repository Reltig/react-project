import OrderCardProduct from "./OrderCardProduct";

export default function OrderCard({id, products}) {
    return (
        <div>
            <p>Заказ {id}</p>
            <ul>
                {products.map(p => (
                    <OrderCardProduct key={p._id} />
                ))}
            </ul>
        </div>
    );
}