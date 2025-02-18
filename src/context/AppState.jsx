import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios';
//toast
import { showToast } from "../utils/toastUtils";

const AppState = (props) => {
  const url = import.meta.env.VITE_REACT_APP_WEB_URL || "http://localhost:1000";
  const [products, setProducts] = useState([])
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState("");
  const [cart, setCart] = useState([]);
  const [userAddress, setUserAddress] = useState("")
  const [userOrder, setUserOrder] = useState([])



  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/api/product/all`,
        {
          headers: { "Content-Type": "Application/json" },
          withCredentials: true
        });
      setProducts(api.data.products);
      setFilterData(api.data.products);
      userProfile();
    }
    fetchProduct();
    userCart()
    getAddress()
    getUserOrder()
  }, [token]);

  useEffect(() => {
    let tokens = localStorage.getItem("token");
    if (tokens) {
      setToken(tokens)
      setIsAuthenticated(true);
    }
  }, [])


  //register
  const register = async ({ name, email, password }) => {
    const api = await axios.post(`${url}/api/user/register`,
      { name, email, password },
      {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true
      });
    showToast(api.data.message, api.data.success ? "success" : "error");
    return api.data;
  }

  //Login
  const login = async ({ email, password }) => {
    const api = await axios.post(`${url}/api/user/login`,
      { email, password },
      {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true
      });
    showToast(api.data.message, api.data.success ? "success" : "error");

    if (api.data.success) {
      setToken(api.data.token);
      setIsAuthenticated(true);
      localStorage.setItem("token", api.data.token);
    }
    return api.data;
  }

  //Logout
  const logout = () => {
    setIsAuthenticated(false);
    setToken(" ")
    localStorage.removeItem("token");
    showToast("Logout Successfull.", "success");
  }

  // user Profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/api/user/profile`,
      {
        headers: {
          "Content-Type": "Application/json",
          "Auth": token
        },
        withCredentials: true
      });
    setUser(api.data.user)

  }

  //add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(`${url}/api/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          "Auth": token
        },
        withCredentials: true
      });
    showToast(api.data.message, api.data.success ? "success" : "error");
    userCart()
  }

  //get User Cart
  const userCart = async () => {
    const api = await axios.get(`${url}/api/cart/user`,
      {
        headers: {
          "Content-Type": "Application/json",
          "Auth": token
        },
        withCredentials: true
      });
    setCart(api.data.cart);
  }

  //descrease qty
  const descreaseQty = async (productId, qty) => {
    const api = await axios.post(`${url}/api/cart/--qty`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "Application/json",
          "Auth": token
        },
        withCredentials: true
      });
    showToast(api.data.message, api.data.success ? "success" : "error");
    userCart()
  }

  //remove product from cart
  const removeProductFromCart = async (productId) => {
    const api = await axios.delete(`${url}/api/cart/remove/${productId}`,
      {
        headers: {
          "Content-Type": "Application/json",
          "Auth": token
        },
        withCredentials: true
      });
    showToast(api.data.message, api.data.success ? "success" : "error");
    userCart()
  }

  //clear cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/api/cart/clear`,
      {
        headers: {
          "Content-Type": "Application/json",
          "Auth": token
        },
        withCredentials: true
      });
    showToast(api.data.message, api.data.success ? "success" : "error");
    userCart()
  }

  //add new shipping address
  const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {
    const api = await axios.post(`${url}/api/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: {
          "Content-Type": "Application/json",
          "Auth": token
        },
        withCredentials: true
      });
    showToast(api.data.message, api.data.success ? "success" : "error");
    return api.data;
  }

  //Fetch User Address
  const getAddress = async () => {
    const api = await axios.get(`${url}/api/address/get`,
      {
        headers: {
          "Content-Type": "Application/json",
          "Auth": token
        },
        withCredentials: true
      });
    setUserAddress(api.data.userAddress);
  }

  //get user order
  const getUserOrder = async () => {
    const api = await axios.get(`${url}/api/payment/userorder`,
      {
        headers: {
          "Content-Type": "Application/json",
          "Auth": token
        },
        withCredentials: true
      });
    setUserOrder(api.data?.orders);
    
  }

  return (
    <AppContext.Provider value={{
      products,
      register,
      login,
      url,
      token,
      isAuthenticated,
      setIsAuthenticated,
      filterData,
      setFilterData,
      logout,
      user,
      addToCart,
      cart,
      descreaseQty,
      removeProductFromCart,
      clearCart,
      shippingAddress,
      userAddress,
      userOrder,
      getUserOrder,
      getAddress
    }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState