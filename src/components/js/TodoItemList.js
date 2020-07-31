import React from "react";
import TodoItem from "./TodoItem";

const TodoItemList = ({ todos, onToggle, onRemove }) => {
  return (
    <div>
      <div>
        {todos.map((todo) => (
          <TodoItem
            content={todo.content}
            isComplete={todo.isComplete}
            id={todo.id}
            onToggle={onToggle}
            onRemove={onRemove}
            key={todo.id}
          />
        ))}
      </div>
    </div>
  );
};
export default TodoItemList;
