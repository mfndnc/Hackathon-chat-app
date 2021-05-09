import React, { useRef, useState, useEffect } from 'react';

export default function ShowUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Container useEffect');
    const getUser = async () => {
      const response = await fetch('/api/users/');
      const json = await response.json();

      if (json && json.success) setUsers(json.data);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) return <div>Loading ...</div>;

  if (!loading && users && users.length > 0)
    return (
      <div>
        ALL USERS:
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.fullName}</li>
          ))}
        </ul>
      </div>
    );

  return <div>NOTHING</div>;
}
