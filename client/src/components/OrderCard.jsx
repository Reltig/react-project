import OrderCardProduct from "./OrderCardProduct";

export default function OrderCard({id, products}) {
    return (
        <div className="border-2 border-black">
            <p>Заказ {id}</p>
            <ul>
                {products.map(p => (
                    <OrderCardProduct 
                        key={p._id} 
                        id={p._id} 
                        name={p.name} 
                        description={p.description} 
                        price={p.price}
                        filename={p.filename}
                        value={p.value}/>
                ))}
            </ul>
        </div>
    );
}