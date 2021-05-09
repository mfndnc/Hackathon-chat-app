//https://stackoverflow.com/questions/63152640/passport-js-sessions-react-accessing-req-user-from-any-route-other-than-th
axios
  .get('http://localhost:5000/auth/user', { withCredentials: true })
  .then(console.log)
  .catch(console.error);
