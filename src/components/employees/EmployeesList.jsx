import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaEdit, FaTrash } from "react-icons/fa";
import EmployeesForm from "./EmployeesForm";
import ReactPaginate from "react-paginate";

const EmployeesList = () => {
  const [employeeFormData, setEmployeeFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [id, setId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState("");
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    setEmployeeFormData({
      name: "",
      email: "",
      phone: "",
    });
  };

  const fetchEmployees = (page = 1) => {
    axios
      .get("employees", { params: { page: page } })
      .then((response) => {
        setEmployees(response.data.data);
        setLastPage(response.data.last_page);
        setLoading(false);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  const deleteEmployee = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete?");

    if (confirmed) {
      axios
        .delete("employees/" + id)
        .then((response) => {
          fetchEmployees();
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  const editEmployee = (id) => {
    setId(id);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handlePageClick = (data) => {
      setCurrentPage(data.selected);

      const selectedPage = data.selected + 1;

    fetchEmployees(selectedPage);
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            Employees
            <Button variant="primary" onClick={handleShow}>
              Create Employee
            </Button>
          </Card.Title>
          {loading ? (
            "Loading"
          ) : (
            <>
              <Table striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <FaEdit
                          className="danger"
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() => editEmployee(item.id)}
                        />
                      </td>
                      <td>
                        <FaTrash
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => deleteEmployee(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ReactPaginate
                  pageCount={lastPage}
                  onPageChange={handlePageClick}
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  previousClassName={"page-item"}
                  nextClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextLinkClassName={"page-link"}
                  pageLinkClassName={"page-link"}
                  breakClassName={"page-item disabled"}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      <EmployeesForm
        show={show}
        setShow={setShow}
        fetchEmployees={fetchEmployees}
        setEmployeeFormData={setEmployeeFormData}
        employeeFormData={employeeFormData}
        id={id}
        setId={setId}
      />
    </Container>
  );
};

export default EmployeesList;
