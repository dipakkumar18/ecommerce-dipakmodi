import * as Yup from 'yup';

// Define the validation schema
export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// Define the validation schema for Registration
export const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

// Address Form Validation Schema
export const addressSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .required("Pincode is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits")
    .required("Phone Number is required"),
});
