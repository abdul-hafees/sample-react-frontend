import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

const ToDoListStore = ({
  todoList,
  setTodoList,
  todoDoneList,
  setTodoDoneList,
}) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event, index) => {
    const { value } = event.target;

    if (event.target.checked) {
      setCheckedItems(checkedItems.concat(index));
      const newItems = [...todoList];
      const removedItem = newItems.splice(index, 1);

      setTodoDoneList(todoDoneList.concat(removedItem));
    } else {
      const doneIndex = todoDoneList.findIndex((item) => item === value);
      const doneList = [...todoDoneList]
      doneList.splice(doneIndex, 1)
      setTodoDoneList(doneList);

      setCheckedItems(checkedItems.filter((item) => item !== index));
    }
  };

  useEffect(() => {
    console.log("CHECKED : " + checkedItems);
  },[checkedItems]);



  return (
    <Card>
      <Card.Body>
        <Card.Title>Tasks To Do</Card.Title>

        <ListGroup>
          {todoList.map((value, index) => (
            <ListGroup.Item key={index}>
              <Form.Check
                type="checkbox"
                label={
                  <span
                    className={
                      checkedItems.includes(index)
                        ? "text-decoration-line-through"
                        : ""
                    }
                  >
                    {value}
                  </span>
                }
                value={value}
                onChange={(event) => handleCheckboxChange(event, index)}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

ToDoListStore.propTypes = {
  todoList: PropTypes.array,
};

export default ToDoListStore;
