import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AdminSignUp() {
  const [signupData, setSignUpData] = useState("");
  const [error, setError] = useState({});

  const nevigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signupData, [name]: value });
  };
  console.log(signupData);

  const handleValidate = (value) => {
    let error = {};
    if (value.password !== value.conpassword) {
      error.conpassword = "password and confirm-password is not mathed";
    } else if (!value.name) {
      error.name = "fullname required";
    } else if (!value.email) {
      error.email = "email required";
    } else if (!value.password) {
      error.password = "password required";
    } else if (!value.conpassword) {
      error.conpassword = "confirm-password required";
    } else {
      SignUpApi();
    }
    setError(error);
  };
  const handleClick = () => {
    handleValidate(signupData);
  };

  const SignUpApi = () => {
    axios.post("http://localhost:5000/sign-up", signupData).then((res) => {
      const { message, success } = res.data;
      if (success === true) {
        alert(message, nevigate("/"));
      } else {
        alert(message);
      }
    });
  };
  return (
    <>
      <div className="body">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-9 mx-auto">
              <div className="card flex-row signUpCard border-0 shadow rounded-3 overflow-hidden">
                <div className="card-img-left d-none d-md-flex"></div>
                <div className="card-body p-4 p-sm-5">
                  <h5 className="card-title text-center mb-5 fw-light fs-5">
                    Register
                  </h5>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputUsername"
                      placeholder="full name"
                      name="name"
                      onChange={handleChange}
                    />
                    <p className="error"> {error.name}</p>
                    <label for="floatingInputUsername">Full Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInputEmail"
                      placeholder="name@example.com"
                      onChange={handleChange}
                      name="email"
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
                      onChange={handleChange}
                      name="password"
                    />
                    <p className="error"> {error.password}</p>
                    <label for="floatingPassword">Password</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPasswordConfirm"
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      name="conpassword"
                    />
                    <p className="error"> {error.conpassword}</p>
                    <label for="floatingPasswordConfirm">
                      Confirm Password
                    </label>
                  </div>
                  <div className="d-grid mb-2">
                    <button
                      className="btn btn-lg btn-primary "
                      onClick={handleClick}
                    >
                      Register
                    </button>
                  </div>

                  <Link
                    className=" linkStyle d-block text-center mt-2 small"
                    to="/"
                  >
                    Have an account? Sign In
                  </Link>

                  <hr className="my-4" />

                  {/* <div className="d-grid mb-2">
                    <button
                      className="btn btn-lg btn-google btn-login fw-bold text-uppercase"
                      type="submit"
                    >
                      <i className="fab fa-google me-2"></i> Continue with Google
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
