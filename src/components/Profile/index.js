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

  return (
    <>
      <Header />
      <div className="col-11 col-md-9 col-lg-7 my-3 border m-auto row p-5 profileCard">
        <h2 className="text-center fw-bold fs-3 mt-3 mb-5">Profile</h2>
        <div className="col-11">
          <p>
            <span className="profileLabel">First Name:</span>{" "}
            {userData.user_firstname}{" "}
          </p>
          <p>
            <span className="profileLabel">Last Name:</span>{" "}
            {userData.user_lastname}{" "}
          </p>
          <p>
            <span className="profileLabel">Phone: </span> {userData.user_phone}
          </p>
          <p>
            <span className="profileLabel">Email: </span> {userData.user_email}
          </p>
          <p>
            <span className="profileLabel">City: </span> {userData.user_city}
          </p>
          <p>
            <span className="profileLabel">ZipCode: </span>{" "}
            {userData.user_zipcode}
          </p>
        </div>
      </div>
    </>
  );
}
