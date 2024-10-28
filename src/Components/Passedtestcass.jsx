import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Adminnavbar from './Adminnavbar';

function Passedtestcass() {
    const [week, setWeek] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const [weeks, setWeeks] = useState([]); // Store available weeks
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // For page navigation

    // Fetch available weeks on component mount
    useEffect(() => {
        const fetchWeeks = async () => {
            try {
                const res = await axios.get('http://localhost:3030/api/compiler/weeks');
                setWeeks(res.data); // Store weeks
            } catch (err) {
                console.error('Error fetching weeks:', err);
                setError('Error fetching weeks. Please try again.');
            }
        };

        fetchWeeks();
    }, []);

    // Clear submissions when the week changes
    useEffect(() => {
        setSubmissions([]); // Clear previous submissions
    }, [week]);

    const handleWeekChange = (e) => {
        setWeek(e.target.value);
    };

    const fetchPassedCodes = async () => {
        if (!week) {
            setError('Please select a week.');
            return;
        }

        setLoading(true);
        setError(null); // Reset error before fetching

        try {
            const res = await axios.get(`http://localhost:3030/api/compiler/week/${week}`);
            setSubmissions(res.data);
        } catch (err) {
            console.error('Error fetching passed codes:', err);
            setError('No Code Available.');
        } finally {
            setLoading(false);
        }
    };

    const saveToDatabase = async (submission) => {
        try {
            await axios.post('http://localhost:3030/api/compiler/save', {
                week,
                questionId: submission.questionId._id,
                code: submission.code,
                passedCount: submission.passedCount,
                totalTestCases: submission.totalTestCases,
                questionTitle: submission.questionTitle,
            });
            alert('Data saved successfully');
        } catch (err) {
            console.error('Error saving data:', err);
            alert('No Code Available.');
        }
    };

    // Navigate to the Add Answers page
    const handleAddAnswers = () => {
        navigate('/addanswers');
    };

    return (
        <div>
            <Adminnavbar/>

            <div style={styles.container}>
                <h2 style={styles.header}><center><b>SUBMIT SOLUTIONS</b></center></h2> {/* Centered heading */}
                
                <div style={styles.weekSelector}>
                    <label>Select Week:</label>
                    <select value={week} onChange={handleWeekChange} style={styles.select}>
                        <option value="">--Select Week--</option>
                        {weeks.map((weekNum) => (
                            <option key={weekNum} value={weekNum}>{`Week ${weekNum}`}</option>
                        ))}
                    </select>
                    
                    <button onClick={fetchPassedCodes} style={styles.button} disabled={loading}>
                        {loading ? 'Loading...' : 'Fetch Passed Codes'}
                    </button>
                    {/* Add Answers button placed in the same row */}
                    <button onClick={handleAddAnswers} style={{ ...styles.button, marginLeft: '10px' }}>
                        Add Answers
                    </button>
                </div>
                
                <div style={styles.header}>
                    {/* Display question title only if submissions are available */}
                    {submissions.length > 0 && (
                        <h3 style={styles.questionTitle}>{submissions[0].questionId.title}</h3>
                    )}
                </div>

                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.submissionsList}>
                    {submissions.length > 0 ? (
                        submissions.map((submission) => (
                            <div key={submission._id} style={styles.submissionItem}>
                                <p><strong>Code:</strong></p>
                                <pre style={styles.code}>{submission.code}</pre>
                                <button onClick={() => saveToDatabase(submission)} style={styles.button}>
                                    Save to Database
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No submissions available.</p> // Providing a message if no submissions exist
                    )}
                </div>
            </div>
        </div>
    );
}

export default Passedtestcass;

const styles = {
    container: {
        width: '80%',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center', // Center the header text
        marginBottom: '20px',
    },
    questionTitle: {
        textAlign: 'left', // Align question title to the left
        marginBottom: '10px',
    },
    weekSelector: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    select: {
        marginRight: '10px',
        padding: '8px',
        fontSize: '16px',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    submissionsList: {
        marginTop: '20px',
    },
    submissionItem: {
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Increased shadow for better card effect
        border: '2px solid #007bff', // Thicker border for card view
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: '10px',
    },
    code: {
        backgroundColor: '#f1f1f1',
        padding: '10px',
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
    },
};
