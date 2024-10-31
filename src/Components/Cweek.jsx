import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Usernavbar1 from './Usernavbar1';

const Cweek = () => {
    const [weeks, setWeeks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(''); // State for selected company
    const [companies, setCompanies] = useState([]); // State for available companies

    // Fetch available companies when the component mounts
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get('http://localhost:3030/api/companies'); // Update this URL to your actual companies endpoint
                setCompanies(res.data); // Assuming response is an array of companies
            } catch (err) {
                console.error('Error fetching companies:', err);
                setError('Error fetching companies');
            }
        };

        fetchCompanies();
    }, []);

    // Fetch weeks when the selected company changes
    useEffect(() => {
        const fetchWeeks = async () => {
            if (!selectedCompany) return; // Don't fetch if no company is selected
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:3030/api/cquestions/weeks/${selectedCompany}`);
                setWeeks(res.data);
            } catch (err) {
                setError('Error fetching weeks');
            } finally {
                setLoading(false);
            }
        };

        fetchWeeks();
    }, [selectedCompany]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Usernavbar1 />
            <div className="week-review">
                <h1 className="title">Registered Weeks</h1>
                
                {/* Dropdown for selecting a company */}
                <div>
                    <select 
                        onChange={(e) => setSelectedCompany(e.target.value)} 
                        value={selectedCompany}
                        className="select-dropdown"
                    >
                        <option value="">Select a Company</option>
                        {companies.map((company, index) => (
                            <option key={index} value={company}>{company}</option>
                        ))}
                    </select>
                </div>
                
                <div className="card-container">
                    {weeks.map((week, index) => (
                        <div key={index} className="card">
                            <Link to={`/compiler/${week}`} className="card-link">
                                <h3 className="card-title">Week {week}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                /* Apply background color to the entire page */
                body {
                    background-color: #f0f2f5; /* Light gray background for the whole page */
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                }

                .week-review {
                    width: 90%; /* Slightly wider for better responsiveness */
                    max-width: 1000px;
                    margin: 20px auto; /* Add some space around the container */
                    padding: 20px;
                    text-align: center;
                    background-color: #ffffff; /* White background for the content area */
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }

                .title {
                    font-size: 24px;
                    color: #333;
                    margin-bottom: 20px;
                }

                .card-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 20px;
                }

                .card {
                    position: relative; /* Position relative for pseudo-elements */
                    background-color: #007bff; /* Custom blue background for the cards */
                    border: 1px solid #0056b3; /* Darker blue border for contrast */
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    width: 200px;
                    text-align: center;
                    padding: 15px;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    color: #fff; /* White text for better readability */
                    cursor: pointer; /* Change cursor to pointer for better UX */
                }

                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                    background-color: #0056b3; /* Darker blue on hover */
                }

                .card::after {
                    content: '';
                    position: absolute;
                    left: 10%;
                    right: 10%;
                    bottom: -5px; /* Position it just below the card */
                    height: 2px; /* Thickness of the line */
                    background-color: white; /* Color of the line */
                    opacity: 0; /* Start as invisible */
                    transition: opacity 0.3s ease; /* Transition effect */
                }

                .card:hover::after {
                    opacity: 1; /* Make it visible on hover */
                }

                .card-link {
                    text-decoration: none;
                    color: #ffffff;
                }

                .card-link:hover {
                    text-decoration: underline;
                }

                .card-title {
                    font-size: 18px;
                    color: #fff; /* White text for better readability */
                }

                .select-dropdown {
                    margin-bottom: 20px; /* Add some space below the dropdown */
                    padding: 10px; /* Add some padding */
                    font-size: 16px; /* Increase font size for better readability */
                }
            `}</style>
        </div>
    );
};

export default Cweek;
