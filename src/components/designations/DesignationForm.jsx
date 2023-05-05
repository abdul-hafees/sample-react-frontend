import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import axios from "axios";

const DesignationForm = ({show, setShow, id, setId, fetchDesignations}) => {

    const [errors, setErrors] = useState({});
    const [designationFormData, setDesignationFormData] = useState({
        'name' : ''
    });

    const handleClose = () => {
        setShow(false);
        setDesignationFormData({})
    }

    const handleOnChangeInput = (event) => {
        setDesignationFormData({...designationFormData, [event.target.name]: event.target.value})
    }

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;
    
        // Validate name
        if (!designationFormData.name) {
          formIsValid = false;
          errors.name = "Name is required";
        }
    
        setErrors(errors);
        return formIsValid;
      };

    const storeDesignation = (event) => {

        event.preventDefault()
        if (validateForm) {
            axios({
                method: id ? "put" : 'post',
                url: id ? `designations/${id}` : 'designations',
                data: designationFormData,
              })
                .then((response) => {
                  setShow(false);
                  fetchDesignations();
                  setId('');
        
                  setDesignationFormData({
                    name: "",
                  });
                })
                .catch((error) => {

                    console.log(error)
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                  ) {
                    setErrors(errors);
                    } 
                else {
                    alert("An unknown error occurred.");
                  }
                });
        }

    }

    const fetchDesignation = () => {
        axios
        .get("designations/" + id)
        .then((response) => {
          const data = response.data.data;
          setDesignationFormData({
            name: data.name,
          });
          setShow(true);
        })
        .catch((response) => {
          console.log(response);
        });
    }

    useEffect(() => {

        if(id) {
            fetchDesignation()
        }

    },[id])

    return (
        <Offcanvas
        show={show}
        onHide={handleClose}
        backdrop="static"
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Designation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={storeDesignation}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                onChange={handleOnChangeInput}
                value={designationFormData.name}
              />
              {errors.name && (
                <Form.Text className="text-danger">{errors.name}</Form.Text>
              )}
            </Form.Group>
    
            <Button variant="primary" className="w-100 mt-3" type="submit">
              Submit
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    );

}

export default DesignationForm;