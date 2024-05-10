import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <div className="p-2 bg-blue-100">
            <img src={`http://localhost:4000/files/${data.filename}`} alt="" className="mx-auto"/>
            <p className="text-center font-bold">{data.name}</p>
            <p className="text-center">{data.description}</p>
            <p className="text-center italic">Цена: {data.price}</p>
        </div>
    )
}