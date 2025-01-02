import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    CircularProgress,
    Typography,
    Alert,
} from "@mui/material";

function AccountActivate() {
    const { token } = useParams(); // Extract token from the URL
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const activateAccount = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://url-shortner-backend-sk.onrender.com/api/auth/activate-account/${token}`
                );
                setMessage(response.data.message);
                setError("");
            } catch (err) {
                setMessage("");
                setError(
                    err.response?.data?.message || "Failed to activate account. Try again."
                );
            } finally {
                setLoading(false);
            }
        };

        activateAccount();
    }, [token]);

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgcolor="primary.main"
            color="white"
        >
            <Box
                bgcolor="white"
                color="text.primary"
                p={4}
                borderRadius={2}
                boxShadow={3}
                textAlign="center"
                maxWidth={400}
                width="100%"
            >
                {loading ? (
                    <CircularProgress color="primary" />
                ) : (
                    <>
                        {message && (
                            <>
                                <Alert severity="success" sx={{ mb: 2 }}>
                                    {message}
                                </Alert>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleLoginRedirect}
                                >
                                    Go to Login
                                </Button>
                            </>
                        )}
                        {error && (
                            <>
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate("/")}
                                >
                                    Back to Register
                                </Button>
                            </>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};


export default AccountActivate