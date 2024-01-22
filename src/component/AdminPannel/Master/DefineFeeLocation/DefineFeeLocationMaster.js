import { React, useEffect, useState } from "react";
import NavSidePage from "../../NavBar.js/NavBar";
import { useLocation } from "react-router-dom";
import "./DefineFeeLocationMaster.css";
import axios from "axios";
import Swal from "sweetalert2";
import baseUrl from "../../../../API/BaseURL";

export default function DefineFeeLocationMaster() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const Item = location.state[0];
  const dropdownItemActive = location.state[1];
  const chooseMessage = (message) => {
    setSidebarOpen(message);
  };
  let count = 0;
  const [feeData, setFeeData] = useState("");
  const [error, setError] = useState({});
  const [getFeeData, setGetFeeData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeeData({ ...feeData, [name]: value });
  };
  const handleValidate = (value) => {
    let error = {};
    if (!value.location) {
      error.location = "Enter location";
    }
    if (!value.locationCode) {
      error.locationCode = "Enter location code";
    } else {
      FeeLocationApi();
    }
    setError(error);
  };

  const handleClick = () => {
    handleValidate(feeData);
  };

  const FeeLocationApi = () => {
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
          .post(`${baseUrl}/post/fee-location`, feeData, config)
          .then((res) => {
            const { message, success } = res.data;
            if (success) {
              Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
      }
    });
  };
  const GetFeeLocationApi = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios.get(`${baseUrl}/get/fee-location`, config).then((res) => {
      const { data, success } = res.data;
      if (success) {
        setGetFeeData(data);
        // setGetSessionData(success);
      }
    });
  };
  useEffect(() => {
    GetFeeLocationApi();
  }, []);
  console.log(getFeeData);

  return (
    <>
      <NavSidePage
        chooseMessage={chooseMessage}
        Item={Item}
        dropdownItemActive={dropdownItemActive}
      />
      <div className={`content ${sidebarOpen ? "open" : ""}`}>
        <div class="mainContainer container-fluid pt-4 px-4">
          <div class="row">
            <div class="col">
              <div class="card">
                <div class="card-header cardTitle">Fee Location Master</div>
                <div class="card-body">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-2"></div>
                      <div class="col">
                        <div class="container">
                          <div class="row">
                            <div class="col">
                              <div class="mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Location
                                </label>
                                <input
                                  type="email"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                  placeholder="Enter Location"
                                  name="location"
                                  onChange={handleChange}
                                />
                                <p className="error">{error.location}</p>
                              </div>
                            </div>
                            <div class="col">
                              <div class="mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Location Code
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                  placeholder="Enter Location Code"
                                  name="locationCode"
                                  onChange={handleChange}
                                />
                                <p className="error">{error.locationCode}</p>
                              </div>
                            </div>

                            <div class="container">
                              <div class="row">
                                <div class="col"></div>
                                <div class="col feeBtn ">
                                  <button
                                    type="button"
                                    class=" btn btn-success"
                                    onClick={handleClick}
                                  >
                                    Add Record
                                  </button>
                                </div>
                                <div class="col"></div>
                              </div>
                            </div>

                            <div class=" table-responsive mt-2">
                              <table class="table sessionTable text-start align-middle table-bordered table-hover mb-0">
                                <thead>
                                  <tr class="text-white">
                                    <th scope="col">SR</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Update</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {getFeeData.map((row) => {
                                    return (
                                      <tr>
                                        <td>{count + 1}</td>
                                        <td>{row.location}</td>
                                        <td>{row.locationCode}</td>
                                        <td>Active</td>
                                        <td>
                                          <button
                                            class="btn btn-sm btn-primary"
                                            href=""
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
                          </div>
                        </div>
                      </div>

                      <div class="col-md-2"></div>
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
