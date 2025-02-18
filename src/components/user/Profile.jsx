import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import ShowOrder from '../ShowOrder';

const Profile = () => {
    const { user, userOrder } = useContext(AppContext);

    return (
        <>
            <div className="container my-3">
                <button className="btn btn-lg btn-info fs-2 w-100 w-sm-auto">
                    Welcome, {user?.name}
                </button>
                <h1 className="text-end my-3">Total Orders: {userOrder?.length}</h1>
                {userOrder && (
                    <h3 className="text-warning">🛒 Order Summary</h3>
                )}
            </div>

            {/* <div className="container"> */}
                    {userOrder?.map((order) => (
                        <div key={order?.orderId}>
                            <ShowOrder order={order} isLatestOrder={false} />
                        </div>
                    ))}
            {/* </div> */}
        </>
    );
};

export default Profile;
