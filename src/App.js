import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [editID, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      showAlert(true, "please enter task", "danger");
    } else if (task && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: task };
          }
          return item;
        })
      );
      setTask("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "value changed", "success");
    } else {
      showAlert(true, "task added successfully", "success");
      const newTask = {
        id: new Date().getTime().toString(),
        title: task,
        complete: false,
      };
      setList([...list, newTask]);
      setTask("");
    }
  };

  const showAlert = (show = false, message = "", type = "") => {
    setAlert({ show, message, type });
  };

  const clearList = () => {
    showAlert(true, "list successfully cleared", "success");
    setList([]);
  };

  const removeTask = (id) => {
    showAlert(true, "task removed successfully", "danger");
    setList(list.filter((item) => item.id !== id));
  };

  const editTask = (id) => {
    const specificTask = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setTask(specificTask.title);
  };

  const toggleStatus = (id) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(newList);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h2>what do you want to do today?</h2>
        <div>
          <input
            type="text"
            placeholder="e.g. create react app"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button>{isEditing ? "edit" : "submit"}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div>
          <List
            tasks={list}
            removeTask={removeTask}
            editTask={editTask}
            toggleStatus={toggleStatus}
          />
          <button onClick={clearList}>clear list</button>
        </div>
      )}
    </section>
  );
}

export default App;
