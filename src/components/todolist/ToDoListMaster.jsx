import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToDoListStore from "./ToDoListStore";
import ToDoListDone from "./ToDoListDone";

export default function ToDoListMaster() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoDoneList, setTodoDoneList] = useState([]);


  const createTodo = (event) => {
    event.preventDefault();
    setTodoList((todoList) => [...todoList, inputValue]);
    setInputValue('');
  };

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicto_do">
              <Form.Label>Enter To-Do</Form.Label>
              <Form.Control
                type="to_do"
                placeholder="Enter to_do"
                value={inputValue}
                onChange={handleOnChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={createTodo}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {todoList.length > 0 && <ToDoListStore todoList={todoList} setTodoList={setTodoList} setTodoDoneList={setTodoDoneList} todoDoneList={todoDoneList} />}
      {todoDoneList.length > 0 && <ToDoListDone todoDoneList={todoDoneList} />}
    </Container>
  );
}
