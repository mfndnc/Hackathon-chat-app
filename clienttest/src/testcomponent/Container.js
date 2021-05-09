import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Container() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('/auth/user/');
      const json = await response.json();

      setUser(json);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) return <div>Loading ...</div>;
  if (user && !user.username)
    return (
      <div>
        <a href={`${process.env.REACT_APP_USERAPI}/login`}>LOGIN</a> or
        <a href={`${process.env.REACT_APP_USERAPI}/signup`}>SIGN UP</a>
      </div>
    );
  if (!loading && user && user.username)
    return (
      <div>
        {user.username} / PUT add here
        <a href={`${process.env.REACT_APP_USERAPI}/logout`}>logout</a>
      </div>
    );
}
