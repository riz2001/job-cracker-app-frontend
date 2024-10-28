import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Usernavbar1 from './Usernavbar1';

const Aanswerview = () => {
  const [week, setWeek] = useState('');
  const [weeks, setWeeks] = useState([]); // Store available weeks
  const [answers, setAnswers] = useState([]); // Store fetched answers and questions

  // Fetch available weeks
  const fetchAvailableWeeks = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/available-weekss');
      setWeeks(response.data);
    } catch (error) {
      console.error('Error fetching weeks:', error);
    }
  };

  // Fetch answers and questions by week
  const fetchAnswersByWeek = async (selectedWeek) => {
    try {
      const response = await axios.get(`http://localhost:3030/api/user-answers/${selectedWeek}`);
      setAnswers(response.data);
    } catch (error) {
      console.error('Error fetching answers:', error);
      alert('Error fetching answers.');
    }
  };

  // Handle week change
  const handleWeekChange = (e) => {
    const selectedWeek = e.target.value;
    setWeek(selectedWeek);
    if (selectedWeek) {
      fetchAnswersByWeek(selectedWeek);
    }
  };

  // Fetch available weeks when the component mounts
  useEffect(() => {
    fetchAvailableWeeks();
  }, []);

  return (
    <div>
      <Usernavbar1 />
      <div style={styles.container}>
        <h2 style={styles.header}><center><b>VIEW SUBMITTED ANSWERS</b></center></h2>
        
        <div style={styles.weekSelector}>
          <label>Select Week:</label>
          <select value={week} onChange={handleWeekChange} style={styles.select} required>
            <option value="" disabled>Select a week</option>
            {weeks.map((availableWeek, index) => (
              <option key={index} value={availableWeek}>
                Week {availableWeek}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.answersContainer}>
          {answers.length > 0 ? (
            answers.map((answer, index) => (
              <div key={answer._id} style={styles.answerCard}>
                <h3>Question {index + 1}: {answer.questionId.question}</h3>
                <div>
                  <strong>Your Answer:</strong> {answer.answer}
                </div>
                {answer.explanation && (
                  <div>
                    <strong>Explanation:</strong> {answer.explanation}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No answers found for this week.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Aanswerview;

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
    marginBottom: '20px',
  },
  weekSelector: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  select: {
    marginLeft: '10px',
    padding: '8px',
    fontSize: '16px',
  },
  answersContainer: {
    marginTop: '20px',
  },
  answerCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    border: '2px solid #007bff',
  },
};
