import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, { useContext, useEffect, useState } from "react";
import DesignationForm from "./DesignationForm";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const DesignationList = () => {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState('');


  const fetchDesignations = (page=1) => {
    axios
      .get("designations", {params:{page:page}})
      .then((response) => {
        setLoading(false);
        setDesignations(response.data.data);
        setLastPage(response.data.last_page);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  const handleShow = () => {
    setShow(true);
  };

  const editDesignation = (id) => {
    setId(id);
    setShow(true);
  };

  const deleteDesignation = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete?");

    if (confirmed) {
      axios
        .delete("designations/" + id)
        .then((response) => {
          fetchDesignations();
        })
        .catch((response) => {
          console.log(response);
        });
    }
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;

    fetchDesignations(selectedPage)
    setCurrentPage(data.selected);
  };

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
            <>
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
                      <td>
                        <FaEdit
                          className="danger"
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() => editDesignation(item.id)}
                        />
                      </td>
                      <td>
                        <FaTrash
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => deleteDesignation(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
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

      <DesignationForm
        show={show}
        setShow={setShow}
        id={id}
        setId={setId}
        fetchDesignations={fetchDesignations}
      />
    </Container>
  );
};

export default DesignationList;
