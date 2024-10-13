import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Adminnavbar from './Adminnavbar';

const JobRegistrations = () => {
  const { jobId } = useParams(); // Get jobId from the URL
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3030/jobs/${jobId}/registrations`)
      .then(response => {
        if (response.data.status === 'success') {
          setRegistrations(response.data.registrations);
        } else {
          setError('Error fetching registrations');
        }
      })
      .catch(error => {
        console.error(error);
        setError('Error fetching registrations');
      });
  }, [jobId]);

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!registrations.length) {
    return <div style={styles.noRegistrations}>No registrations available for this job.</div>;
  }

  return (
    <div>
      <Adminnavbar />
      <div style={styles.registrationsContainer}>
        <h2 style={styles.title}>Users Registered for Job</h2>
        <table style={styles.registrationsTable}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Admission Number</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Applied At</th> {/* New column for applied time */}
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <tr key={index} style={{ ...styles.tr, ...(index % 2 === 0 ? styles.trEven : {}) }} 
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e0f7fa'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}>
                <td style={styles.td}>{reg.user_id.name}</td>
                <td style={styles.td}>{reg.user_id.admissionno}</td>
                <td style={styles.td}>{reg.user_id.email}</td>
                <td style={styles.td}>{new Date(reg.applied_at).toLocaleString()}</td> {/* Format the applied_at timestamp */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles directly in the component for single-file use
const styles = {
  registrationsContainer: {
    maxWidth: '90%',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#007bff', // Blue color for title
    marginBottom: '20px',
  },
  noRegistrations: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#FF5722',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: '1.2rem',
    margin: '20px 0',
  },
  registrationsTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#007bff', // Blue background for header
    color: 'white',
    textTransform: 'uppercase',
  },
  td: {
    padding: '12px',
    textAlign: 'left',
    fontSize: '1rem',
    color: '#333',
  },
  tr: {
    backgroundColor: 'white',
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.2s ease',
  },
  trEven: {
    backgroundColor: '#f2f2f2',
  },
};

export default JobRegistrations;
