// import axios from 'axios';
// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup'
// import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';

// const LoginPage = () => {
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
//             email: "",
//             password: "",
//         },
//         validationSchema: Yup.object().shape({
//             email: Yup.string().email("Invalid email address").required("Email is required"),
//             password: Yup.string().required("Password is required"),
//         }),
//         onSubmit: async (values) => {
//             const payload = { email: values.email, password: values.password };
//             try {
//                 const res = await axios.post("https://url-shortner-backend-sk.onrender.com/api/auth/login", payload)
//                 setMsg(res.data.message)
//                 setShowToast(true);
//                 setToastType("success");
//                 setTimeout(() => {
//                     navigate("/home");
//                 }, 3000);
//             } catch (error) {
//                 setMsg(error.response?.data?.message || "Login failed");
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
//                                     <strong>User Login</strong>
//                                     <p className='lead text-muted mt-2'>Access your account.</p>
//                                 </Card.Title>
//                                 <Form onSubmit={formik.handleSubmit}>
//                                     <Form.Floating className="mb-3">
//                                         <Form.Control
//                                             id="floatingInputCustom"
//                                             type="email"
//                                             name="email"
//                                             placeholder="name@example.com"
//                                             value={formik.values.email}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             isInvalid={formik.touched.email && formik.errors.email}
//                                         />
//                                         <label htmlFor="floatingInputCustom">Email address</label>
//                                         <Form.Control.Feedback type="invalid">
//                                             {formik.errors.email}
//                                         </Form.Control.Feedback>
//                                     </Form.Floating>

//                                     <Form.Group className="mb-3 position-relative">
//                                         <Form.Floating>
//                                             <Form.Control
//                                                 id="floatingPasswordCustom"
//                                                 type={showPassword ? "text" : "password"}
//                                                 name="password"
//                                                 placeholder="Password"
//                                                 value={formik.values.password}
//                                                 onChange={formik.handleChange}
//                                                 onBlur={formik.handleBlur}
//                                                 isInvalid={formik.touched.password && formik.errors.password}
//                                             />
//                                             <label htmlFor="floatingPasswordCustom">Password</label>
//                                             <Form.Control.Feedback type="invalid">
//                                                 {formik.errors.password}
//                                             </Form.Control.Feedback>
//                                         </Form.Floating>
//                                     </Form.Group>
//                                     {/* Navigate to Forgot Password Page */}
//                                     <div className="mb-3 text-end">
//                                         <Link to="/forgot-password">Forgot Password?</Link>
//                                     </div>
//                                     <Button variant="primary" type="submit" className="w-100">
//                                         Login
//                                     </Button>
//                                 </Form>

//                                 {/* Navigate to SignUp Page */}
//                                 <div className="mt-3 text-center">
//                                     <p>Don't have an account?<Link to="/">Sign UP</Link></p>
//                                 </div>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default LoginPage;

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

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const payload = { email: values.email, password: values.password };
            try {
                const res = await axios.post(
                    "https://url-shortner-backend-sk.onrender.com/api/auth/login",
                    payload
                );
                setMsg(res.data.message);
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            } catch (error) {
                setMsg(error.response?.data?.message || "Login failed");
            } finally {
                setLoading(false);
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
                    User Login
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" mb={3}>
                    Access your account.
                </Typography>

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
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        ),
                    }}
                />

                <Box textAlign="right" mt={1}>
                    <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                        <Typography variant="body2" color="primary">
                            Forgot Password?
                        </Typography>
                    </Link>
                </Box>

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
                            transition: "opacity 0.3s ease",
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Login"
                        )}
                    </Button>
                </Box>

                <Typography variant="body2" align="center" mt={2}>
                    Don't have an account?{" "}
                    <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
                        Sign Up
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginPage;
