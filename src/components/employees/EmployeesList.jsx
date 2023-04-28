import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function EmployeesList() {


    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    let { token } = useContext(AuthContext);



    useEffect(() => {

        const fetchEmployees = () => {
            setLoading(true);
            axios.get('http://app.test/api/employees', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(
                (response) => {
                    setEmployees(response.data);
                    setLoading(false);
                }
            )
            .catch(
                (response) => {
                    console.log(response);
                }
            )

        }

        fetchEmployees();
    }, [token]);


    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Employees</Card.Title>
                    {loading ? 'Loading' : <Table striped>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map((item, index) =>
                                (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>}

                </Card.Body>
            </Card>
        </Container>


    );
}