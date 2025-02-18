import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import RealtedProduct from './RealtedProduct';

const ProductDetail = () => {
    const { id } = useParams();
    const url = import.meta.env.VITE_REACT_APP_WEB_URL || "http://localhost:1000";
    const [product, setProduct] = useState([]);
    const { addToCart } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const api = await axios.get(`${url}/api/product/${id}`, {
                headers: { "Content-Type": "Application/json" },
                withCredentials: true
            });
            setProduct(api.data.product);
        };
        fetchProduct();
    }, [id]);

    return (
        <>
            <div className="container my-5">
                <div className="row align-items-center">
                    {/* Product Image Section */}
                    <div className="col-lg-4 col-md-5 col-sm-12 text-center mb-3">
                        <img
                            src={product?.imgSrc}
                            alt="No Img"
                            className="img-fluid rounded border border-warning"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>

                    {/* Product Details Section */}
                    <div className="col-lg-8 col-md-7 col-sm-12">
                        <h1 className="fw-bold text-primary">{product?.title}</h1>
                        <p className="text-secondary">{product?.description}</p>
                        <h2 className="text-info fw-bold">₹ {product?.price}</h2>

                        {/* Action Buttons */}
                        <div className="mt-4 d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                            <button className="btn btn-danger px-4 py-2 fw-bold" 
                                onClick={() => {addToCart(product._id, product.title, product.price, 1, product.imgSrc);
                                navigate('/shipping')}}
                            >Buy Now</button>
                            <button className="btn btn-warning px-4 py-2 fw-bold"
                                onClick={() =>
                                    addToCart(
                                        product._id,
                                        product.title,
                                        product.price,
                                        1,
                                        product.imgSrc
                                    )
                                }
                            >Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <RealtedProduct category={product?.category} />
        </>
    );
};

export default ProductDetail;
