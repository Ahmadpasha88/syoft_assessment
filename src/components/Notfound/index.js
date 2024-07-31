import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function Notfound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center notfoundContainer">
      <h1 className="text-center fw-bold fs-3">Page Not Found</h1>
      <Link to="/" className="fw-medium">
        Go to home
      </Link>
    </div>
  );
}
