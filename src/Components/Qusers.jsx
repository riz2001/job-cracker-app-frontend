import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Usernavbar1 from './Usernavbar1';

const Qusers = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem("userId"); // Retrieve userId from sessionStorage

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(`http://localhost:3030/api/submissionsss`, {
        headers: {
          'User-ID': userId, // Add userId to headers
        }
      });

      if (response.data.status === "success") {
        setSubmissions(response.data.submissions);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setError("No submissions Found.");
    }
  };

  useEffect(() => {
    fetchSubmissions(); // Call the fetch function when the component mounts
  }, []);

  // Inline CSS styles
  const styles = {
    container: {
      display: 'flex',
      width:'1300px',
      justifyContent: 'center', // Center the table horizontally
      alignItems: 'center',
      flexDirection: 'column',
      margin: '20px auto', // Center the entire container
      backgroundColor: '#ffffff', // White background for content area
      padding: '20px',
      borderRadius: '10px', // Rounded corners for container
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', // Subtle shadow for the container
    },
    heading: {
      color: '#333333',
      fontSize: '24px',
      marginBottom: '20px',
    },
    table: {
      width: '100%', // Full width of the container
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      border: '1px solid #ddd',
      padding: '12px', // Adjusted padding for header cells
      textAlign: 'left',
      backgroundColor: '#007bff', // Blue background for the heading
      color: 'white', // White text color for the heading
      fontSize: '16px',
    },
    td: {
      border: '1px solid #ddd',
      padding: '10px', // Adjusted padding for data cells
      textAlign: 'left',
      fontSize: '14px',
    },
    evenRow: {
      backgroundColor: '#f9f9f9', // Slightly lighter gray for even rows
    },
    hoverRow: {
      cursor: 'pointer',
      transition: 'background-color 0.3s', // Smooth transition for hover effect
    },
    error: {
      color: 'red',
      marginBottom: '20px',
    },
  };

  return (
    <div>
      {/* Add inline style for body */}
      <style>
        {`
          body {
            background-color: #f0f2f5; /* Light gray background for the whole page */
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }
        `}
      </style>
      
      <Usernavbar1 />
      <div style={styles.container}>
        <h1 style={styles.heading}>Submission History</h1>
        {error && <p style={styles.error}>{error}</p>}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Week</th>
              <th style={styles.th}>Score</th>
              <th style={styles.th}>Submission Time</th> {/* Last Column */}
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr 
                key={submission._id} 
                style={{
                  ...styles.hoverRow, 
                  ...(index % 2 === 0 ? styles.evenRow : {}),
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e8f4ff')} // Hover effect
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f9f9f9' : '#fff')}
              >
                <td style={styles.td}>{submission.week}</td>
                <td style={styles.td}>{submission.score}</td>
                <td style={styles.td}>{new Date(submission.submissionTime).toLocaleString()}</td> {/* Last Column */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Qusers;
