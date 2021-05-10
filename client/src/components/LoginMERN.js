import React, { useRef, useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


export default function Login({ onLoginSuccess }) {
  const history = useHistory()
  const [logindata, setLogindata] = useState({
    username: '',
    fullName: '',
    _id: 0,
    succes: false,
    error: false,
  });

  useEffect(() => {
    console.log('useEffect', logindata);
    if (logindata.success) onLoginSuccess(true);
  }, [logindata]);

  const handleSubmit = (e) => {
    console.log('handleSubmit');
    e.preventDefault();
    const data = {
      username: e.target[0].value,
      password: e.target[1].value,
    };

    const getLogin = async (data) => {
      console.log('getLogin', data, JSON.stringify(data));
      const requestOptions = {
        method: 'POST',
        url: '/loginapi',
        data: data,
      };

      const response = await axios(requestOptions);
      console.log('response', response.status, response.data);
      if (response && response.data && response.data.success)
        setLogindata(response.data);
      history.push('/dashboard')
    };
    getLogin(data);
  };
  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: '100vh' }}
    >
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
        <Button type="submit" className="mr-2">
          Login
        </Button>
      </Form>
    </Container>
  );
}
