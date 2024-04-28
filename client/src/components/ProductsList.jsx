import { useContext, useEffect, useState } from "react"
import { ProductFilterContext } from "../ProductFilterContext"
import ProductCard from "./ProductCard";
import axios from "axios";

export default function ProductsList() {
    const {nameStartWithFilter} = useContext(ProductFilterContext);
    const [list, setList] = useState([{name: "name0", description: "descr", price: 100}]);

    useEffect(() => {
        axios.post("/goods-list", {startWith: nameStartWithFilter})
            .then((res) => setList(res.data));
    }, [nameStartWithFilter])

    return (
        <div className="grid grid-cols-4">
            {list.map(el => (
                <ProductCard key={el.name} name={el.name} description={el.description} price={el.price}/>
            ))}
        </div>
    )
}