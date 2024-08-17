import React, { useEffect } from "react";
import "./NavBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../../API/BaseURL";

export default function NavSidePage({
  chooseMessage,
  Item,
  dropdownItemActive,
}) {
  const nevigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(dropdownItemActive);
  const [activeSubItem, setActiveSubItem] = useState(Item);
  const [userData, setUserData] = useState("");

  // Function to toggle the sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    chooseMessage(!sidebarOpen);
  };
  // console.log("SIDE", sidebarOpen);
  const handleItemClick = (itemName) => {
    if (activeItem === itemName) {
      // If the clicked item is already active, deactivate it
      setActiveItem(null);
    } else {
      // Otherwise, activate the clicked item
      if (itemName === "dashboard") {
        setActiveItem(itemName);
        nevigate("/dashboard", { state: itemName });
      } else {
        setActiveItem(itemName);
      }
    }
  };
  const handleSubItemClick = (itemName) => {
    if (activeItem === itemName) {
      // If the clicked item is already active, deactivate it
      setActiveItem(null);
    } else {
      // Otherwise, activate the clicked item
      setActiveSubItem(itemName);
      nevigate(`/${itemName}`, { state: [itemName, activeItem] });
    }
  };
  const getUserData = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(`${baseUrl}/get-user/data`, config)
      .then((res) => {
        const { message, success } = res.data;
        setUserData(res.data);
      })
      .catch((error) => {
        if (error.response) {
          nevigate("/401");
        } else if (error.request) {
          alert("No response from the server");
        } else {
          alert("Request configuration error");
        }
      });
  };

  // console.log(userData);
  useEffect(() => {
    setTimeout(() => {
      setSpinner(true);
    }, 1000);
    getUserData();
  }, []);

  // console.log("Spinner", spinner);
  return (
    <>
      {/* <!-- Spinner Start --> */}
      <div>
        {spinner === false ? (
          <div
            id="spinner"
            class="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
          >
            <div
              class="spinner-border text-primary"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="nav-Main container-fluid position-fixed d-flex ">
            <div className={`sidebar ${sidebarOpen ? "open" : ""} pe-4 pb-3`}>
              <nav className="navbar bg-secondary navbar-dark">
                <div href="index.html" class="navbar-brand mx-4 mb-3">
                  <h3 className="text-primary">
                    <i className="fa fa-user-edit me-2"></i>AVM ERP
                  </h3>
                </div>
                <div className="d-flex align-items-center ms-4 mb-4">
                  <div className="position-relative">
                    <img
                      className="rounded-circle"
                      src="img/user.jpg"
                      alt=""
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0">Mudit kumar</h6>
                    <span>Admin</span>
                  </div>
                </div>
                <div class="navbar-nav w-100">
                  <div
                    className={`nav-item nav-link ${
                      activeItem === "dashboard" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      handleItemClick("dashboard");
                      e.preventDefault();
                    }}
                  >
                    <i className="fa fa-tachometer-alt me-2"></i>Dashboard
                  </div>
                  <div className="nav-item dropdown">
                    <div
                      className={`nav-link dropdown-toggle ${
                        activeItem === "master" ? "active" : ""
                      }`}
                      onClick={() => handleItemClick("master")}
                      data-bs-toggle="dropdown"
                    >
                      <i className="fa fa-laptop me-2"></i>Master
                    </div>
                    <div
                      className={`dropdown-menu bg-transparent border-0 ${
                        activeItem === "master" ? "show" : ""
                      }`}
                    >
                      <div
                        className={`dropdown-item ${
                          activeSubItem === "schoolmaster" ? "active" : ""
                        }`}
                        onClick={(e) => {
                          handleSubItemClick("schoolmaster");
                          e.preventDefault();
                        }}
                      >
                        School Master
                      </div>
                      <div
                        className={`dropdown-item ${
                          activeSubItem === "sessionmaster" ? "active" : ""
                        }`}
                        onClick={() => handleSubItemClick("sessionmaster")}
                      >
                        Session Master
                      </div>
                      <div
                        className={`dropdown-item ${
                          activeSubItem === "definefeelocmater" ? "active" : ""
                        }`}
                        onClick={() => handleSubItemClick("definefeelocmater")}
                      >
                        Define Fee Location
                      </div>
                      <div
                        className={`dropdown-item ${
                          activeSubItem === "classmaster" ? "active" : ""
                        }`}
                        onClick={() => handleSubItemClick("classmaster")}
                      >
                        Class Master
                      </div>
                      <div
                        className={`dropdown-item ${
                          activeSubItem === "classsectionmaster" ? "active" : ""
                        }`}
                        onClick={() => handleSubItemClick("classsectionmaster")}
                      >
                        Class Section Master
                      </div>
                      <div
                        className={`dropdown-item ${
                          activeSubItem === "streammaster" ? "active" : ""
                        }`}
                        onClick={() => handleSubItemClick("streammaster")}
                      >
                        Stream Master
                      </div>
                      {/* <div
                        className={`dropdown-item ${
                          activeSubItem === "housemaster" ? "active" : ""
                        }`}
                        onClick={() => handleSubItemClick("housemaster")}
                      >
                        House Master
                      </div> */}
                      <div
                        className={`dropdown-item ${
                          activeSubItem === "doccumentmaster" ? "active" : ""
                        }`}
                        onClick={() => handleSubItemClick("doccumentmaster")}
                      >
                        Doccument Master
                      </div>
                      <div
                        className={`dropdown-item ${
                          activeSubItem === "blood-group-master" ? "active" : ""
                        }`}
                        onClick={() => handleSubItemClick("blood-group-master")}
                      >
                        Blood Group Master
                      </div>
                      <a href="element.html" className="dropdown-item">
                        Pramote
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Applied Fee Structure
                      </a>
                      <div
                        className={`dropdown-item ${
                          activeSubItem === "cast-category-master"
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          handleSubItemClick("cast-category-master")
                        }
                      >
                        Cast Category Master
                      </div>
                      <div
                        className={`dropdown-item ${
                          activeSubItem === "marital-status-master"
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          handleSubItemClick("marital-status-master")
                        }
                      >
                        Marital Status Master
                      </div>
                      <div
                        className={`dropdown-item ${
                          activeSubItem === "religion-master" ? "active" : ""
                        }`}
                        onClick={() => handleSubItemClick("religion-master")}
                      >
                        Religion Master
                      </div>
                      <div
                        className={`dropdown-item ${
                          activeSubItem === "state-city-master" ? "active" : ""
                        }`}
                        onClick={() => handleSubItemClick("state-city-master")}
                      >
                        State/City Master
                      </div>
                      {/* <a href="element.html" className="dropdown-item">
                        Deparment Designation Master
                      </a>

                      <a href="element.html" className="dropdown-item">
                        Place/Area/Location
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Bus No. Master
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Route Master Master
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Stop Master
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Update Route and Stop in next Session
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Vehicle Master
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Vehicle Making/Company/Model
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Vehicle Parts
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Add Visitors Right Master
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Assign Fee To Class
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Deparment Designation Master
                      </a> */}
                    </div>
                  </div>
                  <div className="nav-item dropdown">
                    <div
                      className={`nav-link dropdown-toggle ${
                        activeItem === "frontoffice" ? "active" : ""
                      }`}
                      data-bs-toggle="dropdown"
                      onClick={() => handleItemClick("frontoffice")}
                    >
                      <i className="fa fa-laptop me-2"></i>Front Desk
                    </div>
                    <div
                      className={`dropdown-menu bg-transparent border-0 ${
                        activeItem === "frontoffice" ? "show" : ""
                      }`}
                    >
                      <a href="button.html" className="dropdown-item">
                        Add Feedback / Suggestions
                      </a>
                      <a href="typography.html" className="dropdown-item">
                        View Feedback / Suggestions
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Records Visits
                      </a>
                      <a href="element.html" className="dropdown-item">
                        List Visitors
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Process
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Report
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Add HRM
                      </a>
                      <a href="element.html" className="dropdown-item">
                        List HRM
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Final HRM Generation
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Add Letter
                      </a>
                    </div>
                  </div>
                  <div className="nav-item dropdown">
                    <div
                      className={`nav-link dropdown-toggle ${
                        activeItem === "student" ? "active" : ""
                      }`}
                      data-bs-toggle="dropdown"
                      onClick={() => handleItemClick("student")}
                    >
                      <i className="fa fa-laptop me-2"></i>Students
                    </div>
                    <div
                      className={`dropdown-menu bg-transparent border-0 ${
                        activeItem === "student" ? "show" : ""
                      }`}
                    >
                      <div href="button.html" className="dropdown-item">
                        New Registration
                      </div>
                      <a href="typography.html" className="dropdown-item">
                        List New Admissions
                      </a>
                      <a href="element.html" className="dropdown-item">
                        List Admissions (By Date)
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Change Admin No.
                      </a>
                      <a href="element.html" className="dropdown-item">
                        List Students (Classwise)
                      </a>
                      <a href="element.html" className="dropdown-item">
                        List Students (Addresswise)
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Master Student Edit
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Search Student
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Student Strength
                      </a>
                      <a href="element.html" className="dropdown-item">
                        NSO Updation List
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Student Strength (Catagorywise)
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Student Strength (Sessionwise)
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Student Strengh (Agewise)
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Student Strength (Locationwise)
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Create Sibling
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Sibling Report
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Other Listing
                      </a>
                    </div>
                  </div>
                  <div className="nav-item dropdown">
                    <div
                      className={`nav-link dropdown-toggle ${
                        activeItem === "feesection" ? "active" : ""
                      }`}
                      data-bs-toggle="dropdown"
                      onClick={() => handleItemClick("feesection")}
                    >
                      <i className="fa fa-laptop me-2"></i>Fee Section
                    </div>
                    <div
                      className={`dropdown-menu bg-transparent border-0 ${
                        activeItem === "feesection" ? "show" : ""
                      } `}
                    >
                      <a className="dropdown-item">
                        <select
                          class="form-select feeSectionMaster shadow-none"
                          aria-label="Default select example"
                        >
                          <option selected>Master Setup</option>
                          <option value="1">Define Fee Heads</option>
                          <option value="2">Define Fee Types</option>
                          <option value="3">Define Fee Ammount</option>
                          <option value="3">Define Extra Heads</option>
                          <option value="3">Define Teacher Extra Heads</option>
                          <option value="3">Discount Heads</option>
                        </select>
                      </a>
                      <a href="typography.html" className="dropdown-item">
                        Pay Fee
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Pay Extra Fee
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Pay Extra Teacher Fee
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Pay Extra Other Fee
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Registration Fee Entry
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Online Panding Fee
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Option 2 Online panding Fee
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Discount Approval
                      </a>
                      <a href="element.html" className="dropdown-item">
                        View Receipts
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Cheques Listing
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Bounced Cheque Clearing
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Fee Transactions
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Fee Collections (Paid/Unpaid)
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Anual Fee Reports
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Other Reports
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Fee Defaulter
                      </a>
                    </div>
                  </div>
                  <div className="nav-item dropdown">
                    <div
                      className={`nav-link dropdown-toggle ${
                        activeItem === "adminstration" ? "active" : ""
                      }`}
                      data-bs-toggle="dropdown"
                      onClick={() => handleItemClick("adminstration")}
                    >
                      <i className="fa fa-laptop me-2"></i>Adminstration
                    </div>
                    <div
                      className={`dropdown-menu bg-transparent border-0 ${
                        activeItem === "adminstration" ? "show" : ""
                      } `}
                    >
                      <a href="typography.html" className="dropdown-item">
                        Accounting
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Transport Expense
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Salary Details
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Generate Salary
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Registration Fee Entry
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Print Salary Slip
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Stock Management
                      </a>
                    </div>
                  </div>
                  <div className="nav-item dropdown">
                    <div
                      className={`nav-link dropdown-toggle ${
                        activeItem === "transport" ? "active" : ""
                      }`}
                      data-bs-toggle="dropdown"
                      onClick={() => handleItemClick("transport")}
                    >
                      <i className="fa fa-laptop me-2"></i>Transport
                    </div>
                    <div
                      className={`dropdown-menu bg-transparent border-0 ${
                        activeItem === "transport" ? "show" : ""
                      } `}
                    >
                      <a href="typography.html" className="dropdown-item">
                        Student List (Using Trans.)
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Buswise List
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Routewise List
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Stopwise List
                      </a>
                      <a href="element.html" className="dropdown-item">
                        One Click Buswise List
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Routewise / Stoppagewise List
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Buswise Student Count
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Transport Attendance
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Attendance Transport Register
                      </a>
                    </div>
                  </div>
                  <div className="nav-item dropdown">
                    <div
                      className={`nav-link dropdown-toggle ${
                        activeItem === "certificate" ? "active" : ""
                      }`}
                      data-bs-toggle="dropdown"
                      onClick={() => handleItemClick("certificate")}
                    >
                      <i className="fa fa-laptop me-2"></i>Certificate
                    </div>
                    <div
                      className={`dropdown-menu bg-transparent border-0 ${
                        activeItem === "certificate" ? "show" : ""
                      } `}
                    >
                      <a href="typography.html" className="dropdown-item">
                        Certificate Report
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Certificate Defaulters
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Transfer Certificate
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Stopwise List
                      </a>
                      <a href="element.html" className="dropdown-item">
                        One Click Buswise List
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Routewise / Stoppagewise List
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Buswise Student Count
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Transport Attendance
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Attendance Transport Register
                      </a>
                    </div>
                  </div>
                  <div className="nav-item dropdown">
                    <div
                      className={`nav-link dropdown-toggle ${
                        activeItem === "setting" ? "active" : ""
                      }`}
                      data-bs-toggle="dropdown"
                      onClick={() => handleItemClick("setting")}
                    >
                      <i className="fa fa-laptop me-2"></i>Settings
                    </div>
                    <div
                      className={`dropdown-menu bg-transparent border-0 ${
                        activeItem === "setting" ? "show" : ""
                      } `}
                    >
                      <a href="typography.html" className="dropdown-item">
                        Manage User
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Manage User Menu
                      </a>
                      <a href="element.html" className="dropdown-item">
                        User Activity
                      </a>
                      <a href="element.html" className="dropdown-item">
                        SMS Settings
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Admin Support
                      </a>
                      <a href="element.html" className="dropdown-item">
                        Change Password
                      </a>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            {/* <!-- Sidebar End --> */}

            <div className={`content ${sidebarOpen ? "open" : ""}`}>
              {/* <!-- Navbar Start --> */}
              <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
                <a
                  href="index.html"
                  className="navbar-brand d-flex d-lg-none me-4"
                >
                  <h2 className="text-primary mb-0">
                    <i className="fa fa-user-edit"></i>
                  </h2>
                </a>
                <div
                  className="sidebar-toggler flex-shrink-0"
                  onClick={toggleSidebar}
                >
                  <i className="fa fa-bars"></i>
                </div>
                <form className="d-none d-md-flex ms-4">
                  <input
                    className="form-control bg-dark border-0"
                    type="search"
                    placeholder="Search"
                  />
                </form>
                <div className="navbar-nav align-items-center ms-auto">
                  <div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <i class="fa fa-users" aria-hidden="true"></i>
                      <span className="d-none d-lg-inline-flex">
                        User Activity
                      </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                      <a href="#" className="dropdown-item">
                        <div className="d-flex align-items-center">
                          <img
                            className="rounded-circle"
                            src="img/user.jpg"
                            alt=""
                            style={{ width: "40px", height: "40px" }}
                          />
                          <div className="ms-2">
                            <h6 className="fw-normal mb-0">
                              Jhon send you a message
                            </h6>
                            <small>15 minutes ago</small>
                          </div>
                        </div>
                      </a>
                      <hr className="dropdown-divider" />
                      <a href="#" className="dropdown-item">
                        <div className="d-flex align-items-center">
                          <img
                            className="rounded-circle"
                            src="img/user.jpg"
                            alt=""
                            style={{ width: "40px", height: "40px" }}
                          />
                          <div className="ms-2">
                            <h6 className="fw-normal mb-0">
                              Jhon send you a message
                            </h6>
                            <small>15 minutes ago</small>
                          </div>
                        </div>
                      </a>
                      <hr className="dropdown-divider" />
                      <a href="#" className="dropdown-item">
                        <div className="d-flex align-items-center">
                          <img
                            className="rounded-circle"
                            src="img/user.jpg"
                            alt=""
                            style={{ width: "40px", height: "40px" }}
                          />
                          <div className="ms-2">
                            <h6 className="fw-normal mb-0">
                              Jhon send you a message
                            </h6>
                            <small>15 minutes ago</small>
                          </div>
                        </div>
                      </a>
                      <hr className="dropdown-divider" />
                      <a href="#" className="dropdown-item text-center">
                        See all message
                      </a>
                    </div>
                  </div>
                  <div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <i class="fa fa-low-vision" aria-hidden="true"></i>
                      <span className="d-none d-lg-inline-flex">Visitors</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                      <a href="#" class="dropdown-item">
                        <h6 className="fw-normal mb-0">Profile updated</h6>
                        <small>15 minutes ago</small>
                      </a>
                      <hr className="dropdown-divider" />
                      <a href="#" class="dropdown-item">
                        <h6 className="fw-normal mb-0">New user added</h6>
                        <small>15 minutes ago</small>
                      </a>
                      <hr className="dropdown-divider" />
                      <a href="#" class="dropdown-item">
                        <h6 className="fw-normal mb-0">Password changed</h6>
                        <small>15 minutes ago</small>
                      </a>
                      <hr className="dropdown-divider" />
                      <a href="#" className="dropdown-item text-center">
                        See all notifications
                      </a>
                    </div>
                  </div>
                  <div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <img
                        className="rounded-circle me-lg-2"
                        src="img/user.jpg"
                        alt=""
                        style={{ width: "40px", height: "40px" }}
                      />
                      <span className="d-none d-lg-inline-flex">John Doe</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                      <a href="#" className="dropdown-item">
                        My Profile
                      </a>
                      <a href="#" className="dropdown-item">
                        Settings
                      </a>
                      <a href="#" className="dropdown-item">
                        Log Out
                      </a>
                    </div>
                  </div>
                </div>
              </nav>
              {/* <!-- Navbar End --> */}
            </div>

            {/* <!-- Content End --> */}
          </div>
        )}
      </div>
    </>
  );
}
