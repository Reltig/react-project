import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductFilterContext=createContext({});

export default function ProductFilterContextProvider({children}) {
    const [nameStartWithFilter, setNameStartWithFilter] = useState("");
    const [lowestPrice, setLowestPrice] = useState(0);
    const [highestPrice, setHighestPrice] = useState(null);

    return (
        <ProductFilterContext.Provider value={{
            nameStartWithFilter, 
            setNameStartWithFilter,
            lowestPrice, 
            setLowestPrice,
            highestPrice, 
            setHighestPrice}}>
            {children}
        </ProductFilterContext.Provider>
    )
}