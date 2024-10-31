import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';

const Deletecode = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/quizzes');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
      setError('Error fetching entries');
    }
  };

  const handleDeleteSubmissionsOnly = async (company, week) => {
    try {
      await axios.delete(`http://localhost:3030/api/delete-submission`, {
        params: { company, week },
      });
      alert(`Deleted submissions for ${company} in week ${week}`);
      fetchEntries(); // Refresh entries after deletion
    } catch (error) {
      console.error('Error deleting submissions:', error);
      setError('Error deleting submissions');
    }
  };

  const handleDeleteQuizAndAnswers = async (company, week) => {
    try {
      const response = await axios.delete(`http://localhost:3030/api/delete-quiz`, {
        params: { company, week },
      });
      alert(response.data.message); // Show success message
      fetchEntries(); // Refresh entries after deletion
    } catch (error) {
      console.error('Error deleting quiz and answers:', error);
      alert('Error deleting quiz and answers');
    }
  };

  return (
    <div>
        <Adminnavbar/>
      <h2><center><b>Delete code</b></center></h2>
      {error && <p>{error}</p>}
      {entries.length > 0 ? (
        <table className="entry-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Week</th>
              <th>Delete Submissions</th>
              <th>Delete Quiz and Answers</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.company}</td>
                <td>{entry.week}</td>
                <td>
                  <button
                    onClick={() => handleDeleteSubmissionsOnly(entry.company, entry.week)}
                    style={{ backgroundColor: 'purple', color: 'white' }}
                  >
                    Delete Submissions
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteQuizAndAnswers(entry.company, entry.week)}
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
        <p>No entries available.</p>
      )}

      <style jsx>{`
        .entry-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .entry-table th,
        .entry-table td {
          padding: 10px;
          text-align: left;
          border: 1px solid #007bff;
        }

        .entry-table th {
          background-color: #007bff;
          color: white;
        }

        .entry-table tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        .entry-table tr:hover {
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

export default Deletecode;
