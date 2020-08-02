import React, { useState, useRef, useCallback, useEffect } from "react";
import TodoListTemplate from "./components/js/TodoListTemplate";
import Form from "./components/js/Form";
import TodoItemList from "./components/js/TodoItemList";

function App() {

  useEffect(() => {
    handleInitInfo();
  })

  const id = useRef(2);
  const [input, setInput] = useState("");
  /*
  const [todos, setTodos] = useState([
    { id: 0, content: "리액트를 공부하자0", isComplete: false },
    { id: 1, content: "리액트를 공부하자1", isComplete: true },
  ]);*/
  const [todos, setTodos] = useState([]);


  const handleInitInfo = () => {
    console.log("here");
		fetch("/api/todos")
			.then(res => res.json())
			.then(todos => setTodos(todos))
			.catch(err => console.log(err))
	}

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

    const data = {
      body: JSON.stringify({"content" : input}),
      headers: {'Content-Type': 'application/json'},
      method: 'post'
  }
  fetch("/api/todos", data)
      .then(res => {
          if(!res.ok) {
              throw new Error(res.status);
          } else {
              return handleInitInfo();
          }
      })
      .catch(err => console.log(err));
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

      const data = {
        headers: {'Content-Type':'application/json'},
        method: 'put'
    }
    fetch("/api/todos/" + id, data)
    .then(res => {
        if(!res.ok) {
            throw new Error(res.status);
        } else {
            return handleInitInfo();
        }
    })
    .catch(err => console.log(err));
    },
    [todos]
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));

      const data = {
        headers: {'Content-Type':'application/json'},
        method: 'delete'
    }
    fetch("/api/todos/" + id, data)
    .then(res => {
        if(!res.ok) {
            throw new Error(res.status);
        } else {
            return handleInitInfo();
        }
    })
    .catch(err => console.log(err));
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
