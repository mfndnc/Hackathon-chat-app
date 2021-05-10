import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';


function Signup() {
  const history = useHistory();
  const handleSubmit = async (e) => {
    console.log('handleSubmit');
    e.preventDefault();
    const data = {
      username: e.target[0].value,
      password: e.target[1].value,
      fullName: e.target[2].value,
      email: e.target[3].value,
    };


    const response = await axios.post('/signup', data);
    console.log(response)
    history.push('/login')
  }
  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="username"
            name="username"
            defaultValue=""
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            defaultValue=""
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Full Name"
            name="fullName"
            defaultValue=""
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            defaultValue=""
            required
          />
        </Form.Group>
        <Button type="submit" className="mr-2">
          Signup
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;