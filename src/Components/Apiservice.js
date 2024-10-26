// src/Components/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:3030/api/compiler';

export const fetchWeeks = async () => {
    const response = await axios.get(`${API_URL}/weeks`);
    return response.data;
};

export const fetchQuestions = async (week) => {
    const response = await axios.get(`${API_URL}/questions/${week}`);
    return response.data;
};
