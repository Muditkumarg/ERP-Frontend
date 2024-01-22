import React, { useState } from "react";
import "../AdminSignUp/SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState("");

  const [error, setError] = useState({});

  const nevigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleValidate = (value) => {
    let error = {};
    if (!value.email) {
      error.email = "email required";
    } else if (!value.password) {
      error.password = "password required";
    } else {
      LoginApi();
    }
    setError(error);
  };

  const handleClick = () => {
    handleValidate(loginData);
  };

  const LoginApi = () => {
    axios.post("http://localhost:5000/login", loginData).then((res) => {
      const { message, success, token } = res.data;
      if (success) {
        alert(
          message,
          nevigate("/dashboard"),
          localStorage.setItem("token", token)
        );
      } else {
        alert(message);
      }
    });
  };
  console.log(loginData);
  return (
    <>
      <div className="body">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-9 mx-auto">
              <div className="card loginCard flex-row  border-0 shadow rounded-3 overflow-hidden">
                <div className="card-img-left d-none d-md-flex">
                  {/* <!-- Background image for card set in CSS! --> */}
                </div>
                <div className="card-body p-4 p-sm-5">
                  <h5 className="card-title text-center mb-5 fw-light fs-5">
                    Login
                  </h5>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInputEmail"
                      placeholder="name@example.com"
                      name="email"
                      onChange={handleChange}
                    />
                    <p className="error"> {error.email}</p>
                    <label for="floatingInputEmail">Email address</label>
                  </div>
                  <hr />

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                    />
                    <p className="error"> {error.password}</p>
                    <label for="floatingPassword">Password</label>
                  </div>

                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                      type="submit"
                      onClick={handleClick}
                    >
                      Login
                    </button>
                  </div>

                  <Link
                    className="linkStyle d-block text-center mt-2 small"
                    to="/sign-up"
                  >
                    Don't have an account? Sign Up
                  </Link>

                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
