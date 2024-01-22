import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavSidePage from "../../NavBar.js/NavBar";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../../API/BaseURL";

export default function MaritalStatusMaster() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const Item = location.state[0];
  const dropdownItemActive = location.state[1];
  const [maritalStatusData, SetMaritalStatusData] = useState({ status: "1" });
  const [error, setError] = useState({});
  const [getMaritalStatus, setGetMaritalStatus] = useState([]);

  const chooseMessage = (message) => {
    setSidebarOpen(message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetMaritalStatusData({ ...maritalStatusData, [name]: value });
  };
  console.log(maritalStatusData);

  const handleValidate = (value) => {
    let error = {};

    if (!value.maritalStatus) {
      error.maritalStatus = "Enter marital status";
    } else {
      // Define your regex pattern for cast validation
      const maritalStatusRegex = /^(single|married|divorced|widowed)$/i;

      // Test the cast value against the regex pattern
      if (!maritalStatusRegex.test(value.maritalStatus)) {
        error.maritalStatus =
          "Invalid marital status. Allowed values are single, married, divorced, widowed";
      } else {
        // If cast is valid, you can proceed with your API call or other logic
        maritalStatusPostApi();
      }
    }

    setError(error);
  };

  const maritalStatusPostApi = () => {
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
          .post(`${baseUrl}/post/marital/status`, maritalStatusData, config)
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
    handleValidate(maritalStatusData);
  };

  const getMaritalStatusApi = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios.get(`${baseUrl}/get/marital/status`, config).then((res) => {
      const { data, success } = res.data;
      if (success) {
        setGetMaritalStatus(data);
        // setGetSessionData(success);
      }
    });
  };

  useEffect(() => {
    getMaritalStatusApi();
  }, []);

  const updateMaritalStatus = (e) => {
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
          .put(`${baseUrl}/update/status/marital/${id}`, {}, config)
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
                  <strong>Marital Status Master</strong>
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
                                    <th scope="col">Marital Status Name</th>
                                    <th scope="col">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {getMaritalStatus?.map((row, index) => {
                                    return (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{row.maritalStatus}</td>
                                        <td>
                                          {row.status === "1" ? (
                                            <button
                                              onClick={updateMaritalStatus}
                                              class="btn btn-sm btn-primary"
                                              href=""
                                              id={row._id}
                                            >
                                              Active
                                            </button>
                                          ) : (
                                            <button
                                              onClick={updateMaritalStatus}
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
                                        name="maritalStatus"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="Enter cast category"
                                        onChange={handleChange}
                                      />
                                      <p className="error">
                                        {error.maritalStatus}
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
