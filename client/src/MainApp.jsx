import SearchSidebar from "./components/SearchSidebar"
import SiteHeader from "./components/SiteHeader"
import SiteFooter from "./components/SiteFooter"
import ProductFilterContextProvider from "./ProductFilterContext"
import ProductsList from "./components/ProductsList"
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet
  } from 'react-router-dom';
import GoodsList from "./pages/GoodsList"

export default function MainApp() {
    return (
        <div className="">
            <SiteHeader/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" index element={<GoodsList/>}/>
                </Routes>
            </BrowserRouter>
            <Outlet/>
            <SiteFooter/>
        </div>
    )
}