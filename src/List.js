import React from "react";
import { FaEdit, FaTrash, FaCheckDouble } from "react-icons/fa";

const List = ({ tasks, removeTask, editTask, toggleStatus }) => {
  return (
    <div>
      {tasks.map((task) => {
        const { id, title, complete } = task;
        return (
          <article key={id}>
            <label style={{ color: complete ? "green" : "red" }}>
              <input
                type="checkbox"
                checked={complete}
                onChange={() => toggleStatus(id)}
              />
              <p>{title}</p>
            </label>
            <div>
              <button type="button" onClick={() => editTask(id)}>
                <FaEdit />
              </button>
              <button type="button" onClick={() => removeTask(id)}>
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
