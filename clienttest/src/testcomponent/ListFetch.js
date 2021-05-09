import React, { useState, useCallback } from 'react';

// this is a nice way to use loading fetch based on input user, but I can not figure out how to pass username input

const useFetch = (url) => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  const executeFetch = useCallback(
    async ({ options }) => {
      console.log('executeFetch called', options);
      setIsPending(true);
      setError(null);
      return await fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          setData(response);
          return response;
        })
        .catch((err) => {
          setError(err.message);
          return err;
        })
        .finally(() => setIsPending(false));
    },
    [url, setIsPending, setError]
  );
  return { executeFetch, error, isPending, data };
};

export default function ListFetch() {
  const [username, setUsername] = useState('');

  const { data, executeFetch, error, isPending } = useFetch(
    // change the URL to something wrong to test the error
    'https://jsonplaceholder.typicode.com/todos/'
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      console.log('handleSubmit called', event.target[0].value, event);
      // I am passing hardcoded {id:1} as an argument. this can
      // be a value from the state or user's input depending on your
      // application's logic.
      await executeFetch({ id: 1 }).then((response) => {
        // Here you will access to
        // data or error from promise.
        console.log('RESPONSE: ', response);
      });
    },
    [executeFetch]
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error != null && <div className="error">{error}</div>}
        <input
          className="input"
          type="text"
          name="username"
          placeholder="username"
          defaultValue=""
          required
        />
        <button type="submit">
          {!isPending && <span>Fetch Data</span>}
          {isPending && <h3>loading...</h3>}
        </button>
      </form>
      {data && (
        <ul>
          {data.map(({ title }, index) => (
            <li key={index}>
              <strong>title: </strong>
              {title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
