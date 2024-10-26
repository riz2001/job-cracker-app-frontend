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
      <Usernavbar1/>
      <h2>Select Week to View Submitted Answers</h2>

      <label>
        Week:
        <select value={week} onChange={handleWeekChange} required>
          <option value="" disabled>Select a week</option>
          {weeks.map((availableWeek, index) => (
            <option key={index} value={availableWeek}>
              Week {availableWeek}
            </option>
          ))}
        </select>
      </label>

      <div className="answers-container">
        {answers.length > 0 ? (
          answers.map((answer, index) => (
            <div key={answer._id} className="answer-card">
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

      <style jsx>{`
        .answers-container {
          margin-top: 20px;
        }
        .answer-card {
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 8px;
        }
        h3 {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default Aanswerview;
