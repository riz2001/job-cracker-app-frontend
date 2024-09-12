import React from 'react'

const Adminnavbar = () => {
  return (
    <div>
         <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <div className="d-flex justify-content-end"> {/* Align items to the end (right) */}
          <a className="navbar-brand text-light" href="#"><b>JOB CRACKER</b></a>
          <a className="navbar-brand text-light" href="#"></a>
          <a className="navbar-brand text-light" href="/AddJob">ADD JOB</a>
          <a className="navbar-brand text-light" href="#"></a>
          <a className="navbar-brand text-light" href="/ViewRegistrations">VIEW REGISTRATION</a>
          <a className="navbar-brand text-light" href="#"></a>
          <a className="navbar-brand text-light" href="/AdminRoomhome">MOCK INTERVIEW</a>
     
        </div>
      </div>
    </nav>

        </div>
  )
}

export default Adminnavbar