import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Usernavbar1 from './Usernavbar1';

const Quizdisplay = () => {
 // Get the week number from the URL
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { company, week } = useParams(); 
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false); // Track if the user already submitted
  const [dueDate, setDueDate] = useState(''); // State to store the due date
  console.log(`Fetching questions for Company: ${company}, Week: ${week}`);
  // Fetch questions and due date for the specific week
  useEffect(() => {
    const fetchQuestions = async () => {
  try {
    setLoading(true);
   

    const response = await axios.get(`http://localhost:3030/api/company/${company}/week/${week}`);
    
    console.log("API Response:", response.data); // Add this line to log the response
    
    setQuestions(response.data);
    setAnswers(new Array(response.data.length).fill('')); // Initialize answers array

    // Set the due date from the response (assumes due date is part of the response)
    if (response.data.length > 0) {
      setDueDate(response.data[0].dueDate); // Assuming all questions have the same due date
    }

    setLoading(false);
  } catch (error) {
    console.error('Error fetching questions:', error); // Log the error
    setError('Error fetching questions');
    setLoading(false);
  }
};
  
    fetchQuestions();
  }, [company, week]);
  

  useEffect(() => {
    const checkSubmission = async () => {
      const token = sessionStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:3030/api/check-submission/${company}/${week}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        if (response.data.submitted) {
          setAlreadySubmitted(true); // Set the state to disable form submission
        }
      } catch (error) {
        console.error('Error checking submission:', error);
      }
    };
  
    checkSubmission();
  }, [company, week]);
  
  // Handle answer changes
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // Handle quiz submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userAnswers = questions.map((question, index) => ({
      questionId: question._id,
      answer: answers[index]
    }));
  
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.post('http://localhost:3030/api/submit-quiz', {
        company, // Include company name in the submission
        week,
        answers: userAnswers,
        dueDate // Include the due date in the submission
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      setScore(response.data.score);
      setResults(response.data.results);
      setSubmitted(true);
      window.alert('Quiz submitted successfully!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      window.alert(error.response?.data?.message || 'Error submitting quiz. Please try again.');
    }
  };
  
  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (alreadySubmitted) {
    return <div className="already-submitted">You have already submitted the quiz for this week.</div>;
  }

  return (
    <div>
      <Usernavbar1/>
   
      <div className="quiz-container">
        <style>
          {`
            .quiz-container {
              width: 80%;
              max-width: 1000px;
              margin: 0 auto;
              font-family: Arial, sans-serif;
              padding: 20px;
              background-color: #fff; /* White background for the entire container */
              border-radius: 8px; /* Rounded corners for the card */
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
            }
            .quiz-title {
              text-align: center;
              margin-bottom: 20px;
              font-size: 24px;
              color: #333;
            }
            .due-date {
              text-align: right;
              font-size: 16px;
              color: red; /* Red color for due date */
              margin-bottom: 20px;
            }
            .quiz-form {
              margin-top: 20px;
            }
            .question-block {
              margin-bottom: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 15px;
              background-color: #f9f9f9;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .question-text {
              font-size: 18px;
              color: #555;
            }
            .options-container {
              margin-top: 10px;
            }
            .option-label {
              display: block;
              margin-bottom: 8px;
              font-size: 16px;
            }
            .option-input {
              margin-right: 8px;
            }
            .submit-button {
              padding: 10px 20px;
              font-size: 16px;
              color: #fff;
              background-color: #007bff;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              margin-top: 10px;
              display: block;
              width: 100%;
            }
            .submit-button:hover {
              background-color: #0056b3;
            }
            .loading, .error {
              text-align: center;
              font-size: 18px;
              color: #ff0000;
            }
            .results-container {
              margin-top: 20px;
            }
            .results-title {
              font-size: 20px;
              font-weight: bold;
              color: #333;
            }
            .results-list {
              list-style-type: none;
              padding: 0;
            }
            .result-item {
              padding: 10px;
              border-radius: 5px;
              margin-bottom: 10px;
              border: 1px solid #ddd;
            }
            .result-item.correct {
              background-color: #d4edda;
              color: #155724;
            }
            .result-item.incorrect {
              background-color: #f8d7da;
              color: #721c24;
            }
            .result-question, .result-answer, .result-correct, .result-status {
              margin-bottom: 8px;
            }
          `}
        </style>

        <h2 className="quiz-title">Quiz for Week {week}</h2>
        <div className="due-date">Due Date: {dueDate ? new Date(dueDate).toLocaleDateString() : 'Not set'}</div> {/* Display due date */}
        
        <form onSubmit={handleSubmit} className="quiz-form">
        {questions.length > 0 ? (
            <div className="questions-card"> {/* Added a card for all questions */}
              {questions.map((question, index) => (
                <div key={index} className="question-block">
                  <h3 className="question-text">
                    {index + 1}. {question.question} {/* Added index number */}
                  </h3>
                  <div className="options-container">
                    {question.options.map((option, optionIndex) => (
                      <label key={optionIndex} className="option-label">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={answers[index] === option}
                          onChange={(e) => handleAnswerChange(index, e.target.value)}
                          required
                          className="option-input"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-questions">No questions found for this week.</p>
          )}
          <button type="submit" className="submit-button" disabled={submitted}>Submit Quiz</button>
        </form>

        {/* Display results after quiz submission */}
        {submitted && score !== null && (
          <div className="results-container">
            <h3 className="results-title">Your Score: {score}</h3>
            <ul className="results-list">
              {results.map((result, index) => (
                <li key={index} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="result-question">
                    {questions.find(q => q._id === result.questionId)?.question}
                  </div>
                  <div className="result-answer">
                    <strong>Your Answer:</strong> {result.userAnswer || 'No answer selected'}
                  </div>
                  <div className="result-correct">
                    <strong>Correct Answer:</strong> {result.correctAnswer}
                  </div>
                  <div className="result-status">
                    Status: {result.isCorrect ? 'Correct' : 'Incorrect'}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizdisplay;
