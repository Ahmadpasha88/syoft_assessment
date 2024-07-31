import React, { useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const newErrors = {};
  const navigate = useNavigate();

  const isLogedIn = localStorage.getItem("userData");

  useEffect(() => {
    if (isLogedIn) {
      navigate("/");
    }
  }, [isLogedIn, navigate]);

  const validateFirstName = () => {
    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
      newErrors.firstName = `First Name can only contain letters.`;
    } else if (firstName.length < 2 || firstName.length > 20) {
      newErrors.firstName = `First Name must be between 2 and 20 characters.`;
    }
  };

  const validateMail = () => {
    if (!mail) {
      newErrors.mail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(mail)) {
      newErrors.mail = "Email address is invalid";
    } else if (mail.length > 50) {
      newErrors.mail = "Email should not exceed 50 characters.";
    } else if (
      !mail.endsWith(".com") &&
      !mail.endsWith(".net") &&
      !mail.endsWith(".org") &&
      !mail.endsWith(".edu")
    ) {
      newErrors.mail =
        "Email should have a valid domain (.com, .net, .org, .edu).";
    }
  };

  const validatePhone = () => {
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    } else if (/[+.]/.test(phone)) {
      newErrors.phone =
        "Phone number should not contain '+' or '.' characters.";
    }
  };

  const validatePassword = () => {
    if (!password.trim()) {
      newErrors.password = "Please enter password";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one digit.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password =
        "Password must contain at least one special character.";
    }
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please enter Confirm Password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords did not match.";
    }
  };

  const validate = () => {
    validateMail();
    validatePhone();
    validateFirstName();
    validatePassword();
    validateConfirmPassword();

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerData = {
    user_firstname: firstName,
    user_email: mail,
    user_phone: phone,
    user_password: password,
    user_lastname: "rv",
    user_city: "Hyderabad",
    user_zipcode: "500081",
  };

  const handleRegister = async () => {
    if (validate()) {
      try {
        const response = await fetch(
          "https://syoft.dev/Api/user_registeration/api/user_registeration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
          }
        );
        const data = await response.json();
        if (response.ok) {
          if (data.status) {
            Swal.fire({
              title: "Good job!",
              text: "Account Created Successfully!",
              icon: "success",
            });
            navigate("/login");
          } else {
            Swal.fire({
              title: "Error!",
              text: `User ${data.msg}`,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        } else {
          console.log("Registration failed:", data);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div className="row p-0 m-0">
      <div className="col-12 col-lg-6 h-sm-50 h-xl-100 topContainer">
        <h1 className="appName">Bouquets Mart</h1>
      </div>
      <div className="col-12 col-lg-6 registrationContainer">
        <div className="p-0 m-0 d-flex flex-column justify-content-center">
          <h2 className="appName mt-1 mb-2 fs-1">Register</h2>
          <div className="row">
            <div className="col-11 m-auto mb-3">
              <label className="text-white">First Name </label>
              <input
                type="text"
                className="border rounded-3 col-12 p-2"
                value={firstName}
                placeholder="Enter First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <p className="errorMsg">{errors.firstName}</p>
              )}
            </div>
            <div className="col-11 m-auto mb-3">
              <label>Mail</label>
              <input
                type="mail"
                className="border rounded-3 col-12 p-2"
                value={mail}
                placeholder="Enter Mail"
                onChange={(e) => setMail(e.target.value)}
              />
              {errors.mail && <p className="errorMsg">{errors.mail}</p>}
            </div>
            <div className="col-11 m-auto mb-3">
              <label>Phone</label>
              <input
                type="number"
                className="border rounded-3 col-12 p-2"
                value={phone}
                placeholder="Enter Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <p className="errorMsg">{errors.phone}</p>}
            </div>
            <div className="col-11 m-auto mb-3">
              <label>Password</label>
              <input
                type="password"
                className="border rounded-3 col-12 p-2"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="errorMsg">{errors.password}</p>}
            </div>
            <div className="col-11 m-auto mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="border rounded-3 col-12 p-2"
                value={confirmPassword}
                placeholder="Enter Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <p className="errorMsg">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="text-center my-3">
              <button
                type="button"
                className="registerBtn"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
            <div className="mb-3">
              <p className="text-center fw-bold">
                If you have an account please{" "}
                <Link
                  to="/login"
                  className="text-primary text-decoration-underline"
                  role="button"
                >
                  go to login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
