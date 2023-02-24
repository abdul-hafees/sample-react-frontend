import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from "../components/context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {

    const { user, token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = (event) => {
        event.preventDefault();

        console.log(token);

        axios({
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            url: 'http://app.test/api/logout',
        })
            .then(
                (response) => {

                    localStorage.setItem('token', '');
                    setToken('');
                    console.log(token);

                    navigate('/login');
                }
            )
            .catch(
                (error) => {
                    console.log(error.message);
                }
            )
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={'employees'} >Employees</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link >{user.name}</Nav.Link>
                        <Nav.Link onClick={logout}>Log Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}