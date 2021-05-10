import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Dashboard({ id }) {
  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: '100vh' }}
    >
      <Link to="/login">
        <Button type="submit" className="mr-2">
          LogIn
        </Button>
      </Link>
      <Link to="/signup">
        <Button type="submit" className="mr-2">
          Sign Up
        </Button>
      </Link>
    </Container>
  );
}
