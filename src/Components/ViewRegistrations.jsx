import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ViewRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    axios.get('http://localhost:3030/ViewRegistrations', {
      headers: { token }
    })
    .then(response => {
      if (response.data.status === 'success') {
        setRegistrations(response.data.registrations);
      } else {
        alert('Error fetching registrations');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <Container>
      <h2>Registered Users and Their Jobs</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>User Name</TableHeader>
            <TableHeader>Admission Number</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Job Title</TableHeader>
            <TableHeader>Applied At</TableHeader>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg, index) => (
            <TableRow key={index}>
              <TableCell>{reg.user_id.name}</TableCell>
              <TableCell>{reg.user_id.admissionno}</TableCell>
              <TableCell>{reg.user_id.email}</TableCell>
              <TableCell>{reg.job_id.title}</TableCell>
              <TableCell>{new Date(reg.applied_at).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewRegistrations;
