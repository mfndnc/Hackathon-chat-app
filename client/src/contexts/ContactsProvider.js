import React, { useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = React.createContext();

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  useEffect(() => {
    console.log('ContactsProvider useEffect');

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
      } catch (e) {
        console.log(e);
      }
    };
    getContacts();
  }, []);

  function createContact(id, name) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
