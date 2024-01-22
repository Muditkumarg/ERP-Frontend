import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavSidePage from "../../NavBar.js/NavBar";
import Swal from "sweetalert2";
import axios from "axios";
import "./ClassMaster.css";
import baseUrl from "../../../../API/BaseURL";

export default function ClassMaster() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const Item = location.state[0];
  const dropdownItemActive = location.state[1];
  const chooseMessage = (message) => {
    setSidebarOpen(message);
  };
  let classCount = 1;
  let sectionCount = 1;
  const [classData, setClassData] = useState({ classes: "", status: "1" });
  const [sectionData, setSectionData] = useState({
    section: "",
    status: "1",
  });
  const [getClassData, setGetClassData] = useState([]);
  const [getSectionData, SetGetSetionData] = useState([]);
  const [error, setError] = useState({});
  const [filterClassData, setFilterClassData] = useState([{}]);
  const [updateClassData, setUpdateClassData] = useState([{}]);
  const [filterSectionData, setFilterSectionData] = useState([{}]);
  const [updateSectionData, setUpdateSectionData] = useState([{}]);

  const sectionChange = (e) => {
    const { name, value } = e.target;
    setSectionData({ ...sectionData, [name]: value });
  };

  const classChange = (e) => {
    const { name, value } = e.target;
    setClassData({ ...classData, [name]: value });
  };

  const handleClassValidate = (value) => {
    let error = {};
    if (!value.classes) {
      error.classes = "Enter class";
    } else {
      classPostApi();
    }
    setError(error);
  };
  const handleSectionValidate = (value) => {
    let error = {};
    if (!value.section) {
      error.section = "Enter section";
    } else {
      sectionPostApi();
    }
    setError(error);
  };
  const classPostApi = () => {
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
        axios.post(`${baseUrl}/post/class`, classData, config).then((res) => {
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
  const sectionPostApi = () => {
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
          .post(`${baseUrl}/post/section`, sectionData, config)
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
  const classClick = () => {
    handleClassValidate(classData);
  };
  const sectionClick = () => {
    handleSectionValidate(sectionData);
  };
  const GetClassApi = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios.get(`${baseUrl}/get/class`, config).then((res) => {
      const { data, success } = res.data;
      if (success) {
        setGetClassData(data);
        // setGetSessionData(success);
      }
    });
  };
  const GetSectionApi = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios.get(`${baseUrl}/get/section`, config).then((res) => {
      const { data, success } = res.data;
      if (success) {
        SetGetSetionData(data);
        // setGetSessionData(success);
      }
    });
  };

  useEffect(() => {
    GetClassApi();
    GetSectionApi();
  }, []);
  const classUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateClassData([{ ...updateClassData[0], [name]: value }]);
  };

  const sectionUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateSectionData([{ ...updateSectionData[0], [name]: value }]);
  };
  const handleClassModale = async (e) => {
    const id = e.target.getAttribute("id");
    await setFilterClassData(getClassData.filter((item) => item._id === id));
    await setUpdateClassData(getClassData.filter((item) => item._id === id));
  };

  const handleSectionModal = async (e) => {
    const id = e.target.getAttribute("id");
    await setFilterSectionData(
      getSectionData.filter((item) => item._id === id)
    );
    await setUpdateSectionData(
      getSectionData.filter((item) => item._id === id)
    );
  };

  const classUpdateClick = (event) => {
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
          .put(`${baseUrl}/update/class`, updateClassData, config)
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
          .put(`${baseUrl}/update/section`, updateSectionData, config)
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
                <div class="card-header">Class Master</div>
                <div class=" table-responsive">
                  <table class="table sessionTable text-start align-middle table-bordered table-hover mb-0">
                    <thead>
                      <tr class="text-white">
                        <th scope="col">SR</th>
                        <th scope="col">Classes</th>
                        <th scope="col">Status</th>
                        <th scope="col">Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getClassData?.map((row) => {
                        return (
                          <tr>
                            <td>{classCount++}</td>
                            <td>{row.classes}</td>
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
                                onClick={handleClassModale}
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
                            name="classes"
                            onChange={classChange}
                          />
                        </div>
                        <p className="error">{error.classes}</p>
                      </div>
                      <div class="col">
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={classClick}
                        >
                          Add Class
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-header">Section Master</div>
                <div class=" table-responsive">
                  <table class="table sessionTable text-start align-middle table-bordered table-hover mb-0">
                    <thead>
                      <tr class="text-white">
                        <th scope="col">SR</th>
                        <th scope="col">Sections</th>
                        <th scope="col">Status</th>
                        <th scope="col">Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSectionData?.map((row) => {
                        return (
                          <tr>
                            <td>{sectionCount++}</td>
                            <td>{row.section}</td>
                            {row.status === "1" ? (
                              <td>Active</td>
                            ) : (
                              <td>In active</td>
                            )}
                            <td>
                              <button
                                id={row._id}
                                class="btn btn-sm btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalSection"
                                onClick={handleSectionModal}
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
                            placeholder="Enter section"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="section"
                            onChange={sectionChange}
                          />
                        </div>
                        <p className="error">{error.section}</p>
                      </div>
                      <div class="col">
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={sectionClick}
                        >
                          Add Section
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
                            Class Name
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                            defaultValue={filterClassData[0].classes}
                            name="classes"
                            onChange={classUpdateChange}
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
                            onChange={classUpdateChange}
                          >
                            {filterClassData[0].status === "1" ? (
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
                onClick={classUpdateClick}
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
        id="exampleModalSection"
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
                            Section
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                            defaultValue={filterSectionData[0].section}
                            name="section"
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
                            {filterSectionData[0].status === "1" ? (
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
