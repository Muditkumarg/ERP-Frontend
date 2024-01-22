import React from "react";

export default function FooterPage() {
  return (
    <>
      {/* Footer Start */}
      <div className="container-fluid pt-4 px-4">
        <div className="row">
          <div className="col-12 col-sm-6 text-center text-sm-start">
            &copy; <a href="#">Your Site Name</a>, All Right Reserved.
          </div>
          <div className="col-12 col-sm-6 text-center text-sm-end">
            Designed By <a href="#">AVM Technologies</a>
            <br />
            Distributed By:{" "}
            <a href="https://themewagon.com" target="_blank">
              ThemeWagon
            </a>
          </div>
        </div>
      </div>
      {/* Footer End */}
    </>
  );
}
