import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavSidePage from "../../NavBar.js/NavBar";
import Swal from "sweetalert2";
import axios from "axios";
import "./StateCityMaster.css";
import baseUrl from "../../../../API/BaseURL";

export default function StateCityMaster() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const Item = location.state[0];
  const dropdownItemActive = location.state[1];
  const chooseMessage = (message) => {
    setSidebarOpen(message);
  };

  let StateCount = 1;
  let CityCount = 1;
  const [stateData, setStateData] = useState({ status: "1" });
  const [stateCityData, setStateCityData] = useState({
    status: "1",
  });
  const [getStateData, setGetStateData] = useState([]);
  const [getStateCityData, SetGetStateCityData] = useState([]);
  const [error, setError] = useState({});
  const [filterStateData, setFilterStateData] = useState([{}]);
  const [updateStateData, setUpdateStateData] = useState([{}]);
  const [filterStateCityData, setFilterStateCityData] = useState([{}]);
  const [updateStateCityData, setUpdateStateCityData] = useState([{}]);

  const stateCityChange = (e) => {
    const { name, value } = e.target;
    setStateCityData({ ...stateCityData, [name]: value });
  };

  const stateChange = (e) => {
    const { name, value } = e.target;
    setStateData({ ...stateData, [name]: value });
  };

  const handleStateValidate = (value) => {
    let error = {};
    if (!value.state) {
      error.state = "Enter state";
    } else {
      statePostApi();
    }
    setError(error);
  };
  const handleStateCityValidate = (value) => {
    let error = {};
    if (!value.state) {
      error.state2 = "Enter state";
    } else if (!value.city) {
      error.city = "Enter City";
    } else {
      stateCityPostApi();
    }
    setError(error);
  };
  const statePostApi = () => {
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
        axios.post(`${baseUrl}/post/states`, stateData, config).then((res) => {
          const { message, success } = res.data;
          if (success) {
            Swal.fire("Saved!", "", "success").then(() => {
              window.location.reload();
            });
          } else {
            error.state = message;
            Swal.fire(message, "", "error").then(() => {
              window.location.reload();
            });
          }
        });
      }
    });
  };
  const stateCityPostApi = () => {
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
          .post(`${baseUrl}/post/state/city`, stateCityData, config)
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
  const stateClick = () => {
    handleStateValidate(stateData);
  };
  const sectionClick = () => {
    handleStateCityValidate(stateCityData);
  };
  console.log(stateCityData);
  const GetStateApi = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios.get(`${baseUrl}/get/states`, config).then((res) => {
      const { data, success } = res.data;
      if (success) {
        setGetStateData(data);
        // setGetSessionData(success);
      }
    });
  };
  const GetStateCityApi = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios.get(`${baseUrl}/get/state/city`, config).then((res) => {
      const { data, success } = res.data;
      if (success) {
        SetGetStateCityData(data);
        // setGetSessionData(success);
      }
    });
  };

  useEffect(() => {
    GetStateApi();
    GetStateCityApi();
  }, []);
  const stateUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateStateData([{ ...updateStateData[0], [name]: value }]);
  };

  const sectionUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateStateCityData([{ ...updateStateCityData[0], [name]: value }]);
  };

  const handleStateModale = async (e) => {
    const id = e.target.getAttribute("id");
    await setFilterStateData(getStateData.filter((item) => item._id === id));
    await setUpdateStateData(getStateData.filter((item) => item._id === id));
  };

  const handleStateCityModal = async (e) => {
    const id = e.target.getAttribute("id");

    await setFilterStateCityData(
      getStateCityData.filter((item) => item._id === id)
    );
    await setUpdateStateCityData(
      getStateCityData.filter((item) => item._id === id)
    );
  };

  const stateUpdateClick = (event) => {
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
          .put(`${baseUrl}/update/states`, updateStateData, config)
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
  const sectionUpdateClick = () => {
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
          .put(`${baseUrl}/update/state/city`, updateStateCityData, config)
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
            <div class="col">
              <div class="card">
                <div class="card-header">State Master</div>
                <div class=" table-responsive">
                  <table class="table sessionTable text-start align-middle table-bordered table-hover mb-0">
                    <thead>
                      <tr class="text-white">
                        <th scope="col">SR</th>
                        <th scope="col">State</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getStateData?.map((row) => {
                        return (
                          <tr>
                            <td>{StateCount++}</td>
                            <td>{row.state}</td>
                            {row.status === "1" ? (
                              <td>Active</td>
                            ) : (
                              <td>In active</td>
                            )}
                            <td>
                              <button
                                class="btn btn-sm btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalClass"
                                id={row._id}
                                onClick={handleStateModale}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="card-body">
                  <div class="container">
                    <div class="row">
                      <div class="col">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter class"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="state"
                            onChange={stateChange}
                          />
                        </div>
                        <p className="error">{error.state}</p>
                      </div>
                      <div class="col">
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={stateClick}
                        >
                          Add State
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-header">City Master</div>
                <div class="table-responsive">
                  <table class="table sessionTable text-start align-middle table-bordered table-hover mb-0">
                    <thead className="class-section-thead">
                      <tr class="text-white">
                        <th scope="col">SR</th>
                        <th scope="col">State</th>
                        <th scope="col">City </th>
                        <th scope="col">Status </th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getStateData?.map((row) => {
                        return (
                          <tr className="class-section-tr">
                            {row.status === "1" ? (
                              <>
                                <td>{CityCount++}</td>
                                <td>{row.state}</td>
                                <td>
                                  {getStateCityData?.map((cityRow, index) => {
                                    return (
                                      <>
                                        <div>
                                          {" "}
                                          {cityRow.id === row._id ? (
                                            <ol start={index + 1}>
                                              <li>{cityRow.city}</li>
                                            </ol>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </>
                                    );
                                  })}
                                </td>
                                <td>
                                  {getStateCityData.map((cityRow) => {
                                    return (
                                      <>
                                        {row._id === cityRow.id ? (
                                          <ol className="actionCol">
                                            <li>
                                              {cityRow.status === "1" ? (
                                                <span>Active</span>
                                              ) : (
                                                <span>In active</span>
                                              )}
                                            </li>
                                          </ol>
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    );
                                  })}
                                </td>
                                <td>
                                  {getStateCityData.map((cityRow) => {
                                    return (
                                      <>
                                        {row._id === cityRow.id ? (
                                          <ol className="actionCol">
                                            <li>
                                              <button
                                                class="btn btn-sm btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModalStateCity"
                                                id={cityRow._id}
                                                onClick={handleStateCityModal}
                                              >
                                                Edit
                                              </button>
                                            </li>
                                          </ol>
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    );
                                  })}
                                </td>
                              </>
                            ) : (
                              ""
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div class="card-body">
                  <div class="container">
                    <div class="row">
                      <div className="col">
                        <select
                          class="class-select form-select"
                          aria-label="Default select example"
                          name="state"
                          onChange={stateCityChange}
                        >
                          <option selected>Select state</option>
                          {getStateData.map((row) => {
                            return (
                              <>
                                {row.status === "1" ? (
                                  <option value={row.state}>{row.state}</option>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })}
                        </select>
                        <p className="error">{error.state2}</p>
                      </div>
                      <div class="col">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Enter City"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="city"
                            onChange={stateCityChange}
                          />
                        </div>
                        <p className="error">{error.city}</p>
                      </div>
                      <div class="col">
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={sectionClick}
                        >
                          Add Record
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*                                class Edit Modal Code                  */}
      <div
        class="modal fade "
        id="exampleModalClass"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-heading modal-title" id="exampleModalLabel">
                Update Record
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="card">
                <div class="card-body">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-1"></div>
                      <div class="col">
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            State Name
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                            defaultValue={filterStateData[0].state}
                            name="classes"
                            onChange={stateUpdateChange}
                          />
                        </div>
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Status
                          </label>
                          <select
                            class="class-select form-select"
                            aria-label="Default select example"
                            name="status"
                            onChange={stateUpdateChange}
                          >
                            {filterStateData[0].status === "1" ? (
                              <>
                                <option value="1" selected>
                                  Active
                                </option>
                                <option value="0">In active</option>
                              </>
                            ) : (
                              <>
                                <option value="0" selected>
                                  In active
                                </option>
                                <option value="1">Active</option>
                              </>
                            )}
                          </select>
                        </div>
                      </div>
                      <div class="col-md-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={stateUpdateClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*                                Section Edit Modal */}
      <div
        class="modal fade"
        id="exampleModalStateCity"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-heading modal-title" id="exampleModalLabel">
                Update Record
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="card">
                <div class="card-body">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-1"></div>
                      <div class="col">
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            City
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                            defaultValue={filterStateCityData[0].city}
                            name="city"
                            onChange={sectionUpdateChange}
                          />
                        </div>
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Status
                          </label>
                          <select
                            class="class-select form-select"
                            aria-label="Default select example"
                            name="status"
                            onChange={sectionUpdateChange}
                          >
                            {filterStateCityData[0].status === "1" ? (
                              <>
                                <option value="1" selected>
                                  Active
                                </option>
                                <option value="0">In active</option>
                              </>
                            ) : (
                              <>
                                <option value="0" selected>
                                  In active
                                </option>
                                <option value="1">Active</option>
                              </>
                            )}
                          </select>
                        </div>
                      </div>
                      <div class="col-md-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={sectionUpdateClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
