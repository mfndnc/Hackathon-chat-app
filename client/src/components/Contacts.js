import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';

export default function Contacts() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    console.log('Contacts useEffect');
    const getContacts = async () => {
      const apiforallusers = process.env.REACT_APP_USERS || '/api/users';
      try {
        const response = await fetch(`${apiforallusers}`);
        const json = await response.json();
        console.log('getContacts json', json);
        setContacts(
          json.data.map((e) => ({
            id: e._id,
            name: e.username,
            fullName: e.fullName,
            username: e.username,
          }))
        );
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getContacts();
  }, []);

  if (loading) return <div>Loading ...</div>;

  //const { contacts } = useContacts();

  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => (
        <ListGroup.Item key={contact.id}>
          {contact.name} / {contact.username}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
