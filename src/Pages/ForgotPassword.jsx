// import axios from "axios";
// import React, { useState } from "react";
// import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Link, useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//     // State varaiable for toast notifications
//     const [msg, setMsg] = useState("");
//     const [showToast, setShowToast] = useState(false);
//     const [toastType, setToastType] = useState("success");

//     //Formik
//     const formik = useFormik({
//         initialValues: {
//             email: "",
//         },
//         validationSchema: Yup.object().shape({
//             email: Yup.string().email("Invalid email address").required("Email is required"),
//         }),
//         onSubmit: async (values) => {
//             const payload = { email: values.email };
//             try {
//                 const res = await axios.post("https://url-shortner-backend-sk.onrender.com/api/auth/forgot-password", payload)
//                 setMsg(res.data.message)
//                 setShowToast(true);
//                 setToastType("success");
//                 setTimeout(() => {
//                     navigate("/login");
//                 }, 3000);
//             } catch (error) {
//                 setMsg(error.response?.data?.message || "Forgot Password failed");
//                 setToastType("error");
//                 setShowToast(true);
//             }
//         }
//     })

//     const navigate = useNavigate();
//     return (
//         <div className="bg-primary">
//             <Container className="d-flex justify-content-center align-items-center vh-100">
//                 <Row className="w-100">
//                     <Col md={6} lg={4} className="mx-auto">
//                         <Card className="p-4 shadow-sm">
//                             <Card.Body>
//                                 <Card.Title className="text-center mb-4">
//                                     <strong>Forgot Password</strong>
//                                     <p className='lead text-muted mt-2'>Enter your email to reset your password.</p>
//                                 </Card.Title>
//                                 <Form onSubmit={formik.handleSubmit}>
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

//                                     <Button variant="primary" type="submit" className="w-100">
//                                         Send Reset Link
//                                     </Button>
//                                 </Form>

//                                 {/* Navigate to Sign Up and Sign In Pages */}
//                                 <div className="mt-3 text-center">
//                                     <p>
//                                         Don't have an account? <Link to="/">Sign Up</Link>
//                                     </p>
//                                     <p>
//                                         Remember your password? <Link to="/login">Sign In</Link>
//                                     </p>
//                                 </div>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default ForgotPassword;


import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate,Link } from "react-router-dom";

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true); // Show spinner
            try {
                const payload = { email: values.email };
                const res = await axios.post(
                    "https://url-shortner-backend-sk.onrender.com/api/auth/forgot-password",
                    payload
                );
                setMsg(res.data.message);
                setTimeout(() => {
                    navigate("/login"); // Redirect to login page
                }, 3000);
            } catch (error) {
                setMsg(error.response?.data?.message || "Password reset failed");
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
                    Forgot Password
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" mb={3}>
                    Enter your email to reset your password.
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
                            "Send Reset Link"
                        )}
                    </Button>
                </Box>

                {msg && (
                    <Typography
                        variant="body2"
                        color={msg.includes("failed") ? "error" : "success"}
                        align="center"
                        mt={2}
                    >
                        {msg}
                    </Typography>
                )}

                <Typography variant="body2" align="center" mt={2}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
                        Sign In
                    </Link>
                </Typography>
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

export default ForgotPassword;
