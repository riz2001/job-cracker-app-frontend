import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Adminnavbar from './Adminnavbar';

const Fourweek = () => {
  const [weekRanges, setWeekRanges] = useState([]);
  const [selectedWeeks, setSelectedWeeks] = useState('');
  const [scores, setScores] = useState([]);

  // Fetch week ranges from the backend on component mount
  useEffect(() => {
    const fetchWeekRanges = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/week-rangess');
        setWeekRanges(response.data);
      } catch (error) {
        console.error('Error fetching week ranges:', error);
      }
    };

    fetchWeekRanges();
  }, []);

  // Handle week selection from dropdown
  const handleWeekSelection = async (e) => {
    const range = e.target.value;
    setSelectedWeeks(range);

    // Extracting the week numbers from the selected range
    const weeks = range.match(/\d+/g);
    const startWeek = weeks ? parseInt(weeks[0]) : 1;
    const endWeek = weeks ? parseInt(weeks[1]) : 4; // Adjust according to your logic

    try {
      const response = await axios.get(`http://localhost:3030/api/scoress/${startWeek}/${endWeek}`);
      setScores(response.data);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  const findHighestScore = () => {
    return scores.reduce((max, user) => (user.score > max ? user.score : max), 0);
  };

  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  const highestScore = findHighestScore();

  return (
    <div>
        <Adminnavbar/>
    
    <div className="four-week-container">
      <h2 className="header">Four Week Score Table</h2>
      <label htmlFor="weekRanges">Select Weeks:</label>
      <select id="weekRanges" value={selectedWeeks} onChange={handleWeekSelection}>
        <option value="">--Select Weeks--</option>
        {weekRanges.map((range, index) => (
          <option key={index} value={range}>{range}</option>
        ))}
      </select>

      <table className="score-table">
        <thead>
          <tr>
            <th>SL No</th>
            <th>User</th>
            <th>Admission No</th>
            <th>Roll No</th>
            <th>Course Year</th>
            <th>Email</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map((score, index) => (
            <tr
              key={index}
              className={score.score === highestScore ? 'highlight' : ''}
            >
              <td>{index + 1}</td>
              <td>{score.name}</td>
              <td>{score.admissionNo}</td>
              <td>{score.rollNo}</td>
              <td>{score.courseYear}</td>
              <td>{score.email}</td>
              <td>{score.score}</td>
              <td>{score.score === highestScore ? 'Topper' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .four-week-container {
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

        .score-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          padding: 20px;
          text-align: left;
          border: 1px solid #ddd;
          font-size: 18px;
        }

        th {
          background-color: #007bff;
          color: #ffffff;
        }

        tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .highlight {
          font-weight: bold;
          background-color: #ffeb3b;
        }
      `}</style>
    </div>
    </div>
  );
};

export default Fourweek;
