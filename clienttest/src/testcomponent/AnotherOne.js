import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

export default function Login({ onLoginSuccess }) {
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
    };
    getLogin(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="label">Username</label>

      <input
        className="input"
        type="text"
        placeholder="username"
        name="username"
        defaultValue=""
        required
      />

      <label className="label">password</label>

      <input
        className="input"
        type="password"
        placeholder="password"
        name="password"
        defaultValue=""
        required
      />

      <button type="submit">submit</button>
    </form>
  );
}
