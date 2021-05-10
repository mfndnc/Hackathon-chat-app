import React from 'react';
import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';
import { useConversations } from '../contexts/ConversationsProvider';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Dashboard({ id, user }) {
  const history = useHistory();
  const { selectedConversation } = useConversations();

  const logout = async () => {
    await axios.get('/logout');
    history.push('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Button onClick={logout}>Logout</Button>
      <div
        className="d-flex"
        style={{
          height: '80vh',
          maxHeight: '800px',
          margin: '100px',
          width: '1000px',
          maxWidth: '1200px',
          backgroundColor: 'white',
          borderRadius: '5px',
        }}
      >
        <Sidebar id={id} user={user} />
        {selectedConversation && <OpenConversation />}
      </div>
    </div>
  );
}
