import React, { useState, useEffect } from 'react';
import Login from './Login';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import LoginMERN from './LoginMERN';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';

function App() {
  const [id, setId] = useState('id');

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const [logInDone, setLogInDone] = useState(false);

  useEffect(() => {
    console.log('Container useEffect');
    const getUser = async () => {
      const response = await fetch('/auth/user/');
      const json = await response.json();

      setUser(json);
      setId(json._id);
      setLoading(false);
    };
    getUser();
  }, [logInDone]);

  if (loading) return <div>Loading ...</div>;

  if (!loading && user && user.username)
    return (
      <SocketProvider id={id}>
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <Dashboard id={id} />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    );

  if (user && !user.username)
    return <LoginMERN onLoginSuccess={setLogInDone} />;
}

export default App;
