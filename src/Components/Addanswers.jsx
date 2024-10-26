import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';

function AddAnswers() {
    const [weeks, setWeeks] = useState([]); // Initialize weeks as an empty array
    const [selectedWeek, setSelectedWeek] = useState('');
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [code, setCode] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch available weeks that have questions
    useEffect(() => {
        const fetchAvailableWeeks = async () => {
            try {
                const response = await axios.get('http://localhost:3030/api/compiler/weeks'); // Adjust the endpoint as needed
                setWeeks(response.data); // Set available weeks
            } catch (err) {
                console.error('Error fetching weeks:', err);
                setError('Error fetching weeks. Please try again.');
            }
        };

        fetchAvailableWeeks();
    }, []);

    // Fetch questions based on selected week
    useEffect(() => {
        const fetchQuestions = async () => {
            if (selectedWeek) {
                try {
                    const response = await axios.get(`http://localhost:3030/api/questions/week/${selectedWeek}`);
                    setQuestions(response.data);
                } catch (err) {
                    console.error('Error fetching questions:', err);
                    setError('Error fetching questions. Please try again.');
                }
            } else {
                setQuestions([]);
            }
        };

        fetchQuestions();
    }, [selectedWeek]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedQuestion || !code) {
            setError('Please select a question and enter your code.');
            return;
        }

        try {
            await axios.post('http://localhost:3030/api/compiler/save', {
                week: selectedWeek,
                questionId: selectedQuestion,
                code,
            });
            alert('Question and code saved successfully!'); // Display alert
            setSuccessMessage(''); // Reset success message
            setSelectedQuestion(null);
            setCode('');
            setError(null);
        } catch (err) {
            console.error('Error saving question:', err);
            setError('Error saving question. Please try again.');
        }
    };

    return (
        <div>
            <Adminnavbar/>
       
        <div style={styles.container}>
            <h2><center>ADD ANSWERS</center></h2>
            <div style={styles.formGroup}>
                <label>Select Week:</label>
                <select style={styles.weekSelector} value={selectedWeek} onChange={(e) => setSelectedWeek(e.target.value)}>
                    <option value="">--Select Week--</option>
                    {weeks.map((weekNum) => (
                        <option key={weekNum} value={weekNum}>{`Week ${weekNum}`}</option>
                    ))}
                </select>
            </div>
            {questions.length > 0 ? (
                <div style={styles.questionsList}>
                    <h3>Select a Question:</h3>
                    <div style={styles.questionsContainer}>
                        {questions.map((question) => (
                            <div
                                key={question._id}
                                onClick={() => setSelectedQuestion(question._id)}
                                style={{
                                    ...styles.questionItem,
                                    backgroundColor: selectedQuestion === question._id ? '#e0e0e0' : '#fff',
                                }}
                            >
                                {question.title}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No questions available for this week.</p>
            )}
            <form onSubmit={handleSubmit} style={styles.answerForm}>
                <div style={styles.formGroup}>
                    <label>Code:</label>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        style={styles.codeInput}
                    />
                </div>
                {error && <p style={styles.errorMessage}>{error}</p>}
                {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
                <button type="submit" style={styles.submitButton}>Save Answer</button>
            </form>
        </div>
        </div>
    );
}

// Styles as a JavaScript object
const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px', // Increased maxWidth for larger card view
        margin: 'auto',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
        marginBottom: '20px',
    },
    weekSelector: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff',
    },
    questionsList: {
        margin: '10px 0',
    },
    questionsContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    questionItem: {
        padding: '10px',
        margin: '5px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    errorMessage: {
        color: 'red',
    },
    successMessage: {
        color: 'green',
        textAlign: 'center',
    },
    answerForm: {
        display: 'flex',
        flexDirection: 'column',
    },
    codeInput: {
        width: '100%',
        height: '200px', // Increased height for the textarea
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginTop: '5px',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        padding: '10px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
};

export default AddAnswers;
