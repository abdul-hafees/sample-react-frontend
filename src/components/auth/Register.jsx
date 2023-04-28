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

export default function Register() {

    const [registerFormData, setRegisterFormData] = useState({
        'name': '',
        'email': '',
        'password': ''
    })

    const handleOnChangeInput = (event) => {
        setRegisterFormData(
            {
                ...registerFormData, [event.target.name]: event.target.value
            }
        )
    }

    const navigate = useNavigate();
    const {token, setToken} = useContext(AuthContext);

    const register = (event) => {

        event.preventDefault();

        axios.post('http://app.test/api/register', registerFormData)
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
                    console.log(error.message);
                }
            )
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
                            <Form onSubmit={register}>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" id="name" name="name" onChange={handleOnChangeInput} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" id="email" name="email" onChange={handleOnChangeInput} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" id="password" name="password" onChange={handleOnChangeInput} />
                                </Form.Group>

                                <Button variant="primary" className="w-100 mt-3" type="submit">
                                    Submit
                                </Button>
                            </Form>

                            <p className="pt-3">Already have account? <Link to={'/login'}>Login</Link> now</p>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}