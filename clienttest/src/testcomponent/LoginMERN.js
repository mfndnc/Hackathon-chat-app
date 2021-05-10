import React, { useRef, useState, useEffect } from 'react';

export default function Login({ onIdSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="label">Username</label>

      <input
        className="input"
        type="text"
        placeholder="username"
        value={username}
        required
      />

      <label className="label">password</label>

      <input
        className="input"
        type="password"
        placeholder="password"
        value={password}
        required
      />

      <button type="submit">submit</button>
    </form>
  );
}
