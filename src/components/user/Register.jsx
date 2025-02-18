import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { registerSchema } from '../AllScehma';

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", email: "", password: ""
  });
  const [errors, setErrors] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const { name, email, password } = formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await registerSchema.validate(formData, { abortEarly: false });

      const result = await register({ name, email, password });

      if (result.success) {
        navigate('/login');
      }
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  }

  return (
    <>
      <div className="container my-5 p-5" style={{ maxWidth: "600px", border: "2px solid yellow", borderRadius: "10px" }}>
        <h1 className="text-center">User Registration</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">Name</label>
            <input 
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
              type="text" 
              className="form-control" 
              id="exampleInputName" 
            />
            {errors.name && <div className="error text-danger">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input 
              name="email"
              value={formData.email}
              onChange={onChangeHandler} 
              type="email" 
              className="form-control" 
              id="exampleInputEmail1" 
            />
            {errors.email && <div className="error text-danger">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
              name="password" 
              value={formData.password}
              onChange={onChangeHandler}
              type="password" 
              className="form-control" 
              id="exampleInputPassword1" 
            />
            {errors.password && <div className="error text-danger">{errors.password}</div>}
          </div>
          <div className="d-grid col-12 mx-auto my-3">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register;
