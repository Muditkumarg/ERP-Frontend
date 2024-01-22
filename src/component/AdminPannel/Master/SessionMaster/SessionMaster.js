import React, { useEffect } from "react";
import NavSidePage from "../../NavBar.js/NavBar";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./SessionMaster.css";
import axios from "axios";
import Swal from "sweetalert2";
import baseUrl from "../../../../API/BaseURL";

export default function SessionMasterPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessionData, setSessionData] = useState({ session: "", status: 1 });
  const [error, setError] = useState({});
  const [getSessionData, setGetSessionData] = useState([{}]);

  let count = 1;

  const location = useLocation();
  const Item = location.state[0];
  const dropdownItemActive = location.state[1];

  const chooseMessage = (message) => {
    setSidebarOpen(message);
  };

  const sessionChange = (e) => {
    const { name, value } = e.target;
    setSessionData({ ...sessionData, [name]: value });
  };

  const handleValidate = (value) => {
    let error = {};
    if (!value.session) {
      error.session = "Please enter session";
    } else {
      SessionApi();
    }
    setError(error);
  };
  const handleClick = () => {
    handleValidate(sessionData);
  };

  const SessionApi = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${baseUrl}/post/session`, sessionData, config)
          .then((res) => {
            const { message, success } = res.data;
            if (success) {
              Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
            window.location.reload();
          });
      }
    });
  };

  const GetSessionApi = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios.get(`${baseUrl}/get/session`, config).then((res) => {
      const { data, success } = res.data;
      if (success) {
        setGetSessionData(data);
        // setGetSessionData(success);
      }
    });
  };

  useEffect(() => {
    GetSessionApi();
  }, []);

  const handleStatusUpdate = (e) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const id = e.target.getAttribute("id");

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${baseUrl}/update/status/session/${id}`, {}, config)
          .then((res) => {
            const { message, success } = res.data;
            if (success) {
              Swal.fire("Saved!", "", "success").then(() => {
                window.location.reload();
              });
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
      }
    });
  };

  return (
    <>
      <NavSidePage
        chooseMessage={chooseMessage}
        Item={Item}
        dropdownItemActive={dropdownItemActive}
      />
      <div className={`content ${sidebarOpen ? "open" : ""}`}>
        <div class="mainContainer container-fluid px-4">
          <div class="row">
            <div class="col-12">
              <div class="card mb-4">
                <div class="card-header">
                  <strong>School Information Master</strong>
                </div>
                <div class="card-body">
                  <div class="card">
                    <div class="card-body">
                      <div class="container">
                        <div class="row">
                          <div class="col"></div>
                          <div class="col">
                            {" "}
                            <div class=" table-responsive">
                              <table class="table sessionTable text-start align-middle table-bordered table-hover mb-0">
                                <thead>
                                  <tr class="text-white">
                                    <th scope="col">SR</th>
                                    <th scope="col">Session Year</th>
                                    <th scope="col">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {getSessionData?.map((row) => {
                                    return (
                                      <tr>
                                        <td>{count++}</td>
                                        <td>{row.session}</td>
                                        <td>
                                          {row.status === "1" ? (
                                            <button
                                              onClick={handleStatusUpdate}
                                              class="btn btn-sm btn-primary"
                                              href=""
                                              id={row._id}
                                            >
                                              Active
                                            </button>
                                          ) : (
                                            <button
                                              onClick={handleStatusUpdate}
                                              type="button"
                                              class="button btn btn-sm btn-secondary"
                                              id={row._id}
                                            >
                                              In active
                                            </button>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                  <tr>
                                    <td></td>
                                    <td>
                                      <input
                                        type="text"
                                        name="session"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="Enter Session"
                                        onChange={sessionChange}
                                      />
                                      <p className="error">{error.session}</p>
                                      <div className="sessionBtn">
                                        <button
                                          type="button"
                                          class="btn btn-success mt-3"
                                          onClick={handleClick}
                                        >
                                          Add Session
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="col"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
