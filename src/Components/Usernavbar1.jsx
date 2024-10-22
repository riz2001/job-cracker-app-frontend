import React from 'react';
import { useNavigate } from 'react-router-dom';

const Usernavbar1 = () => {
  const navigate = useNavigate();

  // Styles for navbar items
  const styles = {
    navItem: {
      marginLeft: '10px',  // Add space between each item
      paddingTop: '0px',   // Align with other links
      paddingBottom: '0px' // Consistent padding for uniform height
    },
    signOutButton: {
      marginLeft: 'auto'   // Push the signout button to the right
    }
  };

  // Function to handle room creation and navigate
  const handleCreateRoom = () => {
    const roomId = Date.now();  // Generate unique room ID
    navigate(`/room/${roomId}`);  // Navigate to the room with generated ID
  };

  // Function to handle signout
  const handleSignOut = () => {
    // Clear token and other session-related items
    sessionStorage.removeItem("token"); 
    sessionStorage.removeItem("userId"); 
    sessionStorage.clear();  // Optionally clear all session data

    // Redirect to the sign-in page
    navigate("/");
  };

  return (
    <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="d-flex justify-content-end align-items-center"> {/* Align items to the end (right) and center vertically */}
          <a className="navbar-brand text-light" href="#"><b>JOB CRACKER</b></a>
          <li></li>
          <li></li>
          <a className="navbar-brand text-light" href="/dashboard">DASHBOARD</a>
          

          {/* VIEW JOBS */}
          <a className="navbar-brand text-light" href="/ViewJobs">VIEW JOBS</a>

          {/* VIEW OFFCAMPUS */}
          <a className="navbar-brand text-light" href="/Soffcampus">VIEW OFFCAMPUS</a>

          {/* INTERVIEW DROPDOWN */}
          <div className="dropdown">
            <a className="navbar-brand dropdown-toggle text-light" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={styles.navItem}>
              INTERVIEW
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a className="dropdown-item" onClick={handleCreateRoom}>MOCK INTERVIEW</a></li>  {/* Call handleCreateRoom when clicked */}
              <li><a className="dropdown-item" href="/user/timeslots">SLOT BOOKING</a></li>
            </ul>
          </div>

          {/* APTITUDE DROPDOWN */}
          <div className="dropdown">
            <a className="navbar-brand dropdown-toggle text-light" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={styles.navItem}>
              APTITUDE
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a className="dropdown-item" href="/weekreview">APTITUDE TEST</a></li>
              <li><a className="dropdown-item" href="/Qusers">APTITUDE ATTENDANCE</a></li>
            </ul>
          </div>

          {/* CODING DROPDOWN */}
          <div className="dropdown">
            <a className="navbar-brand dropdown-toggle text-light" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={styles.navItem}>
              CODING
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a className="dropdown-item" href="Cweeks">CODING TEST</a></li>
              <li><a className="dropdown-item" href="/Ucompilers">CODING ATTENDANCE</a></li>
            </ul>
          </div>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
       <li></li>
      
       


       

          {/* SIGNOUT BUTTON */}
          <div style={styles.signOutButton}>
            <button onClick={handleSignOut} className="btn btn-danger">
              Sign Out
            </button>
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      
    </nav>
  );
};

export default Usernavbar1;
