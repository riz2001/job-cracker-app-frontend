import React, { useState } from 'react';
import axios from 'axios';
import Usernavbar1 from './Usernavbar1';
import Adminnavbar from './Adminnavbar';

const Addquestions = () => {
  const [questions, setQuestions] = useState([{ question: '', options: ['', ''], answer: '' }]);
  const [week, setWeek] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Handle question change
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  // Handle options change
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  // Add a new question object to the form
  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', ''], answer: '' }]);
  };

  // Add more options to a question
  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  // Handle week change
  const handleWeekChange = (value) => {
    setWeek(value);
  };

  // Handle due date change
  const handleDueDateChange = (value) => {
    setDueDate(value);
  };

  // Submit the questions to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add the shared week and due date to each question before submitting
    const updatedQuestions = questions.map((q) => ({
      ...q,
      week: week,
      dueDate: dueDate,
    }));

    try {
      await axios.post('http://localhost:3030/api/questions', updatedQuestions);
      alert('Questions added successfully!');
      setQuestions([{ question: '', options: ['', ''], answer: '' }]);
      setWeek('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding questions:', error);
      alert('Error adding questions.');
    }
  };

  return (
    <div>
      <Adminnavbar />
      <div className="outer-card"> {/* Outer card view */}
        <div className="admin-container">
          <h2 className="admin-title">ADD QUESTIONS</h2>
          <form onSubmit={handleSubmit} className="admin-form">

            <label className="form-label">
              Week:
              <input
                type="number"
                value={week}
                onChange={(e) => handleWeekChange(e.target.value)}
                required
                className="form-input"
              />
            </label>
            <br />
            <label className="form-label">
              Due Date:
              <input
                type="date"
                value={dueDate}
                onChange={(e) => handleDueDateChange(e.target.value)}
                required
                className="form-input"
              />
            </label>
            <br />

            {questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question-block">
                <h3 className="question-title">Question {questionIndex + 1}</h3>
                <label className="form-label">
                  Question:
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                    required
                    className="form-input"
                  />
                </label>
                <br />
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option-block">
                    <label className="form-label">
                      Option {optionIndex + 1}:
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                        required
                        className="form-input"
                      />
                    </label>
                    <br />
                  </div>
                ))}
                <button type="button" onClick={() => addOption(questionIndex)} className="add-option-button">Add Another Option</button>
                <br />
                <label className="form-label">
                  Answer:
                  <input
                    type="text"
                    value={question.answer}
                    onChange={(e) => handleQuestionChange(questionIndex, 'answer', e.target.value)}
                    required
                    className="form-input"
                  />
                </label>
                <br />
              </div>
            ))}

            <button type="button" onClick={addQuestion} className="add-question-button">Add Another Question</button>
            <br />
            <button type="submit" className="submit-button">Submit Questions</button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .outer-card {
          width: 80%;
          max-width: 900px;
          margin: 0 auto;
          background-color: #fff; /* Outer card background color */
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          padding: 20px;
        }

        .admin-container {
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .admin-title {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
          text-align: center;
        }

        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .question-block {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .question-title {
          font-size: 20px;
          color: #444;
          margin-bottom: 15px;
        }

        .form-label {
          display: block;
          margin-bottom: 10px;
          font-size: 16px;
          color: #333;
        }

        .form-input {
          width: 100%;
          padding: 8px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-top: 5px;
        }

        .add-option-button, .add-question-button, .submit-button {
          padding: 10px 20px;
          font-size: 16px;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }

        .add-option-button:hover, .add-question-button:hover, .submit-button:hover {
          background-color: #0056b3;
        }

        .option-block {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default Addquestions;
