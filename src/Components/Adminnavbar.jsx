import React from 'react';

const Adminnavbar = () => {
  return (
    <div>
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <div className="d-flex justify-content-end align-items-center"> {/* Align items vertically */}
            <a className="navbar-brand text-light" href="#"><b>JOB CRACKER</b></a>
            
            {/* ON CAMPUS Section */}
            <div className="dropdown d-flex align-items-center mx-3"> {/* Adds space and flex properties */}
              <a
                className="navbar-brand text-light dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLinkOnCampus"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ON CAMPUS
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLinkOnCampus">
                <li><a className="dropdown-item" href="/AddJob">Add Job</a></li>
                <li><a className="dropdown-item" href="/jobs">View Registrations</a></li>
              </ul>
            </div>

            {/* OFF CAMPUS */}
            <a className="navbar-brand text-light mx-3" href="/Addoffcampus">ADD OFFCAMPUS</a>

            {/* Mock Interview */}
            <a className="navbar-brand text-light mx-3" href="/AdminRoomhome">MOCK INTERVIEW</a>

            {/* Aptitude Test Dropdown */}
            <div className="dropdown d-flex align-items-center mx-3">
              <a
                className="navbar-brand text-light dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLinkAptitude"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                APTITUDE TEST
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLinkAptitude">
                <li><a className="dropdown-item" href="/addquestions">Add Aptitude Questions</a></li>
                <li><a className="dropdown-item" href="/weeklist">Aptitude Attendance</a></li>
              </ul>
            </div>

            {/* CODING TEST Section */}
            <div className="dropdown d-flex align-items-center mx-3"> {/* Coding Test as a dropdown */}
              <a
                className="navbar-brand text-light dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLinkCoding"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                CODING TEST
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLinkCoding">
                <li><a className="dropdown-item" href="/Codingq">Add Coding Questions</a></li>
                <li><a className="dropdown-item" href="/submissionweeks">Coding Attendance</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Adminnavbar;
