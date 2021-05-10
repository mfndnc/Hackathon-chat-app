import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';

export default function Contacts() {
  const { contacts } = useContacts();

  return (
    <ListGroup variant="flush">
      {contacts.map((contact) => (
        <ListGroup.Item key={contact.id}>
          {contact.fullName} / {contact.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
