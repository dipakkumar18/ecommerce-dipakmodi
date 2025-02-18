import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import axios from 'axios';

const Checkout = () => {
  const { cart, descreaseQty, removeProductFromCart, addToCart, clearCart, userAddress, getAddress, url, user, token } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;
    cart?.items?.forEach(item => {
      totalQty += item.qty;
      totalPrice += item.price * item.qty; 
    });
    setQty(totalQty);
    setPrice(totalPrice);
    getAddress();
  }, [cart]);

  // Razorpay handle
  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(`${url}/api/payment/checkout-payment`, {
        amount: price,
        qty: qty,
        cartItem: cart?.items,
        userShipping: userAddress,
        userId: user._id
      }, {
        headers: {
          "Content-Type": "Application/json",
          "Auth": token
        },
      });

      const { orderId, amount: orderAmount } = orderResponse.data;
      const options = {
        "key": import.meta.env.VITE_REACT_APP_SECRET_KEY, 
        "amount": orderAmount * 100,
        "currency": "INR",
        "name": "Dipak E-Commerce project",
        "description": "Dipak demo project e-commerce (full stack)",
        "order_id": orderId,
        "handler": async function (response) {
          const paymentData = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            OrderItem: cart?.items,
            userId: user?._id,
            userShipping: userAddress
          };

          const api = await axios.post(`${url}/api/payment/verify-payment`, paymentData);
          if (api.data.success) {
            clearCart();
            navigate('/orderconfirmation');
          }
        },
        "prefill": {
          "name": "Dipak E-Commerce project",
          "email": "dipak@example.com",
          "contact": "9000090000"
        },
        "notes": {
          "address": "Ahmedabad India"
        },
        "theme": {
          "color": "#3399cc"
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment handling:', error);
      alert("Payment failed. Please try again!");
    }
  };


  return (
    <div className="container my-5">
      
      {cart?.items?.length === 0 ? (
        <div className="text-center">
          <h2 className="text-warning">Your Cart is Empty</h2>
          <button className="btn btn-warning mt-3 fs-5 px-4" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-center mb-4">Order Summary</h1>

          <div className="row">
            <div className="col-12 col-md-8 mb-4">
              <table className="table table-borderless table-dark text-white">
                <thead>
                  <tr className="bg-warning text-dark">
                    <th>Product</th>
                    <th>Title</th>
                    <th>Qty(+)</th>
                    <th>Qty</th>
                    <th>Qty(-)</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.items?.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img src={product.imgSrc} alt="Product" style={{ width: "75px", height: "75px" }} />
                      </td>
                      <td>{product.title}</td>
                      <td>
                        {product?.qty === 1 ? (
                          <span
                            onClick={() => removeProductFromCart(product?.productId)}
                            className="material-symbols-outlined text-warning"
                            style={{ cursor: "pointer" }}>remove</span>
                        ) : (
                          <span
                            onClick={() => descreaseQty(product?.productId, 1)}
                            className="material-symbols-outlined text-warning"
                            style={{ cursor: "pointer" }}>remove</span>
                        )}
                      </td>
                      <td>{product.qty}</td>
                      <td>
                        <span
                          onClick={() => addToCart(product.productId, product.title, product.price, 1, product.imgSrc)}
                          className="material-symbols-outlined text-success"
                          style={{ cursor: "pointer" }}>add</span>
                      </td>
                      <td>₹{product.price}</td>
                    </tr>
                  ))}
                  <tr className="bg-secondary text-white">
                    <td colSpan="4"></td>
                    <td className="fs-4">Total:</td>
                    <td className="text-info fs-4 fw-bold">₹{price}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-12 col-md-4">
              <div className="card bg-dark text-light p-5">
                <h3 className='text-warning'>🚚 Shipping Address</h3>
                <h4>{userAddress?.fullName}</h4>
                <p><strong>📍 Address:</strong> {userAddress?.address}, {userAddress?.city}, {userAddress?.state}, {userAddress?.country} - {userAddress?.pincode}</p>
                <p><strong>📞 Phone:</strong> {userAddress?.phoneNumber}</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button onClick={handlePayment} className="btn btn-success mx-2 fw-bold px-4">Place Order</button>
            <button className="btn btn-danger mx-2 fw-bold px-4" onClick={() => clearCart()}>Clear Cart</button>
          </div>

        </>
      )}
    </div>
  );
};

export default Checkout;
