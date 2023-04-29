import React, { useContext, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

    const [loginFormData, setLoginFormData] = useState({
        'email': '',
        'password': ''
    })

    const [errors, setErrors] = useState({});

    const handleOnChangeInput = (event) => {
        setLoginFormData(
            {
                ...loginFormData,[event.target.name]:event.target.value
            }
        )
    }

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;
    
        // Validate email
        if (!loginFormData.email) {
          formIsValid = false;
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
          formIsValid = false;
          errors.email = 'Email is invalid';
        }
    
        // Validate password
        if (!loginFormData.password) {
          formIsValid = false;
          errors.password = 'Password is required';
        }
    
        setErrors(errors);
        return formIsValid;
    };

    const navigate = useNavigate();
    const {setToken} = useContext(AuthContext);

    const login = (event) => {

        event.preventDefault();

        setErrors({})         

        if (validateForm()) {
            axios.post('login', loginFormData)
            .then(
                (response) => {
                    let accessToken = response.data.access_token;
                    localStorage.setItem('token', accessToken);
                    setToken(accessToken);
                    navigate('/');
                }
            )
            .catch(
                (error) => {
                    if (error.response && error.response.data && error.response.data.message) {
                        errors.email = error.response.data.message;
                        setErrors(errors);

                        // alert(error.response.data.message);
                    } else {
                        alert("An unknown error occurred.");
                    }
                }
            )
        }
    };

    return (
        <Container>
            <Row className="justify-content-center h-100">
                <Col lg={6}>
                    <Card className="m-auto">
                        <Card.Header className="d-flex">
                            <h5 className="m-auto">LOG IN</h5>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={login}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" id="email" name="email" onChange={handleOnChangeInput} />

                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else. <br/>
                                    </Form.Text>

                                    {errors.email && (
                                        <Form.Text className="text-danger">
                                            {errors.email}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" id="password" name="password" onChange={handleOnChangeInput} />
                                    {errors.password && (
                                        <Form.Text className="text-danger">
                                            {errors.password}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Button variant="primary" className="w-100 mt-3" type="submit">
                                    Submit
                                </Button>
                            </Form>
                            <p className="pt-3">Don't have account? <Link to={'/register'}>Register</Link> now</p>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}