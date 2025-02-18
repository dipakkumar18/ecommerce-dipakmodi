import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext'
import { loginSchema } from '../AllScehma';

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "", password: ""
  });
  const [errors, setErrors] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const { email, password } = formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      const result = await login({ email, password });
      if (result.success)
        navigate("/");
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
        <h1 className="text-center">User Login</h1>
        <form onSubmit={submitHandler}>
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
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
