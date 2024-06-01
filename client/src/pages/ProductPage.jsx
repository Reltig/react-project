import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImg from "../components/ProductImage";

export default function ProductPage() {
    const {id} = useParams();
    const [data, setData] = useState({});

    useEffect(()=> {
        axios.get(`/product/${id}`)
            .then((res) => {
                setData(res.data);
            })
    }, []);

    return (
        <div className="p-2 bg-blue-100 min-h-screen">
            <ProductImg filename={data.filename} width={100} height={100} className="mx-auto"/>
            <p className="text-center font-bold">{data.name}</p>
            <p className="text-center">{data.description}</p>
            <p className="text-center italic">Цена: {data.price}</p>
        </div>
    )
}