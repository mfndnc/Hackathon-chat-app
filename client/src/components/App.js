import React, { useState, useEffect } from 'react';
// import Login from './Login';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import Login from './LoginMERN';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './Signup';

const apiforuserlogged = process.env.REACT_APP_USER || '/auth/user';

function App() {
  const [id, setId] = useState('id');

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const [logInDone, setLogInDone] = useState(false);

  useEffect(() => {
    console.log('Container useEffect');
    const getUser = async () => {
      try {
        const response = await fetch(`${apiforuserlogged}`);
        const json = await response.json();
        setUser(json);
        setId(json._id);
        console.log('json._id', json._id);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [logInDone]);

  if (loading) return <div>Loading ...</div>;

  // if (user && user.username)
  return (
    <Router>
      <Switch>
        <Route exact path="/dashboard">
          <SocketProvider id={id}>
            <ContactsProvider>
              <ConversationsProvider id={id}>
                <Dashboard id={id} />
              </ConversationsProvider>
            </ContactsProvider>
          </SocketProvider>
        </Route>
        <Route exact path="/" component={Signup} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login">
          <Login onLoginSuccess={setLogInDone} />
        </Route>
      </Switch>
    </Router>
  );

  // if (user && !user.username)
  //   return <LoginMERN onLoginSuccess={setLogInDone} />;
}

export default App;
