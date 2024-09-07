import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';



const PageNotFound = () => (
  <Container>
    <Heading>404</Heading>
    <Message>Oops! The page you are looking for does not exist.</Message>
    <HomeLink to="/">Go back to Homepage</HomeLink>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  color: #333;
  text-align: center;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  margin: 0;
  color: #e74c3c;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin: 20px 0;
`;

const HomeLink = styled(NavLink)`
  font-size: 1.2rem;
  color: #3498db;
  text-decoration: none;
  border-bottom: 1px solid #3498db;
  transition: color 0.3s, border-bottom 0.3s;

  &:hover {
    color: #2980b9;
    border-bottom: 1px solid #2980b9;
  }
`;

export default PageNotFound;
