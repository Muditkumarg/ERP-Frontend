import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavSidePage from "../../NavBar.js/NavBar";
import "./ClassSectionMaster.css";
import axios from "axios";
import Swal from "sweetalert2";
import baseUrl from "../../../../API/BaseURL";

export default function ClassSectionMaster() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const Item = location.state[0];
  const dropdownItemActive = location.state[1];
  const [getClassData, setGetClassData] = useState([]);
  const [getSectionData, SetGetSetionData] = useState([]);
  const [addSection, setAddSection] = useState("");
  const [getClassSection, setGetClassSection] = useState([]);
  const [editSection, setEditSection] = useState("");
  const chooseMessage = (message) => {
    setSidebarOpen(message);
  };
  let count = 1;

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
  const GetClassSectionApi = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios.get(`${baseUrl}/get/class-wise/section`, config).then((res) => {
      const { data, success } = res.data;
      if (success) {
        setGetClassSection(data);
      }
    });
  };

  useEffect(() => {
    GetClassApi();
    GetSectionApi();
    GetClassSectionApi();
  }, []);
  console.log(getClassSection);

  const sectionAdd = (e) => {
    const { name, value } = e.target;
    const id = e.target.getAttribute("id");
    setAddSection({ ...addSection, [name]: value, id: id });
  };

  const AddSectionApi = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    if (addSection) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(`${baseUrl}/add/class-wise/section`, addSection, config)
            .then((res) => {
              const { message, success } = res.data;
              if (success) {
                Swal.fire("Saved!", "", "success").then(() => {
                  window.location.reload();
                });
              }
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };
  useEffect(() => {
    AddSectionApi();
  }, [addSection]);

  const sectionStatusChange = async (e) => {
    const _id = e.target.getAttribute("id");
    const { name, value } = e.target;
    setEditSection({ ...editSection, [name]: value, _id: _id });
    console.log(editSection);
  };

  const UpdateSectionApi = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    if (editSection) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`${baseUrl}/update/class-wise/section`, editSection, config)
            .then((res) => {
              const { message, success } = res.data;
              if (success) {
                Swal.fire("Saved!", "", "success").then(() => {
                  window.location.reload();
                });
              }
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };
  useEffect(() => {
    UpdateSectionApi();
  }, [editSection]);

  // console.log("section", getSectionData);

  return (
    <>
      <NavSidePage
        chooseMessage={chooseMessage}
        Item={Item}
        dropdownItemActive={dropdownItemActive}
      />
      <div className={`content ${sidebarOpen ? "open" : ""}`}>
        <div class="mainContainer container-fluid px-4">
          <div className="card">
            <div className="card-body">
              <div class="container-fluid pt-4 px-4">
                <div class="bg-secondary text-center rounded p-4">
                  <div class="d-flex align-items-center justify-content-between mb-4">
                    <h6 class="mb-0">Recent Salse</h6>
                    <a href="">Show All</a>
                  </div>
                  <div class="table-responsive">
                    <table class="table text-start align-middle table-bordered table-hover mb-0">
                      <thead className="class-section-thead">
                        <tr class="text-white">
                          <th scope="col">SR</th>
                          <th scope="col">Class</th>
                          <th scope="col">
                            <div class="container">
                              <div class="row">
                                <div class="col">Section</div>
                                <div class="col">Status</div>
                              </div>
                            </div>
                          </th>

                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getClassData?.map((row) => {
                          return (
                            <tr className="class-section-tr">
                              {row.status === "1" ? (
                                <>
                                  <td>{count++}</td>
                                  <td>{row.classes}</td>
                                  <td>
                                    {getClassSection?.map((sectionRow) => {
                                      return (
                                        <>
                                          <div>
                                            {" "}
                                            {sectionRow.id === row._id ? (
                                              <div class="section-container container">
                                                <div class="row">
                                                  <div class=" col">
                                                    <li>
                                                      {sectionRow.section}
                                                    </li>
                                                  </div>
                                                  <div class=" col">
                                                    {sectionRow.status ===
                                                    "1" ? (
                                                      <select
                                                        class="btn btn-sm btn-primary"
                                                        href=""
                                                        name="status"
                                                        onChange={
                                                          sectionStatusChange
                                                        }
                                                        id={sectionRow._id}
                                                      >
                                                        <option selected>
                                                          Active
                                                        </option>

                                                        <option value="0">
                                                          In Active
                                                        </option>
                                                      </select>
                                                    ) : (
                                                      <select
                                                        class="btn btn-sm btn-primary"
                                                        href=""
                                                        name="status"
                                                        onChange={
                                                          sectionStatusChange
                                                        }
                                                        id={sectionRow._id}
                                                      >
                                                        <option selected>
                                                          In Active
                                                        </option>

                                                        <option value="1">
                                                          Active
                                                        </option>
                                                      </select>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        </>
                                      );
                                    })}
                                  </td>
                                  <td>
                                    <select
                                      class="btn btn-sm  btn-success"
                                      href=""
                                      name="section"
                                      onChange={sectionAdd}
                                      id={row._id}
                                    >
                                      <option selected>Add Section</option>

                                      {getSectionData?.map((row) => {
                                        return (
                                          <>
                                            {row.status === "1" ? (
                                              <option value={row.section}>
                                                {row.section}
                                              </option>
                                            ) : (
                                              ""
                                            )}
                                          </>
                                        );
                                      })}
                                    </select>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
