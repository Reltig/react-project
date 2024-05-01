import ProductFilterContextProvider from "../ProductFilterContext"
import SearchSidebar from "../components/SearchSidebar"
import ProductsList from "../components/ProductsList"

export default function GoodsList() {
    return (
        <ProductFilterContextProvider>
                <main className="mb-auto h-auto bg-green-500 flex">
                    <SearchSidebar/>
                    <ProductsList/>
                </main>
        </ProductFilterContextProvider>
    );
}