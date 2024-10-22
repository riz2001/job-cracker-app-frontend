import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';

// CSS Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center'
  },
  tableContainer: {
    overflowX: 'auto',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  th: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  formContainer: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  formInput: {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  formButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  cancelButton: {
    backgroundColor: 'red',
    marginLeft: '10px',
  },
  noUsers: {
    color: 'red',
    marginTop: '20px',
    textAlign: 'center',
  },
  filterContainer: {
    marginBottom: '20px',
  },
  filterLabel: {
    marginRight: '10px',
  },
  select: {
    padding: '10px',
    margin: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
};

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [slotData, setSlotData] = useState({ timeSlot: '', date: '', meetingLink: '' });
  const [courseYearFilter, setCourseYearFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/userss');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching users.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddSlot = (user) => {
    setSelectedUser(user);
  };

  const handleSlotChange = (e) => {
    const { name, value } = e.target;
    setSlotData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitSlot = async (e) => {
    e.preventDefault();

    if (!slotData.timeSlot || !slotData.date || !slotData.meetingLink) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3030/api/addtimeslot', {
        userId: selectedUser._id,
        timeSlot: slotData.timeSlot,
        date: slotData.date,
        meetingLink: slotData.meetingLink,
      });

      alert(response.data.message);
      setSelectedUser(null);
      setSlotData({ timeSlot: '', date: '', meetingLink: '' });
    } catch (error) {
      console.error('Error adding time slot:', error);
      alert(error.response.data.message || 'Error adding time slot');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getMonthYearString = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}-${month < 9 ? '0' + (month + 1) : month + 1}`;
  };

  const groupSlotsByMonth = (timeSlots) => {
    const slotsByMonth = {};
    timeSlots.forEach(slot => {
      const date = new Date(slot.date);
      const monthYear = getMonthYearString(date);
      if (!slotsByMonth[monthYear]) {
        slotsByMonth[monthYear] = [];
      }
      slotsByMonth[monthYear].push(slot);
    });
    return slotsByMonth;
  };

  const courseYears = Array.from(new Set(users.map(user => user.courseYear)));
  const allMonths = Array.from(new Set(users.flatMap(user => 
    Object.keys(groupSlotsByMonth(user.timeSlots))
  )));

  const getMonthName = (monthKey) => {
    const monthIndex = parseInt(monthKey.split('-')[1], 10) - 1;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[monthIndex];
  };

  // Updated filtering logic to ensure users with no slots are included
  const filteredUsers = users.filter(user => {
    const matchesCourseYear = courseYearFilter ? user.courseYear === courseYearFilter : true;
    return matchesCourseYear; // Include users based on course year only
  }).sort((a, b) => a.rollno - b.rollno); // Sort by roll number in ascending order

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  

  return (
    <div>
      <Adminnavbar />
      <div style={styles.container}>
        <h2 style={styles.title}>ADD TIME SLOT</h2>
        
        {/* Filter Section */}
        <div style={styles.filterContainer}>
          <label style={styles.filterLabel} htmlFor="courseYearFilter">Filter by Course Year:</label>
          <select
            id="courseYearFilter"
            value={courseYearFilter}
            onChange={(e) => setCourseYearFilter(e.target.value)}
            style={styles.select}
          >
            <option value="">All</option>
            {courseYears.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>

          <label style={styles.filterLabel} htmlFor="monthFilter">Filter by Month:</label>
          <select
            id="monthFilter"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            style={styles.select}
          >
            <option value="">All</option>
            {allMonths.map((month, index) => (
              <option key={index} value={month}>{getMonthName(month)} {month.split('-')[0]}</option>
            ))}
          </select>
        </div>

        {/* Display number of filtered users */}
        <div style={styles.title}>
          {filteredUsers.length} {filteredUsers.length === 1 ? 'User' : 'Users'} Found
        </div>

        <div style={styles.tableContainer}>
          {filteredUsers.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                <th style={styles.th}>Roll No</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Admission No</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Course Year</th>
                 
                  {monthFilter && <th style={styles.th}>Time Slots for {monthFilter}</th>}
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const slotsByMonth = groupSlotsByMonth(user.timeSlots);
                  return (
                    <tr key={user._id}>
                        <td style={styles.td}>{user.rollno}</td>
                      <td style={styles.td}>{user.name}</td>
                      <td style={styles.td}>{user.admissionno}</td>
                      <td style={styles.td}>{user.email}</td>
                      <td style={styles.td}>{user.courseYear}</td>
                    
                      {monthFilter && (
                      <td style={styles.td}>
                      {slotsByMonth[monthFilter] && slotsByMonth[monthFilter].length > 0
                        ? slotsByMonth[monthFilter].map((slot, index) => (
                          <div key={index}>
                            {slot.timeSlot} - {formatDate(slot.date)} {/* Format the date here */}
                          </div>
                        ))
                        : 'No slots available'}
                    </td>
                      )}
                      <td style={styles.td}>
                        <button
                          style={styles.button}
                          onClick={() => handleAddSlot(user)}
                        >
                          Add Time Slot
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={styles.noUsers}>No users found.</div>
          )}
        </div>

        {/* Add Slot Form */}
        {selectedUser && (
         <div style={{ ...styles.formContainer, width: '400px', margin: '0 auto' }}>
         <h3>Add Time Slot for {selectedUser.name}</h3>
         <form onSubmit={handleSubmitSlot}>
           <input
             type="text"
             name="timeSlot"
             placeholder="Time Slot"
             value={slotData.timeSlot}
             onChange={handleSlotChange}
             style={styles.formInput}
           />
           <input
             type="date"
             name="date"
             value={slotData.date}
             onChange={handleSlotChange}
             style={styles.formInput}
           />
           <input
             type="text"
             name="meetingLink"
             placeholder="Meeting Link"
             value={slotData.meetingLink}
             onChange={handleSlotChange}
             style={styles.formInput}
           />
           <button type="submit" style={styles.formButton}>Submit</button>
           <button
             type="button"
             onClick={() => setSelectedUser(null)}
             style={{ ...styles.formButton, ...styles.cancelButton }}
           >
             Cancel
           </button>
         </form>
       </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
