import React from 'react';

import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Home = () => {
    // Sample data for demonstration purposes
    const urlData = [
        { id: 1, originalUrl: 'https://www.example.com/long-url-1', shortUrl: 'https://usl.io/abc1', clickCount: 10 },
        { id: 2, originalUrl: 'https://www.example.com/long-url-2', shortUrl: 'https://usl.io/abc2', clickCount: 20 },
        { id: 3, originalUrl: 'https://www.example.com/long-url-3', shortUrl: 'https://usl.io/abc3', clickCount: 30 },
    ];

    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        // Clear any authentication-related data (if any)
        // For example: localStorage.removeItem('authToken');
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className='bg-primary'>
            <Container className="d-flex flex-column justify-content-center vh-100 ">
                {/* Logout Button */}
                <Row className="w-100 mb-3">
                    <Col className="text-end">
                        <Button variant="danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Col>
                </Row>
                <Row className="w-100">
                    <Col md={8} className="mx-auto ">

                        <Card className="p-4 shadow-lg mb-4 ">
                            <Card.Body>
                                <Card.Title className="text-center mb-4">
                                    <strong>USL Shorten</strong>
                                    <p className='lead text-muted mt-2'>Enter your long url convert into short url.</p>
                                </Card.Title>
                                <Form >
                                    <Form.Floating className="mb-3">
                                        <Form.Control
                                            id="floatingInputCustom"
                                            type="text"
                                            name="url"
                                            placeholder="Enter your long url"
                                        />
                                        <label htmlFor="floatingInputCustom">Long URL</label>
                                        <Form.Control.Feedback type="invalid">
                                            {/* {formik.errors.email} */}
                                        </Form.Control.Feedback>
                                    </Form.Floating>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Convert
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="w-100">
                    <Col md={8} className="mx-auto">
                        <Card className="p-4 bg-primary-subtle shadow-lg">
                            <Card.Body>
                                <Card.Title className="text-center mb-4">
                                    <strong>Shortened URLs</strong>
                                </Card.Title>
                                <Table striped bordered hover responsive variant="info">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Original URL</th>
                                            <th>Short URL</th>
                                            <th>Click Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {urlData.map((url, index) => (
                                            <tr key={url.id}>
                                                <td>{index + 1}</td>
                                                <td>{url.originalUrl}</td>
                                                <td>
                                                    <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                                                        {url.shortUrl}
                                                    </a>
                                                </td>
                                                <td>{url.clickCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;