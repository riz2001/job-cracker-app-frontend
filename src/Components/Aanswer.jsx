import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';

const Aanswer = () => {
  const [week, setWeek] = useState('');
  const [weeks, setWeeks] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const fetchAvailableWeeks = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/available-weekss');
      setWeeks(response.data);
    } catch (error) {
      console.error('Error fetching weeks:', error);
    }
  };

  const fetchQuestions = async (selectedWeek) => {
    try {
      const response = await axios.get(`http://localhost:3030/api/filter-questions/${selectedWeek}`);
      console.log('Fetched questions:', response.data); // Log fetched questions
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Error fetching questions.');
    }
  };

  const handleWeekChange = (e) => {
    const selectedWeek = e.target.value;
    setWeek(selectedWeek);
    if (selectedWeek) {
      fetchQuestions(selectedWeek);
      setSubmitted(false);
    }
  };

  const handleSubmit = async () => {
    const userAnswers = questions.map(question => ({
      questionId: question._id, // Include question ID
      week: Number(week),
    
      answer: question.answer,
      explanation: question.explanation,
      submittedAt: new Date(),
    }));
  
    try {
      await axios.post('http://localhost:3030/api/submit-answerss', userAnswers);
      alert('Answers submitted successfully!');
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Error submitting answers.');
    }
  };
  useEffect(() => {
    fetchAvailableWeeks();
  }, []);

  return (
    <div>
      <Adminnavbar/>
      <h2>Select Week to View Questions and Correct Answers</h2>

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

      <button onClick={handleSubmit} disabled={!week || submitted}>
        Submit Answers
      </button>

      <div className="questions-container">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div key={question._id} className="question-card">
              <h3>Question {index + 1}: {question.questionText}</h3>
              <div>
                <strong>Correct Answer:</strong> {question.answer}
              </div>
              {question.explanation && (
                <div>
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No questions found for this week.</p>
        )}
      </div>

      <style jsx>{`
        .questions-container {
          margin-top: 20px;
        }
        .question-card {
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

export default Aanswer;
