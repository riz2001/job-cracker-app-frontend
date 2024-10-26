import React from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate

const Adminnavbar = () => { // Correct the component declaration
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCreateRoom = () => {
    const roomId = Date.now(); // Create a new room ID
    navigate(`/Adminroom/${roomId}`); // Navigate to the new Admin room
  };

  const handleSignOut = () => {
    // Clear token and other session-related items
    sessionStorage.removeItem("token"); 
    sessionStorage.removeItem("userId"); 
    sessionStorage.clear(); // Optionally clear all session data

    // Redirect to the sign-in page
    navigate("/AdminSignIn"); // Navigate to the sign-in page
  };

  return (
    <div>
      <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <div className="d-flex justify-content-end align-items-center"> {/* Align items vertically */}
            <a className="navbar-brand text-light" href="#"><b>JOB CRACKER</b></a>

            {/* APPROVE USERS Section */}
            <a className="navbar-brand text-light mx-3" href="/approve">APPROVE USERS</a>

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

            {/* INTERVIEW Section */}
            <div className="dropdown d-flex align-items-center mx-3"> {/* Interview as a dropdown */}
              <a
                className="navbar-brand text-light dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLinkInterview"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                INTERVIEW
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLinkInterview">
                <li>
                  <a 
                    className="dropdown-item" 
                    href="#" // Set href to "#" to prevent default navigation
                    onClick={handleCreateRoom} // Call the function here
                  >
                    MOCK INTERVIEW
                  </a>
                </li>
                <li><a className="dropdown-item" href="/userlist">ADD TIME SLOT</a></li>
                <li><a className="dropdown-item" href="/monthpage">REVIEW</a></li>
              </ul>
            </div>

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
                <li><a className="dropdown-item" href="/aanswer">Add Solutions</a></li>
                <li><a className="dropdown-item" href="/scoretable">Result</a></li>
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
                <li><a className="dropdown-item" href="/pasttestcases">Add Solutions</a></li>
                <li><a className="dropdown-item" href="/Fourweek">Result</a></li>
              </ul>
            </div>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          

            {/* SIGNOUT BUTTON */}
            <button onClick={handleSignOut} className="btn btn-danger mx-3">
              Sign Out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Adminnavbar;
