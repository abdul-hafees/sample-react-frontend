import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import PropTypes from "prop-types";

const ToDoListDone = ({ todoDoneList }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Tasks Done</Card.Title>
        <ListGroup>
          {todoDoneList.map((value, index) => (
            <ListGroup.Item key={index}>
              {value}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

ToDoListDone.propTypes = {
  todoDoneList: PropTypes.array,
};

export default ToDoListDone;
