import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';

const Codingupdate = () => {
    const [selectedWeek, setSelectedWeek] = useState(''); // State to store the selected week number
    const [questions, setQuestions] = useState([]); // State to store questions for the selected week
    const [loading, setLoading] = useState(false); // State to manage loading status
    const [successMessage, setSuccessMessage] = useState(''); // State to manage success messages

    // Fetch questions when a week is selected
    const handleWeekChange = (e) => {
        setSelectedWeek(e.target.value);
        if (e.target.value) {
            fetchWeeklyData(e.target.value); // Fetch data for the selected week
        }
    };

    // Fetch data for the selected week
    const fetchWeeklyData = (week) => {
        setLoading(true); // Set loading to true
        axios.get(`http://localhost:3030/api/cquestionss?week=${week}`)
            .then(response => {
                setQuestions(response.data); // Set the questions from the response
                setLoading(false); // Set loading to false
            })
            .catch(error => {
                console.error('Error fetching weekly data:', error);
                setLoading(false); // Set loading to false on error
            });
    };

    // Handle change in input fields for editing
    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedQuestions = [...questions];
        updatedQuestions[index] = { ...updatedQuestions[index], [name]: value }; // Update specific question
        setQuestions(updatedQuestions); // Update state with the modified questions
    };

    // Handle change in test case inputs
    const handleTestCaseChange = (questionIndex, testCaseIndex, e) => {
        const { name, value } = e.target;
        const updatedQuestions = [...questions];
        const updatedTestCases = [...updatedQuestions[questionIndex].testCases];
        updatedTestCases[testCaseIndex] = {
            ...updatedTestCases[testCaseIndex],
            [name]: value,
        };
        updatedQuestions[questionIndex].testCases = updatedTestCases;
        setQuestions(updatedQuestions); // Update state with the modified questions
    };

    // Add a new test case
    const addTestCase = (index) => {
        const newTestCase = { input: '', expectedOutput: '' };
        const updatedQuestions = [...questions];
        updatedQuestions[index].testCases.push(newTestCase); // Add new test case to the specific question
        setQuestions(updatedQuestions); // Update state with the modified questions
    };

    // Update the question in the database
    const updateQuestion = (questionId, index) => {
        const questionToUpdate = questions[index];
        axios.put(`http://localhost:3030/api/cquestionss/${questionId}`, questionToUpdate)
            .then(() => {
                // Fetch updated data after the update
                fetchWeeklyData(selectedWeek);
                setSuccessMessage('Question updated successfully!');
                alert('Question updated successfully!') // Set success message
                setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
            })
            .catch(error => {
                console.error('Error updating question:', error);
            });
    };

    return (
        <div>
            <Adminnavbar />
            <div className="update-container" style={styles.container}>
                <h1 className="form-title" style={styles.title}>Update Coding Questions</h1>
                
                {/* Week Selection */}
                <div className="week-selection" style={styles.weekSelection}>
                    <label style={styles.label}>Select Week:</label>
                    <input
                        type="number"
                        placeholder="Enter Week Number"
                        value={selectedWeek}
                        onChange={handleWeekChange}
                        style={styles.input}
                    />
                </div>

                {loading ? (
                    <p style={styles.loading}>Loading...</p>
                ) : (
                    questions.length > 0 ? (
                        questions.map((question, index) => (
                            <div key={question._id} className="question-details" style={styles.questionContainer}>
                                {/* Directly displaying input fields for editing */}
                                <label style={styles.descriptionLabel}>Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter Title"
                                    value={question.title}
                                    onChange={(e) => handleInputChange(index, e)}
                                    style={styles.editInput}
                                />

                                <label style={styles.descriptionLabel}>Description:</label>
                                <textarea
                                    name="description"
                                    placeholder="Enter Description"
                                    value={question.description}
                                    onChange={(e) => handleInputChange(index, e)}
                                    style={styles.editTextarea}
                                />

                                <label style={styles.descriptionLabel}>Input Format:</label>
                                <input
                                    type="text"
                                    name="inputFormat"
                                    placeholder="Enter Input Format"
                                    value={question.inputFormat}
                                    onChange={(e) => handleInputChange(index, e)}
                                    style={styles.editInput}
                                />

                                <label style={styles.descriptionLabel}>Output Format:</label>
                                <input
                                    type="text"
                                    name="outputFormat"
                                    placeholder="Enter Output Format"
                                    value={question.outputFormat}
                                    onChange={(e) => handleInputChange(index, e)}
                                    style={styles.editInput}
                                />

                                {/* Test Cases Section */}
                                <h3>Test Cases</h3>
                                {question.testCases.map((testCase, testCaseIndex) => (
                                    <div key={testCaseIndex} className="test-case-container" style={styles.testCaseContainer}>
                                        <input 
                                            type="text" 
                                            name="input" 
                                            placeholder="Input" 
                                            value={testCase.input} 
                                            onChange={(e) => handleTestCaseChange(index, testCaseIndex, e)} 
                                            style={styles.input}
                                        />
                                        <input 
                                            type="text" 
                                            name="expectedOutput" 
                                            placeholder="Expected Output" 
                                            value={testCase.expectedOutput} 
                                            onChange={(e) => handleTestCaseChange(index, testCaseIndex, e)} 
                                            style={styles.input}
                                        />
                                    </div>
                                ))}
                                <button type="button" className="add-test-case-button" onClick={() => addTestCase(index)} style={styles.addButton}>
                                    Add Test Case
                                </button>
                                <button onClick={() => updateQuestion(question._id, index)} style={styles.updateButton}>
                                    Update
                                </button>
                            </div>
                        ))
                    ) : (
                        selectedWeek && <p style={styles.noData}>No questions available for the selected week.</p>
                    )
                )}

                {/* Success Alert */}
                {successMessage && <div style={styles.alert}>{successMessage}</div>}
            </div>
        </div>
    );
};

// Inline styles reflecting UpdateQuestions style
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
    },
    weekSelection: {
        marginBottom: '20px',
    },
    label: {
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    loading: {
        textAlign: 'center',
        fontSize: '18px',
    },
    questionContainer: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '6px',
    },
    descriptionLabel: {
        marginTop: '10px',
        fontWeight: 'bold',
    },
    editInput: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    editTextarea: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        resize: 'vertical',
    },
    testCaseContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    addButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    updateButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    noData: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#777',
    },
    alert: {
        textAlign: 'center',
        fontSize: '16px',
        color: 'green',
        marginTop: '20px',
    },
};

export default Codingupdate;
