import React, { useState, useEffect } from 'react';
import Login from './LoginMERN';
import ListOfThings from './ListOfThings';
import ListFetch from './ListFetch';
import AnotherOne from './AnotherOne';

export default function Container() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const [logInDone, setLogInDone] = useState(false);

  useEffect(() => {
    console.log('Container useEffect');
    const getUser = async () => {
      const response = await fetch('/auth/user/');
      const json = await response.json();

      setUser(json);
      setLoading(false);
    };
    getUser();
  }, [logInDone]);

  if (loading) return <div>Loading ...</div>;

  if (!loading && user && user.username)
    return (
      <div>
        {user.username} / PUT add here
        <a href={`${process.env.REACT_APP_USERAPI}/logout`}>logout</a>
      </div>
    );

  if (user && !user.username)
    return <AnotherOne onLoginSuccess={setLogInDone} />;
  /*
  if (user && !user.username)
    return (
      <div>
        <a href={`${process.env.REACT_APP_USERAPI}/login`}>LOGIN</a> or
        <a href={`${process.env.REACT_APP_USERAPI}/signup`}>SIGN UP</a>
      </div>
    );
    */
}
