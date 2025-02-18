import React from 'react';
import moment from 'moment';

const ShowOrder = ({ order, isLatestOrder }) => {
  if (!order) {
    return <div>Loading...</div>; 
  }

  const { OrderItem, amount, userShipping, orderId, paymentId, orderDate } = order;

  return (
    <div className="container">

      <div className="my-4">
        <div className={`card ${isLatestOrder ? 'bg-success' : 'bg-dark'} text-light`}>
          <div className="card-body">
            <div className="row">
              {/* Left Column: Order Summary */}
              <div className="col-12 col-sm-6">
                <div className="table-responsive">
                  <table className="table table-bordered table-dark text-white">
                    <thead>
                      <tr className="bg-warning text-dark">
                        <th>Product</th>
                        <th>Title</th>
                        <th>Qty</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {OrderItem && OrderItem.map((product) => (
                        <tr key={product._id}>
                          <td>
                            <img
                              src={product.imgSrc}
                              alt="Product"
                              style={{
                                width: "75px",
                                height: "75px",
                                borderRadius: "8px"
                              }}
                            />
                          </td>
                          <td>{product.title}</td>
                          <td>{product.qty}</td>
                          <td>₹{product.price}</td>
                        </tr>
                      ))}
                      <tr className="bg-secondary text-white">
                        <td colSpan="2" className="text-end fs-5 fw-bold">Total:</td>
                        <td className="fs-5">
                          {OrderItem && OrderItem.reduce((acc, item) => acc + item.qty, 0)}
                        </td>
                        <td className="fs-5 text-info fw-bold">₹ {amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <h5 className="text-light">🚚 Shipping Address</h5>
                <div className="p-3 text-white">
                  <p>
                    <strong>Full Name:</strong> {userShipping?.fullName} <br />
                    <strong>Address:</strong> {userShipping?.address}, {userShipping?.city}, {userShipping?.state}, {userShipping?.country} - {userShipping?.pincode} <br />
                    <strong>Phone:</strong> {userShipping?.phoneNumber} <br /><br />
                    <hr />
                    <strong>Order ID:</strong> {orderId}<br />
                    <strong>Payment ID:</strong> {paymentId}<br />
                    <strong>Order Date:</strong> {moment(userShipping.createdAt).format('DD MMM YYYY, hh:mm A')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ShowOrder;
