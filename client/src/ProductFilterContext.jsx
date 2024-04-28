import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductFilterContext=createContext({});

export default function ProductFilterContextProvider({children}) {
    const [nameStartWithFilter, setNameStartWithFilter] = useState("");

    return (
        <ProductFilterContext.Provider value={{nameStartWithFilter, setNameStartWithFilter}}>
            {children}
        </ProductFilterContext.Provider>
    )
}