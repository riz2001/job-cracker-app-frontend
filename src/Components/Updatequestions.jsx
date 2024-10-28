import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';

const UpdateQuestions = () => {
  const [week, setWeek] = useState('');
  const [weeks, setWeeks] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  // Fetch available weeks
  const fetchAvailableWeeks = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/available-weekss');
      setWeeks(response.data);
    } catch (error) {
      console.error('Error fetching weeks:', error);
    }
  };

  // Fetch questions by week
  const fetchQuestions = async (selectedWeek) => {
    try {
      const response = await axios.get(`http://localhost:3030/api/filter-questions/${selectedWeek}`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Error fetching questions.');
    }
  };

  // Handle week change
  const handleWeekChange = (e) => {
    const selectedWeek = e.target.value;
    setWeek(selectedWeek);
    if (selectedWeek) {
      fetchQuestions(selectedWeek);
      setIsUpdated(false);
    }
  };

  // Handle change of answers, explanations, and options
  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handle individual option change
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Add new option
  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push(''); // Add empty option
    setQuestions(updatedQuestions);
  };

  // Remove an option
  const removeOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  // Update questions in the database
  const handleUpdate = async () => {
    try {
      await axios.put('http://localhost:3030/api/update-questions', { questions });
      alert('Questions updated successfully!');
      setIsUpdated(true);
    } catch (error) {
      console.error('Error updating questions:', error);
      alert('Error updating questions.');
    }
  };

  useEffect(() => {
    fetchAvailableWeeks();
  }, []);

  return (
    <div>
      <Adminnavbar />
      <div className="update-container">
        <h2 className="header"><b>UPDATE QUESTIONS</b></h2>

        <label htmlFor="weekSelect">
          Week:
          <select id="weekSelect" value={week} onChange={handleWeekChange} required>
            <option value="" disabled>Select a week</option>
            {weeks.map((availableWeek, index) => (
              <option key={index} value={availableWeek}>
                Week {availableWeek}
              </option>
            ))}
          </select>
        </label>

        <button className="update-button" onClick={handleUpdate} disabled={!week || isUpdated}>
          Update Questions
        </button>

        <div className="questions-container">
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <div key={question._id} className="question-card">
                <h3>Question {index + 1}:</h3>
                <textarea
                  value={question.question}
                  onChange={(e) => handleInputChange(index, 'question', e.target.value)}
                  placeholder="Edit question text"
                  rows="6" // Increased number of rows for better visibility
                  className="question-input"
                />
                
                <div className="options-container">
                  <strong>Options:</strong>
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="option-container">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                        placeholder={`Option ${optIndex + 1}`}
                        className="option-input"
                      />
                      <button onClick={() => removeOption(index, optIndex)} className="remove-option">
                        Remove
                      </button>
                    </div>
                  ))}
       <button onClick={() => addOption(index)} className="add-option">
                    Add Option
                  </button>
                </div>

                <div>
                  <strong>Correct Answer:</strong>
                  <input
                    type="text"
                    value={question.answer}
                    onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
                    placeholder="Edit correct answer"
                    className="answer-input"
                  />
                </div>

                <div>
                  <strong>Explanation:</strong>
                  <textarea
                    value={question.explanation}
                    onChange={(e) => handleInputChange(index, 'explanation', e.target.value)}
                    placeholder="Edit explanation"
                    rows="4" // Increase rows to match options field
                    className="explanation-input"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No questions found for this week.</p>
          )}
        </div>

        <style jsx>{`
          .update-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          }

          .header {
            text-align: center;
            color: #4CAF50;
            margin-bottom: 20px;
            font-size: 28px;
          }

          label {
            font-weight: bold;
            margin-right: 10px;
          }

          select {
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 4px;
            border: 1px solid #ccc;
            font-size: 16px;
          }

          .update-button {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 20px;
          }

          .update-button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }

          .questions-container {
            margin-top: 20px;
          }

          .question-card {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 8px;
          }

          .question-input,
          .answer-input,
          .explanation-input {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            margin-bottom: 15px;
            border-radius: 6px;
            border: 1px solid #ccc;
          }

          .option-container {
            display: flex;
            align-items: center;
            margin-top: 5px;
          }

          .option-input {
            flex: 1;
            padding: 10px;
            border-radius: 6px;
            border: 1px solid #ccc;
            margin-right: 10px;
          }

          .remove-option {
            padding: 5px 10px;
            background-color: #ff4d4d;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .add-option {
            padding: 5px 10px;
            background-color: #28a745;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
          }

          h3 {
            margin-bottom: 10px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default UpdateQuestions;
