import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Usernavbar1 from './Usernavbar1';


const Ucompilers = () => {
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState(null);
    const userId = sessionStorage.getItem("userId"); // Retrieve userId from sessionStorage

    const fetchCompilerSubmissions = async () => {
        try {
            const response = await axios.get(`http://localhost:3030/api/compiler-submissionsss`, {
                headers: {
                    'User-ID': userId, // Add userId to headers if necessary
                }
            });

            if (response.data.status === "success") {
                setSubmissions(response.data.submissions);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching compiler submissions:", error);
            setError("No Submissions Found.");
        }
    };

    useEffect(() => {
        fetchCompilerSubmissions(); // Call the fetch function when the component mounts
    }, []);

    // Inline CSS styles
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center', // Center the table horizontally
            alignItems: 'center',
            flexDirection: 'column',
            margin: '20px auto', // Center the entire container
        },
        table: {
            width: '80%', // Adjust width of the table
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            border: '1px solid #ddd',
            padding: '12px', // Increased padding for header
            textAlign: 'left',
            backgroundColor: '#007bff', // Blue background for the heading
            color: 'white', // White text color for the heading
        },
        td: {
            border: '1px solid #ddd',
            padding: '12px', // Increased padding for cells
            textAlign: 'left',
        },
        evenRow: {
            backgroundColor: '#f2f2f2', // Light gray for even rows
        },
        hoverRow: {
            backgroundColor: '#ddd', // Highlight row on hover
        },
        error: {
            color: 'red',
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
                <h1>SUBMISSION HISTORY</h1>
                {error && <p style={styles.error}>{error}</p>}
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Week</th>
                            <th style={styles.th}>Submission Date</th>
                            <th style={styles.th}>Test Cases</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission, index) => (
                            <tr key={submission._id} style={index % 2 === 0 ? styles.evenRow : {}}>
                                <td style={styles.td}>{submission.week}</td>
                                <td style={styles.td}>{new Date(submission.submissionDate).toLocaleString()}</td>
                                <td style={styles.td}>{submission.passedCount} / {submission.totalTestCases}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ucompilers;
