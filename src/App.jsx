import React, { useContext } from 'react'
import ShowProduct from './components/product/ShowProduct'
import AppContext from './context/AppContext'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import ProductDetail from './components/product/ProductDetail';
import Navbar from './components/Navbar';
import SearchProduct from './components/product/SearchProduct';
import Register from './components/user/Register';
import Login from './components/user/Login';
import Profile from './components/user/Profile';
import Cart from './components/Cart';
import Address from './components/Address';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';

//toast
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <>
    <Router>
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<ShowProduct/>}></Route>
        <Route path="/product/:id" element={<ProductDetail/>}></Route>
        <Route path="/product/search/:term" element={<SearchProduct/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/shipping" element={<Address/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>
        <Route path="/orderconfirmation" element={<OrderConfirmation/>}></Route>

      </Routes>
    </Router>
      
    </>
  )
}

export default App