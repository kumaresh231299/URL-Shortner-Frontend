// import axios from 'axios';
// import React, { useState } from 'react';
// import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
// import { useFormik } from 'formik';
// import * as Yup from "yup";
// import { useNavigate, useParams } from 'react-router-dom';

// const ResetPassword = () => {
//     // State varaiable for toast notifications
//     const [msg, setMsg] = useState("");
//     const [showToast, setShowToast] = useState(false);
//     const [toastType, setToastType] = useState("success");

//     const navigate = useNavigate();

//     //Formik
//     const formik = useFormik({
//         initialValues: {
//             newPassword: "",
//             confirmPassword: "",
//         },
//         validationSchema: Yup.object().shape({
//             newPassword: Yup.string()
//                 .required("New Password is required")
//                 .min(8, "Password must be at least 8 characters")
//                 .matches(
//                     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                     "Must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
//                 ),
//             confirmPassword: Yup.string()
//                 .required("Confirm Password is required")
//                 .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
//         }),
//         onSubmit: async (values) => {
//             const payload = { newPassword: values.newPassword };
//             try {
//                 const res = await axios.put(`https://url-shortner-backend-sk.onrender.com/api/user/reset-password/${id}/${token}`, payload)
//                 setMsg(res.data.message)
//                 setShowToast(true);
//                 setToastType("success");
//                 setTimeout(() => {
//                     navigate("/login");
//                 }, 3000);
//             } catch (error) {
//                 setMsg(error.response?.data?.message || "Reset Password failed");
//                 setToastType("danger");
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
//                                     <strong>Reset Password</strong>
//                                     <p className='lead text-muted mt-2'>Create a new password for your account.</p>
//                                 </Card.Title>
//                                 <Form onSubmit={formik.handleSubmit}>
//                                     <Form.Floating className="mb-3">
//                                         <Form.Control
//                                             id="floatingNewPassword"
//                                             name="newPassword"
//                                             type="password"
//                                             placeholder="New Password"
//                                             value={formik.values.newPassword}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             isInvalid={formik.touched.newPassword && formik.errors.newPassword}
//                                         />
//                                         <label htmlFor="floatingNewPassword">New Password</label>
//                                         <Form.Control.Feedback type="invalid">
//                                             {formik.errors.newPassword}
//                                         </Form.Control.Feedback>
//                                     </Form.Floating>

//                                     <Form.Floating className="mb-3">
//                                         <Form.Control
//                                             id="floatingConfirmPassword"
//                                             name="confirmPassword"
//                                             type="password"
//                                             placeholder="Confirm Password"
//                                             value={formik.values.confirmPassword}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
//                                         />
//                                         <label htmlFor="floatingConfirmPassword">Confirm Password</label>
//                                         <Form.Control.Feedback type="invalid">
//                                             {formik.errors.confirmPassword}
//                                         </Form.Control.Feedback>
//                                     </Form.Floating>

//                                     <Button variant="primary" type="submit" className="w-100">
//                                         Reset Password
//                                     </Button>
//                                 </Form>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default ResetPassword;

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
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id, token } = useParams(); // Extract id and token from the URL

    // Formik for form handling and validation
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .matches(/[A-Z]/, "Password must contain an uppercase letter")
                .matches(/[a-z]/, "Password must contain a lowercase letter")
                .matches(/\d/, "Password must contain a number")
                .matches(
                    /[!@#$%^&*(),.?":{}|<>]/,
                    "Password must contain a special character"
                )
                .required("New Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
                .required("Confirm Password is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const payload = { newPassword: values.newPassword };
                const res = await axios.put(
                    `https://url-shortner-backend-sk.onrender.com/api/user/reset-password/${id}/${token}`,
                    payload
                );
                setMsg(res.data.message);
                setTimeout(() => navigate("/login"), 2000);
            } catch (error) {
                setMsg(error.response?.data?.message || "Reset password failed");
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
                    Reset Password
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" mb={3}>
                    Create a new password for your account.
                </Typography>

                <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                    }
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
                            "Reset Password"
                        )}
                    </Button>
                </Box>

                {msg && (
                    <Typography
                        variant="body2"
                        color={msg.toLowerCase().includes("success") ? "success.main" : "error.main"}
                        align="center"
                        mt={2}
                    >
                        {msg}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default ResetPassword;
