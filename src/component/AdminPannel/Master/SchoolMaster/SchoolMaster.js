import React, { useEffect } from "react";
import NavSidePage from "../../NavBar.js/NavBar";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../AdminPannel.css";
import "./SchoolMaster.css";
import axios from "axios";
import Swal from "sweetalert2";
import baseUrl from "../../../../API/BaseURL";

export default function SchoolMasterPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const Item = location.state[0];
  const dropdownItemActive = location.state[1];
  const [schoolData, setSchoolData] = useState();
  const [getSchoolData, setGetSchoolData] = useState({});
  const [visualButton, setVisualButton] = useState(false);
  const [editDetails, setEditDetails] = useState();

  const chooseMessage = (message) => {
    setSidebarOpen(message);
  };
  const handleLogoUpdate = (e) => {
    const files = e.target.files[0];
    setSchoolData({ ...schoolData, schoolLogo: files });
    setGetSchoolData({ ...getSchoolData, schoolLogo: files });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchoolData({ ...schoolData, [name]: value });
    setGetSchoolData({ ...getSchoolData, [name]: value });
  };
  console.log("SchoolData", schoolData);

  const handleClick = (e) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const formData = new FormData();
    formData.append("schoolName", schoolData.schoolName);
    formData.append("address", schoolData.address);
    formData.append("state", schoolData.state);
    formData.append("pinCode", schoolData.pinCode);
    formData.append("phoneNumber", schoolData.phoneNumber);
    formData.append("FeeCollectionMethod", schoolData.FeeCollectionMethod);
    formData.append("registrationFee", schoolData.registrationFee);
    formData.append("schoolLogo", schoolData.schoolLogo);
    formData.append("schoolShortName", schoolData.schoolShortName);
    formData.append("affiliatedTo", schoolData.affiliatedTo);
    formData.append("email", schoolData.email);
    formData.append("website", schoolData.website);
    formData.append("affiliationCode", schoolData.affiliationCode);
    formData.append("schoolCode", schoolData.schoolCode);
    axios.post(`${baseUrl}/save/school-data`, formData, config).then((res) => {
      const { message, data, success } = res.data;
      if (success) {
        alert(message);
      } else {
        alert(message);
      }
    });
  };

  const getSchoolInfo = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios.get(`${baseUrl}/get/school-data`, config).then((res) => {
      const { data, success } = res.data;
      if (success) {
        setGetSchoolData(data[0]);
        setVisualButton(success);
      }
    });
  };

  useEffect(() => {
    getSchoolInfo();
  }, []);

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const id = getSchoolData._id;
    const formData = new FormData();
    formData.append("schoolName", getSchoolData.schoolName);
    formData.append("address", getSchoolData.address);
    formData.append("state", getSchoolData.state);
    formData.append("pinCode", getSchoolData.pinCode);
    formData.append("phoneNumber", getSchoolData.phoneNumber);
    formData.append("FeeCollectionMethod", getSchoolData.FeeCollectionMethod);
    formData.append("registrationFee", getSchoolData.registrationFee);
    formData.append("schoolLogo", getSchoolData.schoolLogo);
    formData.append("schoolShortName", getSchoolData.schoolShortName);
    formData.append("affiliatedTo", getSchoolData.affiliatedTo);
    formData.append("email", getSchoolData.email);
    formData.append("website", getSchoolData.website);
    formData.append("affiliationCode", getSchoolData.affiliationCode);
    formData.append("schoolCode", getSchoolData.schoolCode);

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${baseUrl}/update/school-data/${id}`, formData, config)
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
            <div class="">
              <div class="card mb-4">
                <div class="card-header">
                  <strong>School Information Master</strong>
                </div>
                <div class="card-body">
                  <div class="card">
                    <div class="card-body">
                      <div class="container">
                        <div class="row">
                          <div class="col-md-6">
                            <form>
                              <div class="mb-3">
                                <label
                                  for="schoolName"
                                  class="form-label lableStyle mt-0"
                                >
                                  School Name
                                </label>
                                <input
                                  type="text"
                                  class="form-control schoolinput"
                                  id="schoolName"
                                  name="schoolName"
                                  onChange={handleChange}
                                  defaultValue={getSchoolData.schoolName}
                                />
                              </div>
                              <div class="mb-3">
                                <label
                                  for="address"
                                  class="form-label lableStyle "
                                >
                                  Address
                                </label>
                                <input
                                  type="text"
                                  class="form-control schoolinput"
                                  id="address"
                                  name="address"
                                  onChange={handleChange}
                                  defaultValue={getSchoolData.address}
                                />
                              </div>
                              <div class="mb-3">
                                <label
                                  for="state"
                                  class="form-label lableStyle "
                                >
                                  State
                                </label>
                                <input
                                  type="text"
                                  class="form-control schoolinput"
                                  id="state"
                                  name="state"
                                  onChange={handleChange}
                                  defaultValue={getSchoolData.state}
                                />
                              </div>
                              <div class="mb-3">
                                <label
                                  for="pinCode"
                                  class="form-label lableStyle"
                                >
                                  Pin Code
                                </label>
                                <input
                                  type="text"
                                  class="form-control schoolinput"
                                  id="pinCode"
                                  name="pinCode"
                                  onChange={handleChange}
                                  defaultValue={getSchoolData.pinCode}
                                />
                              </div>
                              <div class="mb-3">
                                <label
                                  for="phoneNumber"
                                  class="form-label lableStyle "
                                >
                                  Phone Number
                                </label>
                                <input
                                  type="text"
                                  class="form-control schoolinput"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  onChange={handleChange}
                                  defaultValue={getSchoolData.phoneNumber}
                                />
                              </div>
                              <div class="mb-3">
                                <label
                                  for="feeCollectionMethod"
                                  class="form-label lableStyle"
                                >
                                  Fee Collection Method
                                </label>
                                <input
                                  type="text"
                                  class="form-control schoolinput"
                                  id="feeCollectionMethod"
                                  name="FeeCollectionMethod"
                                  onChange={handleChange}
                                  defaultValue={
                                    getSchoolData.FeeCollectionMethod
                                  }
                                />
                              </div>
                              <div class="mb-3">
                                <label
                                  for="registrationFee"
                                  class="form-label lableStyle "
                                >
                                  Registration Fee
                                </label>
                                <input
                                  type="text"
                                  class="form-control schoolinput"
                                  id="registrationFee"
                                  name="registrationFee"
                                  onChange={handleChange}
                                  defaultValue={getSchoolData.registrationFee}
                                />
                              </div>
                              <div class="mb-3">
                                <label
                                  for="schoolLogo"
                                  class="form-label lableStyle "
                                >
                                  School Logo
                                </label>
                                <input
                                  type="file"
                                  class="form-control schoolinput"
                                  id="schoolLogo"
                                  name="schoolLogo"
                                  onChange={handleLogoUpdate}
                                />
                              </div>
                            </form>
                          </div>
                          <div class="col-md-6">
                            <form>
                              <div class="mb-3">
                                <label
                                  for="schoolShortName"
                                  class="form-label lableStyle"
                                >
                                  School Short Name
                                </label>
                                <input
                                  type="text"
                                  class="form-control schoolinput"
                                  id="schoolShortName"
                                  name="schoolShortName"
                                  onChange={handleChange}
                                  defaultValue={getSchoolData.schoolShortName}
                                />
                              </div>
                              <div class="mb-3">
                                <label
                                  for="affiliatedUpTo"
                                  class="form-label lableStyle "
                                >
                                  Affiliated Up To
                                </label>
                                <input
                                  type="text"
                                  class="form-control schoolinput"
                                  id="affiliatedUpTo"
                                  name="affiliatedTo"
                                  onChange={handleChange}
                                  defaultValue={getSchoolData.affiliatedTo}
                                />
                              </div>
                              <div class="mb-3">
                                <label
                                  for="email"
                                  class="form-label lableStyle "
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  class="form-control schoolinput"
                                  id="email"
                                  name="email"
                                  onChange={handleChange}
                                  defaultValue={getSchoolData.email}
                                />
                              </div>
                              <div class="mb-3">
                                <label
                                  for="website"
                                  class="form-label lableStyle "
                                >
                                  Website
                                </label>
                                <input
                                  type="text"
                                  class="form-control schoolinput"
                                  id="website"
                                  name="website"
                                  onChange={handleChange}
                                  defaultValue={getSchoolData.website}
                                />
                              </div>
                              <div class="row">
                                <div class="col-sm-auto">
                                  <form>
                                    <div class="mb-3">
                                      <label class="form-label lableStyle ">
                                        Affiliation Code :
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control schoolinput"
                                        id="affiliationCode1"
                                        name="affiliationCode"
                                        onChange={handleChange}
                                        defaultValue={
                                          getSchoolData.affiliationCode
                                        }
                                      />
                                    </div>
                                  </form>
                                </div>
                                <div class="col-sm-auto">
                                  <form>
                                    <div class="mb-3">
                                      <label class="form-label lableStyle">
                                        School Code :
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control schoolinput"
                                        id="affiliationCode2"
                                        name="schoolCode"
                                        onChange={handleChange}
                                        defaultValue={getSchoolData.schoolCode}
                                      />
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </form>
                            <label class="form-label lableStyle">
                              School Logo :
                            </label>
                            <div>
                              {" "}
                              <img
                                className="schoolLogo"
                                src={`http://localhost:5000/schoollogo/${getSchoolData.schoolLogo}`}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col"></div>
                          <div class="col updateButtonCol">
                            {visualButton === false ? (
                              <button
                                class="btn btn-success updateButton mt-3"
                                onClick={handleClick}
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                class="btn btn-success updateButton mt-3"
                                onClick={handleUpdate}
                              >
                                Update Info
                              </button>
                            )}
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
