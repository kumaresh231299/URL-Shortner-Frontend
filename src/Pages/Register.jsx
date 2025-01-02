// import axios from 'axios';
// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup'
// import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// const Register = () => {
//     // State varaiable for toast notifications
//     const [msg, setMsg] = useState("");
//     const [showToast, setShowToast] = useState(false);
//     const [toastType, setToastType] = useState("success");

//     // State varaiable for password visibility
//     const [showPassword, setShowPassword] = useState(false);

//     const navigate = useNavigate();

//     //Formik
//     const formik = useFormik({
//         initialValues: {
//             firstName: "",
//             lastName: "",
//             email: "",
//             password: "",
//         },
//         validationSchema: Yup.object().shape({
//             firstName: Yup.string().required("first Name is required"),
//             lastName: Yup.string().required("last Name is required"),
//             email: Yup.string().email("Invalid email address").required("Email is required"),
//             password: Yup.string().min(8, "Password must be at least 8 characters")
//                 .matches(/[A-Z]/, "Password must contain an uppercase letter")
//                 .matches(/[a-z]/, "Password must contain a lowercase letter")
//                 .matches(/\d/, "Password must contain a number")
//                 .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a special character")
//                 .required("Password is required"),
//         }),
//         onSubmit: async (values) => {
//             const payload = { firstname: values.firstName, lastname: values.lastName, email: values.email, password: values.password };
//             try {
//                 const res = await axios.post("https://url-shortner-backend-sk.onrender.com/api/auth/register", payload);
//                 setMsg(res.data.message);
//                 setShowToast(true);
//                 setToastType("success");
//                 setTimeout(() => {
//                     navigate("/login");
//                 }, 3000);

//             } catch (error) {
//                 setMsg(error.response?.data?.message || "Registration failed");
//                 setToastType("error");
//                 setShowToast(true);
//             }
//         }
//     })

//     return (
//         <div className='bg-primary'>
//             <Container className="d-flex justify-content-center align-items-center vh-100">
//                 <Row className="w-100">
//                     <Col md={6} lg={4} className="mx-auto">
//                         <Card className="p-4 shadow-sm">
//                             <Card.Body>
//                                 <Card.Title className="text-center mb-4">
//                                     <strong>User Registration</strong>
//                                     <p className='lead text-muted mt-2'>Create your account to get started.</p>
//                                 </Card.Title>
//                                 <Form onSubmit={formik.handleSubmit}>
//                                     <Form.Floating className="mb-3">
//                                         <Form.Control
//                                             id="floatingFirstname"
//                                             name="firstname"
//                                             type="text"
//                                             placeholder="First Name"
//                                             value={formik.values.firstname}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             isInvalid={formik.touched.firstname && formik.errors.firstname}
//                                         />
//                                         <label htmlFor="floatingFirstname">First Name</label>
//                                         <Form.Control.Feedback type="invalid">
//                                             {formik.errors.firstname}
//                                         </Form.Control.Feedback>
//                                     </Form.Floating>

//                                     <Form.Floating className="mb-3">
//                                         <Form.Control
//                                             id="floatingLastname"
//                                             name="lastname"
//                                             type="text"
//                                             placeholder="Last Name"
//                                             value={formik.values.lastname}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             isInvalid={formik.touched.lastname && formik.errors.lastname}
//                                         />
//                                         <label htmlFor="floatingLastname">Last Name</label>
//                                         <Form.Control.Feedback type="invalid">
//                                             {formik.errors.lastname}
//                                         </Form.Control.Feedback>
//                                     </Form.Floating>

//                                     <Form.Floating className="mb-3">
//                                         <Form.Control
//                                             id="floatingEmail"
//                                             name="email"
//                                             type="email"
//                                             placeholder="name@example.com"
//                                             value={formik.values.email}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             isInvalid={formik.touched.email && formik.errors.email}
//                                         />
//                                         <label htmlFor="floatingEmail">Email address</label>
//                                         <Form.Control.Feedback type="invalid">
//                                             {formik.errors.email}
//                                         </Form.Control.Feedback>
//                                     </Form.Floating>

//                                     <Form.Group className="mb-3 position-relative">
//                                         <Form.Floating>
//                                             <Form.Control
//                                                 id="floatingPassword"
//                                                 name="password"
//                                                 type={showPassword ? "text" : "password"}
//                                                 placeholder="Password"
//                                                 value={formik.values.password}
//                                                 onChange={formik.handleChange}
//                                                 onBlur={formik.handleBlur}
//                                                 isInvalid={formik.touched.password && formik.errors.password}
//                                             />
//                                             <label htmlFor="floatingPassword">Password</label>
//                                             <Form.Control.Feedback type="invalid">
//                                                 {formik.errors.password}
//                                             </Form.Control.Feedback>
//                                             <Button type='button' className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
//                                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                             </Button>
//                                         </Form.Floating>

//                                     </Form.Group>

//                                     <Button variant="primary" type="submit" className="w-100">Register</Button>
//                                 </Form>

//                                 {/* Spinner */}
//                                 {/* <Spinner animation="border" role="status">
//                                     <span className="visually-hidden">Loading...</span>
//                                 </Spinner> */}

//                                 {/* Navigate to Login Page */}
//                                 <div className="mt-3 text-center">
//                                     <p>Already have an account? <Link to="/login">Sign In</Link></p>
//                                 </div>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default Register;

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    // Formik for form handling and validation
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .matches(/[A-Z]/, "Password must contain an uppercase letter")
                .matches(/[a-z]/, "Password must contain a lowercase letter")
                .matches(/\d/, "Password must contain a number")
                .matches(
                    /[!@#$%^&*(),.?":{}|<>]/,
                    "Password must contain a special character"
                )
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true); // Show spinner
            try {
                const payload = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                };
                const res = await axios.post(
                    "https://url-shortner-backend-sk.onrender.com/api/auth/register",
                    payload
                );
                setMsg(res.data.message);
                setTimeout(() => {
                    navigate("/login"); // Redirect to login
                }, 2000);
            } catch (error) {
                setMsg(error.response?.data?.message || "Registration failed");
            } finally {
                setLoading(false); // Hide spinner
            }
        },
    });

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="primary.main"
        >
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                noValidate
                sx={{
                    backgroundColor: "#fff",
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    maxWidth: 400,
                    width: "100%",
                }}
            >
                <Typography variant="h5" align="center" mb={2}>
                    User Registration
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" mb={3}>
                    Create your account to get started.
                </Typography>

                <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin="normal"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        },
                    }}
                />

                <Box mt={2} textAlign="center">
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        color="primary"
                        size="large"
                        disabled={loading}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: loading ? 0.7 : 1,
                            transition: "opacity 0.3s ease"
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Register"
                        )}
                    </Button>
                </Box>

                <Typography variant="body2" align="center" mt={2}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
                        Sign In
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Register;
