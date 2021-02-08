import React, { useEffect } from "react";
import "./App.css";

const Alert = ({ type, message, showAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  });

  return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
