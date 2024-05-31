import OrderCardProduct from "./OrderCardProduct";

export default function OrderCard({id, products}) {
    return (
        <div className="bg-white border-2 border-blue-200 rounded-sm mx-5">
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