import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled Components
const JobContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #007bff;
  &:hover {
    background-color: #0056b3;
  }
`;

const AddJob = () => {
  const [input, setInput] = useState({ title: '', description: '', location: '', salary: '' });
  const navigate = useNavigate(); // Initialize useNavigate

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    axios.post('http://localhost:3030/AddJob', input, {
      headers: { token }
    })
    .then(response => {
      if (response.data.status === 'success') {
        alert('Job added successfully');
        setInput({ title: '', description: '', location: '', salary: '' });
      } else {
        alert('Error adding job');
      }
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <JobContainer>
      <FormWrapper>
        <Title>Add Job</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Job Title"
            onChange={inputHandler}
            value={input.title}
            required
          />
          <Input
            type="text"
            name="description"
            placeholder="Job Description"
            onChange={inputHandler}
            value={input.description}
            required
          />
          <Input
            type="text"
            name="location"
            placeholder="Location"
            onChange={inputHandler}
            value={input.location}
            required
          />
          <Input
            type="number"
            name="salary"
            placeholder="Salary"
            onChange={inputHandler}
            value={input.salary}
            required
          />
          <Button type="submit">Add Job</Button>
          <SecondaryButton onClick={() => navigate('/ViewRegistrations')}>View Registrations</SecondaryButton>
        </form>
      </FormWrapper>
    </JobContainer>
  );
};

export default AddJob;