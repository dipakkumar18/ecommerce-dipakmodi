import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { addressSchema } from './AllScehma';

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: ""
  });
  const [errors, setErrors] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } = formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addressSchema.validate(formData, { abortEarly: false });
      const result = await shippingAddress(fullName, address, city, state, country, pincode, phoneNumber);

      if (result.success) {
        navigate("/checkout");
      }

      setFormData({ fullName: "", address: "", city: "", state: "", country: "", pincode: "", phoneNumber: "" });
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div className="container my-5 p-5" style={{ border: "2px solid yellow", borderRadius: "10px" }}>
        <h1 className="text-center">Shipping Address</h1>
        <form onSubmit={submitHandler}>
          <div className="row">
            <div className="mb-3 col-12 col-sm-6 col-md-4">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="fullName"
              />
              {errors.fullName && <div className="error text-danger">{errors.fullName}</div>}
            </div>
            <div className="mb-3 col-12 col-sm-6 col-md-4">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="country"
              />
              {errors.country && <div className="error text-danger">{errors.country}</div>}
            </div>
            <div className="mb-3 col-12 col-sm-6 col-md-4">
              <label htmlFor="state" className="form-label">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="state"
              />
              {errors.state && <div className="error text-danger">{errors.state}</div>}
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-12 col-sm-6 col-md-4">
              <label htmlFor="city" className="form-label">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="city"
              />
              {errors.city && <div className="error text-danger">{errors.city}</div>}
            </div>
            <div className="mb-3 col-12 col-sm-6 col-md-4">
              <label htmlFor="pincode" className="form-label">Pincode</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={onChangeHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="pincode"
              />
              {errors.pincode && <div className="error text-danger">{errors.pincode}</div>}
            </div>
            <div className="mb-3 col-12 col-sm-6 col-md-4">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="phoneNumber"
              />
              {errors.phoneNumber && <div className="error text-danger">{errors.phoneNumber}</div>}
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-12">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={onChangeHandler}
                className="form-control bg-dark text-light"
                id="address"
              />
              {errors.address && <div className="error text-danger">{errors.address}</div>}
            </div>
          </div>
          <div className="d-grid col-12 mx-auto my-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>

        {userAddress && (
          <div className="d-grid col-12 mx-auto y-3">
            <button onClick={() => navigate('/checkout')} className="btn btn-warning">Use Old Address</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Address;
