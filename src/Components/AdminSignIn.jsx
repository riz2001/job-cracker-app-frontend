import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Usernavbar from './Usernavbar'; // Adjust the path as necessary

// Styled Components
const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  margin-top: -50px; /* Adjust this value to position the card higher */
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 3rem; /* Increased padding for a taller view */
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  max-width: 550px; /* Increased max-width for a wider view */
  width: 100%;
  text-align: center;
  min-height: 450px; /* Added a minimum height for the card */
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #007bff;
  text-align: center;
  font-weight: bold;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.75rem 0;
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
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const AdminSignIn = () => {
  const [input, setInput] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3030/AdminSignIn', input)
      .then(response => {
        if (response.data.status === 'success') {
          sessionStorage.setItem('token', response.data.token);
          navigate('/AddJob');  // Navigate to job insertion page
        } else if (response.data.status === 'incorrect password') {
          alert('Incorrect password');
        } else if (response.data.status === 'invalid username') {
          alert('Invalid username');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <Usernavbar />

      <SignInContainer>
        <FormWrapper>
          {/* Job Cracker Heading */}
          <Heading>JOB CRACKER</Heading>

          {/* Logo Image */}
          <Image src="https://tse3.mm.bing.net/th?id=OIP.Z9MPb-mr_Soaz3u-MgNjPQHaHa&pid=Api&P=0&h=220" alt="Job Cracker Logo" />

          <Title>Admin Sign In</Title>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={inputHandler}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={inputHandler}
              required
            />
            <Button type="submit">Sign In</Button>
          </form>
        </FormWrapper>
      </SignInContainer>
    </div>
  );
};

export default AdminSignIn;
