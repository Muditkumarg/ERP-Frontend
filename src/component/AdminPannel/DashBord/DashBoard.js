import React, { useEffect } from "react";
import "../AdminPannel.css";
import NavSidePage from "../NavBar.js/NavBar";
import { useState } from "react";
import FooterPage from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function DashboardPage() {
  const location = useLocation();
  const dropdownItemActive = location.state;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  console.log(dropdownItemActive);

  const chooseMessage = (message) => {
    setSidebarOpen(message);
  };

  // const verifyToken = () => {
  //   const token = localStorage.getItem("token");

  //   const config = {
  //     headers: {
  //       Authorization: token,
  //     },
  //   };
  //   axios.post("http://localhost:5000/token-verify", config).then((res) => {
  //     const { message, success } = res.data;
  //     if (success) {
  //     } else {
  //     }
  //   });
  // };

  // useEffect(() => {
  //   verifyToken();
  // }, []);

  return (
    <>
      <NavSidePage
        chooseMessage={chooseMessage}
        dropdownItemActive={dropdownItemActive}
      />
      <div className={`content ${sidebarOpen ? "open" : ""}`}>
        {/* <!-- Sale & Revenue Start --> */}
        <div class="mainContainer container-fluid px-4">
          <div class="row g-4">
            <div class="col-sm-6 col-xl-3">
              <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-line fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Current Total Strength</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-bar fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">New Admission's</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-area fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">No. of Enquiry</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-pie fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Prospectus</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-sticky-note fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Written Test</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-check-square fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Approved</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-birthday-cake fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Todays's Birthday</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-ban fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Cancelled Admission</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-list fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">NSO List</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-bus fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Student's Using Trans..</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-certificate fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Transfer Certificate's</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-database fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Total Users</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-bell fa-3x text-primary"></i>
                <div class="ms-3">
                  <p class="mb-2">Global SMS Alerts</p>
                  <h6 class="mb-0">$1234</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Sale & Revenue End --> */}

        {/* <!-- Sales Chart Start --> */}
        <div class="container-fluid pt-4 px-4">
          <div class="row g-4">
            <div class="col-sm-12 col-xl-6">
              <div class="bg-secondary text-center rounded p-4">
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <h6 class="mb-0">Worldwide Sales</h6>
                  <a href="">Show All</a>
                </div>
                <canvas id="worldwide-sales"></canvas>
              </div>
            </div>
            <div class="col-sm-12 col-xl-6">
              <div class="bg-secondary text-center rounded p-4">
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <h6 class="mb-0">Salse & Revenue</h6>
                  <a href="">Show All</a>
                </div>
                <canvas id="salse-revenue"></canvas>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Sales Chart End --> */}
        {/* <!-- Recent Sales Start --> */}
        <div class="container-fluid pt-4 px-4">
          <div class="bg-secondary text-center rounded p-4">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <h6 class="mb-0">Recent Salse</h6>
              <a href="">Show All</a>
            </div>
            <div class="table-responsive">
              <table class="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr class="text-white">
                    <th scope="col">
                      <input class="form-check-input" type="checkbox" />
                    </th>
                    <th scope="col">Date</th>
                    <th scope="col">Invoice</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input class="form-check-input" type="checkbox" />
                    </td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td>
                      <a class="btn btn-sm btn-primary" href="">
                        Detail
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input class="form-check-input" type="checkbox" />
                    </td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td>
                      <a class="btn btn-sm btn-primary" href="">
                        Detail
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input class="form-check-input" type="checkbox" />
                    </td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td>
                      <a class="btn btn-sm btn-primary" href="">
                        Detail
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input class="form-check-input" type="checkbox" />
                    </td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td>
                      <a class="btn btn-sm btn-primary" href="">
                        Detail
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input class="form-check-input" type="checkbox" />
                    </td>
                    <td>01 Jan 2045</td>
                    <td>INV-0123</td>
                    <td>Jhon Doe</td>
                    <td>$123</td>
                    <td>Paid</td>
                    <td>
                      <a class="btn btn-sm btn-primary" href="">
                        Detail
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* <!-- Recent Sales End --> */}
        <FooterPage />
      </div>
    </>
  );
}
