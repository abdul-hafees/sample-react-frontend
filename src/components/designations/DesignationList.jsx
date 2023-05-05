import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, { useContext, useEffect, useState } from "react";
import DesignationForm from "./DesignationForm";
import { FaEdit, FaTrash } from 'react-icons/fa';


const DesignationList = () => {

    const [designations, setDesignations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [id, setId] = useState('');

    const fetchDesignations = () => {
        axios
        .get("designations")
        .then((response) => {
            setLoading(false);
            console.log(response.data);
            setDesignations(response.data)
        })
        .catch((response) => {
          console.log(response);
        });
    }

    useEffect(() => {
        fetchDesignations();
    }, []);

    const handleShow = () => {
        setShow(true);
    }

    const editDesignation = (id) => {
        setId(id)
        setShow(true)
    }

    const deleteDesignation = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete?');

        if(confirmed) {
          axios
          .delete("designations/" + id)
          .then((response) => {
            fetchDesignations();
          })
          .catch((response) => {
            console.log(response);
          });
        }
    }



    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between">
                    Designations
                    <Button variant="primary" onClick={handleShow}>
                        Create Designation
                    </Button>
                    </Card.Title>
                    {loading ? (
                    "Loading"
                    ) : (
                    <Table striped>
                        <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {designations.map((item, index) => (
                            <tr key={index}>
                            <td>{item.name}</td>
                            <td><FaEdit className="danger" style={{ color: 'blue', cursor: 'pointer' }} onClick={() => editDesignation(item.id)}/></td>
                            <td ><FaTrash style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteDesignation(item.id)}/></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    )}
                </Card.Body>
            </Card>
            
            
            <DesignationForm 
                show={show}
                setShow={setShow}
                id={id}
                setId={setId}
                fetchDesignations={fetchDesignations}
            />

      </Container>
    )
}

export default DesignationList;