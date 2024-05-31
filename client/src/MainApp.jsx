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
import AddGoodPage from "./pages/AddGoodPage"
import Cart from "./pages/Cart"
import ProductPage from "./pages/ProductPage"
import Orders from "./pages/Orders"
import UsersList from "./pages/UsersList"

export default function MainApp() {
    return (
        <div className="">
            <BrowserRouter>
                <SiteHeader/>
                <Routes>
                    <Route path="/" index element={<GoodsList/>}/>
                    <Route path="/add-good" element={<AddGoodPage/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/products/:id" element={<ProductPage/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/users" element={<UsersList/>}/>
                </Routes>
                <Outlet/>
                <SiteFooter/>
            </BrowserRouter>
        </div>
    )
}