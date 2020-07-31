import React, { useState, useRef, useCallback } from "react";
import TodoListTemplate from "./components/js/TodoListTemplate";
import Form from "./components/js/Form";
import TodoItemList from "./components/js/TodoItemList";

function App() {
  const id = useRef(2);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([
    { id: 0, content: "리액트를 공부하자0", isComplete: false },
    { id: 1, content: "리액트를 공부하자1", isComplete: true },
  ]);

  const onKeyPress = (e) => {
    if (e.key === "Enter") onCreate();
  };

  const onCreate = () => {
    const todo = {
      id: id.current,
      content: input,
      isComplete: false,
    };
    setTodos(todos.concat(todo));
    id.current++;
    setInput("");
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
        )
      );
    },
    [todos]
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  return (
    <TodoListTemplate
      form={
        <Form
          value={input}
          onChange={onChange}
          onCreate={onCreate}
          onKeyPress={onKeyPress}
        />
      }
    >
      <TodoItemList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </TodoListTemplate>
  );
}

export default App;
