import { useContext, useEffect, useState } from "react"
import { ProductFilterContext } from "../ProductFilterContext"
import ProductCard from "./ProductCard";
import axios from "axios";

export default function ProductsList() {
    const {
        nameStartWithFilter, 
        lowestPrice, 
        highestPrice
    } = useContext(ProductFilterContext)
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.post("/goods-list", {startWith: nameStartWithFilter, lowestPrice, highestPrice})
            .then((res) => setList(res.data));
    }, [nameStartWithFilter, lowestPrice, highestPrice])

    return (
        <div className="w-full">
            {list.map(el => (
                <ProductCard key={el._id} id={el._id} name={el.name} description={el.description} price={el.price} filename={el.filename}/>
            ))}
        </div>
    )
}