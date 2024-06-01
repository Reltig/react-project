import { Link } from "react-router-dom";
import logo from '../assets/react.svg';
import ProductImg from "../components/ProductImage";

export default function OrderCardProduct({id, name, description, price, filename, value}) {
    return (
        <div className="bg-white h-20 m-2 p-2 items-center flex">
            <Link to={`/products/${id}`}>
                <ProductImg filename={filename} width={20} height={20}/>
            </Link>
            <div className="p-2">
                <b className="">{name}</b>
                <div>{description}</div>
            </div>
            <div className="ml-auto">
                <div>Цена: {price}</div>
                <div>Количество: {value}</div>
            </div>
        </div>
    );
}