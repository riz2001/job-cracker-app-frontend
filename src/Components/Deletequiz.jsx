import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';

const Deletequiz = () => {
  const [uniqueQuizzes, setUniqueQuizzes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniqueQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/unique-quizzes');
        setUniqueQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching unique quizzes:', error);
        setError('Error fetching unique quizzes');
      }
    };

    fetchUniqueQuizzes();
  }, []);

  const handleDeleteQuizAndAnswers = async (company, week) => {
    try {
      const response = await axios.delete(`http://localhost:3030/api/delete/company/${company}/week/${week}`);
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error('Error deleting quiz and answers:', error);
      alert('Error deleting quiz and answers');
    }
  };
  

  const handleDeleteSubmissionsOnly = async (company, week) => {
    try {
      await axios.delete(`http://localhost:3030/api/submissions/company/${company}/week/${week}`);
      alert(`Deleted submissions for ${company} in week ${week}`);
    } catch (error) {
      console.error('Error deleting submissions:', error);
      setError('Error deleting submissions');
    }
  };

  return (
    <div>
      <Adminnavbar/>
      <h2><b><center>Delete Quiz </center></b></h2>
      {error && <p>{error}</p>}
      {uniqueQuizzes.length > 0 ? (
        <table className="quiz-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Week</th>
              <th>Delete Submissions</th>
              <th>Delete Quizzes</th>
            </tr>
          </thead>
          <tbody>
            {uniqueQuizzes.map((quiz, index) => (
              <tr key={index}>
                <td>{quiz.company}</td>
                <td>{quiz.week}</td>
                <td>
                  <button
                    onClick={() => handleDeleteSubmissionsOnly(quiz.company, quiz.week)}
                    style={{ backgroundColor: 'purple', color: 'white' }}
                  >
                    Delete Submissions
                  </button>
                </td>
                <td>
  <button 
    onClick={() => handleDeleteQuizAndAnswers(quiz.company, quiz.week)} 
    style={{ backgroundColor: 'red', color: 'white' }}
  >
    Delete Quiz and Answers
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No quizzes available.</p>
      )}

      <style jsx>{`
        .quiz-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .quiz-table th,
        .quiz-table td {
          padding: 10px;
          text-align: left;
          border: 1px solid #007bff;
        }

        .quiz-table th {
          background-color: #007bff;
          color: white;
        }

        .quiz-table tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        .quiz-table tr:hover {
          background-color: #e0e7ff;
        }

        button {
          padding: 5px 10px;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Deletequiz;
