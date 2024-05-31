import ProductFilterContextProvider from "../ProductFilterContext"
import SearchSidebar from "../components/SearchSidebar"
import ProductsList from "../components/ProductsList"

export default function GoodsList() {
    return (
        <ProductFilterContextProvider>
                <main className="mb-auto h-auto bg-blue-200 flex min-h-screen">
                    <SearchSidebar/>
                    <ProductsList/>
                </main>
        </ProductFilterContextProvider>
    );
}