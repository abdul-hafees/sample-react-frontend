import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";

export default function EmployeesForm({
  show,
  setShow,
  fetchEmployees,
  employeeFormData,
  setEmployeeFormData,
  id,
  setId,
}) {
  const [errors, setErrors] = useState({});

  const handleOnChangeInput = (event) => {
    if (event.target.type === 'file') {
      console.log("IMAGE");
      setEmployeeFormData({
        ...employeeFormData,
        image: event.target.files[0],
      });
    } else {
      setEmployeeFormData({
        ...employeeFormData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleClose = () => {
    setShow(false);
    setId("");
    setErrors({});
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // Validate email
    if (!employeeFormData.email) {
      formIsValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(employeeFormData.email)) {
      formIsValid = false;
      errors.email = "Email is invalid";
    }

    // Validate name
    if (!employeeFormData.name) {
      formIsValid = false;
      errors.name = "Name is required";
    }

    // Validate phone
    if (!employeeFormData.name) {
      formIsValid = false;
      errors.phone = "Phone is required";
    }

    setErrors(errors);
    return formIsValid;
  };

  const editEmployee = () => {
    axios
      .get("employees/" + id)
      .then((response) => {
        const data = response.data.data;
        setEmployeeFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          image_url: data.image_url,
        });
        setShow(true);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    if (id) {
      editEmployee();
    }
  }, [id]);

  const storeEmployee = (event) => {
    event.preventDefault();

    setErrors({});

    if (validateForm()) {
      console.log(employeeFormData)
      axios({
        method: id ? "put" : "post",
        url: id ? `employees/${id}` : "employees",
        data: employeeFormData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then((response) => {
          console.log(response.data.data);
          setShow(false);
          fetchEmployees();
          setId("");

          setEmployeeFormData({});
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            errors.email = error.response.data.message;
            setErrors(errors);

            // alert(error.response.data.message);
          } else {
            alert("An unknown error occurred.");
          }
        });
    }
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      backdrop="static"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{id ? "Edit" : "Create"} Employee</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {id &&  <div style={{ display: 'flex', justifyContent: 'center'}}>
          <img src={employeeFormData.image_url} style={{ width: '100px', height: '100px', objectFit: 'cover' }}/>
        </div> }
       
        <Form onSubmit={storeEmployee}>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              onChange={handleOnChangeInput}
              value={employeeFormData.name}
            />
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              id="email"
              name="email"
              onChange={handleOnChangeInput}
              value={employeeFormData.email}
            />

            {errors.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone"
              id="phone"
              name="phone"
              onChange={handleOnChangeInput}
              value={employeeFormData.phone}
            />
            {errors.phone && (
              <Form.Text className="text-danger">{errors.phone}</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Choose Image</Form.Label>
            <Form.Control type="file" onChange={handleOnChangeInput}/>
          </Form.Group>

          <Button variant="primary" className="w-100 mt-3" type="submit">
            Submit
          </Button>
        </Form>{" "}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
