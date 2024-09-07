import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f0f2f5;
    color: #333;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  margin: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  text-align: center;
  color: #333;
`;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <Container>
        <div>
          <Title>Welcome</Title>
          <div>
            <Button onClick={() => navigate('/AdminSignIn')}>Admin Login</Button>
            <Button onClick={() => navigate('/Usignin')}>User Login</Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LandingPage;
