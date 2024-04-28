import SearchSidebar from "./components/SearchSidebar"
import SiteHeader from "./components/SiteHeader"
import SiteFooter from "./components/SiteFooter"
import ProductFilterContextProvider from "./ProductFilterContext"
import ProductsList from "./components/ProductsList"

export default function MainApp() {
    return (
        <div className="">
            <SiteHeader/>
            <ProductFilterContextProvider>
                <main className="mb-auto h-auto bg-green-500 flex">
                    <SearchSidebar/>
                    <ProductsList/>
                </main>
            </ProductFilterContextProvider>
            <SiteFooter/>
        </div>
    )
}