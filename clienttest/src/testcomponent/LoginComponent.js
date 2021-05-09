import React from 'react';

export default class LoginComponent extends React.Component {
  state = {
    movies: moviesData,
    title: '',
    director: '',
    hasOscars: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, director, hasOscars } = this.state;
    const newMovie = {
      title,
      director,
      hasOscars,
      id: uuidv4(),
    };
    console.log(newMovie);
    this.setState((state) => ({
      movies: [newMovie, ...state.movies],
      director: '',
      title: '',
      hasOscars: false,
    }));
  };

  callApi = async () => {
    const response = await fetch(`${process.env.REACT_APP_USERAPI}/login`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: myName,
        password: myPassword,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form onSubmit={handleSubmit}>
        <label className="label">Username</label>

        <input
          className="input"
          type="text"
          placeholder="username"
          name="username"
          defaultValue=""
          required
        />

        <label className="label">password</label>

        <input
          className="input"
          type="password"
          placeholder="password"
          name="password"
          defaultValue=""
          required
        />

        <button type="submit">submit</button>
      </form>
    );
  }
}
