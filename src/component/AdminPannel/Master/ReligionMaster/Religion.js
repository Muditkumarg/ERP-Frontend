import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavSidePage from "../../NavBar.js/NavBar";
import Swal from "sweetalert2";
import axios from "axios";
import baseUrl from "../../../../API/BaseURL";

export default function ReligionMaster() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const Item = location.state[0];
  const dropdownItemActive = location.state[1];
  const [religionData, setReligionData] = useState({ status: "1" });
  const [error, setError] = useState({});
  const [getReligionData, setGetReligionData] = useState([]);

  const chooseMessage = (message) => {
    setSidebarOpen(message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReligionData({ ...religionData, [name]: value });
  };

  const handleValidate = (value) => {
    let error = {};

    if (!value.religion) {
      error.religion = "Enter religion";
    } else {
      const religionRegex = /^[A-Za-z\s]+$/;

      // Test the religion value against the regex pattern
      if (!religionRegex.test(value.religion)) {
        error.religion =
          "Invalid religion. Please enter a valid religion using only alphabetical characters and spaces.";
      } else {
        // If cast is valid, you can proceed with your API call or other logic
        religionPostApi();
      }
    }
    setError(error);
  };

  const religionPostApi = () => {
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
          .post(`${baseUrl}/post/religion`, religionData, config)
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
  const handleClick = () => {
    handleValidate(religionData);
  };

  const getMaritalStatusApi = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios.get(`${baseUrl}/get/religion`, config).then((res) => {
      const { data, success } = res.data;
      if (success) {
        setGetReligionData(data);
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
          .put(`${baseUrl}/update/religion/${id}`, {}, config)
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
                                    <th scope="col">Religion Name</th>
                                    <th scope="col">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {getReligionData?.map((row, index) => {
                                    return (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td>{row.religion}</td>
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
                                        name="religion"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        placeholder="Enter Religion"
                                        onChange={handleChange}
                                      />
                                      <p className="error">{error.religion}</p>
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
