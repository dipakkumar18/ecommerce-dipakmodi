import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Cart = () => {
  const { cart, descreaseQty, removeProductFromCart, addToCart, clearCart } = useContext(AppContext);
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
  }, [cart]);

  return (
    <div className="container my-5">

      {cart?.items?.length > 0 ? (
        <>
          <div className="text-center my-3">
            <button className="btn btn-info mx-3 fw-bold fs-4">Total Qty: {qty}</button>
            <button className="btn btn-danger mx-3 fw-bold fs-4">Total Price: ₹{price}</button>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {cart?.items?.map((product) => (
              <div key={product._id} className="col mb-4">
                <div className="card bg-dark text-light p-3">
                  <img src={product?.imgSrc} alt="No img" className="card-img-top" style={{ height: "180px", objectFit: "cover", borderRadius: "10px" }} />
                  <div className="card-body">
                    <h5 className="card-title">{product?.title}</h5>
                    <p className="text-info fs-5">₹{product?.price}</p>

                    <div className="d-flex align-items-center justify-content-between p-2 border border-warning rounded-pill">
                      {product?.qty === 1 ? (
                        <span
                          onClick={() => {
                            if (confirm("Are You sure you want to remove this item?")) {
                              removeProductFromCart(product?.productId);
                            }
                          }}
                          className="material-symbols-outlined text-danger"
                          style={{ cursor: "pointer" }}>delete</span>
                      ) : (
                        <span
                          onClick={() => descreaseQty(product?.productId, 1)}
                          className="material-symbols-outlined text-warning"
                          style={{ cursor: "pointer" }}>remove</span>
                      )}

                      <span className="fw-bold">{product?.qty}</span>

                      <span
                        onClick={() =>
                          addToCart(
                            product.productId,
                            product.title,
                            product.price,
                            1,
                            product.imgSrc
                          )
                        }
                        className="material-symbols-outlined text-success"
                        style={{ cursor: "pointer" }}>add</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button onClick={() => navigate('/shipping')} className="btn btn-warning mx-2 fs-5 px-4">
              Checkout
            </button>
            <button
              onClick={() => {
                if (confirm("Are You sure you want to clear the cart?")) {
                  clearCart();
                }
              }}
              className="btn btn-danger mx-2 fs-5 px-4">
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-warning">Your Cart is Empty</h2>
          <button className="btn btn-warning mt-3 fs-5 px-4" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
