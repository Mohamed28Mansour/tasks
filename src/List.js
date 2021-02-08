import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./App.css";

const List = ({ tasks, removeTask, editTask, toggleStatus, filtered }) => {
  let displayedTasks = tasks;
  if (filtered === "completed") {
    displayedTasks = tasks.filter((task) => task.complete);
  }
  if (filtered === "pending") {
    displayedTasks = tasks.filter((task) => !task.complete);
  }
  return (
    <div className="task-container">
      {displayedTasks.map((task) => {
        const { id, title, complete } = task;
        return (
          <article className="task-item" key={id}>
            <label>
              <input
                className="checkbox"
                type="checkbox"
                checked={complete}
                onChange={() => toggleStatus(id)}
              />
            </label>
            <p className={complete ? "complete" : "pending"}>{title}</p>
            <div>
              <button
                className="edit-btn"
                type="button"
                onClick={() => editTask(id)}
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                type="button"
                onClick={() => removeTask(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
