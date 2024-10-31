import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';

const styles = {
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the top of the container
    minHeight: '100vh', // Full viewport height
    backgroundColor: '#f7f9fc', // Light background for the main page
    paddingTop: '20px', // Add padding at the top
  },
  container: {
    padding: '30px',
    backgroundColor: '#ffffff', // White background for the content
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '90%', // Increased width for responsiveness
    maxWidth: '900px', // Increased max width for larger screens
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
    fontWeight: 'bold', // Bold text
    textAlign: 'center', // Centered text
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#666',
    textAlign: 'center', // Centered text
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    border: '1px solid #ddd',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  monthButton: {
    padding: '8px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  monthButtonHover: {
    backgroundColor: '#c82333',
  },
};

const getMonthName = (monthNum) => {
  const date = new Date();
  date.setMonth(monthNum - 1);
  return date.toLocaleString('default', { month: 'long' });
};

const DeleteMonth = () => {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/months');
        setMonths(response.data);
      } catch (error) {
        console.error('Error fetching months:', error);
      }
    };

    fetchMonths();
  }, []);

  const deleteTimeSlots = async (year, month) => {
    const confirmation = window.confirm(`Are you sure you want to delete all time slots for ${getMonthName(month)}-${year}?`);
    if (!confirmation) return;

    try {
      const response = await axios.delete(`http://localhost:3030/api/timeslots/${year}/${month}`);
      alert(response.data.message);
      setMonths(months.filter((m) => m !== `${year}-${month}`));
    } catch (error) {
      console.error('Error deleting time slots:', error);
      alert('Failed to delete time slots. Please try again.');
    }
  };

  return (
    <div>
      <Adminnavbar/>
    <div style={styles.mainContainer}>
      <div style={styles.container}>
        <h2 style={styles.title}>Delete Monthly Time Slots</h2>
        <p style={styles.subtitle}>Select a month below to delete all associated time slots.</p>
        {months.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Year</th>
                <th style={styles.th}>Month</th>
                <th style={styles.th}>Delete Time Slot</th>
              </tr>
            </thead>
            <tbody>
              {months.map((month) => {
                const [year, monthNum] = month.split('-');
                const monthName = getMonthName(monthNum);
                return (
                  <tr key={month}>
                    <td style={styles.td}>{year}</td>
                    <td style={styles.td}>{monthName}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.monthButton}
                        onClick={() => deleteTimeSlots(year, monthNum)}
                      >
                        Delete Time Slots
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No months available.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default DeleteMonth;
