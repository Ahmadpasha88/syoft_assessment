import React, { useEffect } from "react";
import Header from "../Header";
import "./index.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("userData"));
  const userData = user[0];

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handelBackBtn = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="col-11 col-md-9 col-lg-7 my-3 border border-3 border-dark m-auto row p-5 profileCard">
        <button
          className="btn backBtn col-2 text-center fs-6 fw-medium text-white rounded-4 py-2 border d-flex align-items-center justify-content-center gap-2"
          onClick={handelBackBtn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>{" "}
          Back
        </button>
        <h2 className="text-center fw-bold fs-3 mt-3 mb-5">Profile</h2>
        <div className="col-11">
          <p className="border-bottom border-white-50 pb-1">
            <span className="profileLabel">First Name:</span>{" "}
            {userData.user_firstname}{" "}
          </p>
          <p className="border-bottom border-white-50 pb-1">
            <span className="profileLabel">Last Name:</span>{" "}
            {userData.user_lastname}{" "}
          </p>
          <p className="border-bottom border-white-50 pb-1">
            <span className="profileLabel">Phone: </span> {userData.user_phone}
          </p>
          <p className="border-bottom border-white-50 pb-1">
            <span className="profileLabel">Email: </span> {userData.user_email}
          </p>
          <p className="border-bottom border-white-50 pb-1">
            <span className="profileLabel">City: </span> {userData.user_city}
          </p>
          <p className="border-bottom border-white-50 pb-1">
            <span className="profileLabel">ZipCode: </span>{" "}
            {userData.user_zipcode}
          </p>
        </div>
      </div>
    </>
  );
}
