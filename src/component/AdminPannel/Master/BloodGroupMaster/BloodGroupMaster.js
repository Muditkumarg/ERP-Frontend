import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavSidePage from "../../NavBar.js/NavBar";
import "./BloodGroupMaster.css";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../../API/BaseURL";

export default function BloodGroupMaster() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const Item = location.state[0];
  const dropdownItemActive = location.state[1];
  const [bloodGroup, setBloodGroup] = useState({ status: "1" });
  const [error, setError] = useState({});
  const [getBloodGroup, setGetBloodGroup] = useState([]);

  const chooseMessage = (message) => {
    setSidebarOpen(message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBloodGroup({ ...bloodGroup, [name]: value });
  };

  const handleValidate = (value) => {
    let error = {};

    // Define a regular expression for blood group validation
    const bloodGroupRegex = /^(A|B|AB|O)[\+-]$/;

    if (!value.bloodGroup) {
      error.bloodGroup = "Enter blood group";
    } else if (!bloodGroupRegex.test(value.bloodGroup)) {
      error.bloodGroup = "Invalid blood group format";
    } else {
      bloodGroupPostApi();
    }

    setError(error);
  };

  const bloodGroupPostApi = () => {
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
          .post(`${baseUrl}/post/blood/group`, bloodGroup, config)
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

  const handleClick = () => {
    handleValidate(bloodGroup);
  };

  const GetBloodGroupApi = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios.get(`${baseUrl}/get/blood/group`, config).then((res) => {
      const { data, success } = res.data;
      if (success) {
        setGetBloodGroup(data);
        // setGetSessionData(success);
      }
    });
  };

  useEffect(() => {
    GetBloodGroupApi();
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
          .put(`${baseUrl}/update/status/blood/group/${id}`, {}, config)
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
                  <strong>Blood Group Master</strong>
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
                                    <th scope="col">Blood Group</th>
                                    <th scope="col">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {getBloodGroup?.map((row, index) => {
                                    return (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{row.bloodGroup}</td>
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
                                        name="bloodGroup"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="Enter Session"
                                        onChange={handleChange}
                                      />
                                      <p className="error">
                                        {error.bloodGroup}
                                      </p>
                                      <div className="sessionBtn">
                                        <button
                                          type="button"
                                          class="btn btn-success mt-3"
                                          onClick={handleClick}
                                        >
                                          Add Record
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
