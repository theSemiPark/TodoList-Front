import React from "react";
import "../css/TodoItem.css";

const TodoItem = ({ content, isComplete, id, onToggle, onRemove }) => {
  console.log(id);
  return (
    <div className="todo-item" onClick={() => onToggle(id)}>
      <div
        className="todo-item-remove"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
        }}
      >
        &times;
      </div>
      <div className={`todo-item-content ${isComplete && "isComplete"}`}>
        <div>{content}</div>
      </div>
      {isComplete && <div className="isComplete-mark">✓</div>}
    </div>
  );
};
export default TodoItem;
