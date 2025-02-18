import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import ShowOrder from '../components/ShowOrder';

const OrderConfirmation = () => {
    const { userOrder, getUserOrder } = useContext(AppContext);
    const [latestOrder, setLatestOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userOrder && userOrder.length > 0) {
            setLatestOrder(userOrder[0]); 
        }
        getUserOrder();
    }, [userOrder]);

    if (!latestOrder) {
        return <h2 className="text-center text-warning my-5">Fetching latest order...</h2>; 
    }

    return (
        <div className="container my-5">
            <div className="text-center">
                <h1 className="text-success">✅ Your Order is Confirmed!</h1>
                <p className="fs-5"><strong>It will be delivered soon.</strong></p>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <ShowOrder order={latestOrder} isLatestOrder={true} />
                </div>
            </div>

            <div className="text-center mt-4">
                <button className="btn btn-success mx-2 fw-bold px-4" onClick={() => navigate('/')}>Continue Shopping</button>
            </div>
        </div>
    );
};

export default OrderConfirmation;
