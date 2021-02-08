import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import "./App.css";

const getLocalStorage = () => {
  const list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const App = () => {
  const [task, setTask] = useState("");
  const [list, setList] = useState(getLocalStorage("list", []));
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [editID, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filtered, setFiltered] = useState("all");

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
    showAlert(true, "list successfully cleared", "danger");
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
    <main>
      <section className="glass-center">
        <form className="form-control" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h2>what do you want to do today?</h2>
          <div className="input-space">
            <input
              className="input-bar"
              type="text"
              placeholder="e.g. create react app"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="submit-btn">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <section>
            <div className="filtering">
              <button className="filter-btn" onClick={() => setFiltered("all")}>
                All
              </button>
              <button
                className="filter-btn"
                onClick={() => setFiltered("completed")}
              >
                Complete
              </button>
              <button
                className="filter-btn"
                onClick={() => setFiltered("pending")}
              >
                Pending
              </button>
            </div>
            <List
              tasks={list}
              removeTask={removeTask}
              editTask={editTask}
              toggleStatus={toggleStatus}
              filtered={filtered}
            />
            <button className="clear-btn" onClick={clearList}>
              clear list
            </button>
          </section>
        )}
      </section>
    </main>
  );
};

export default App;
