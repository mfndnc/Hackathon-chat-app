import React, { Component } from 'react';
export default class Userdata extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    username: '',
  };

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ response: res.express }))
      .catch((err) => console.log(err));
    this.callIsLogged()
      .then((res) => this.setState({ username: res.username }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  callIsLogged = async () => {
    const response = await fetch('/auth/user/');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.username);

    return body;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div>
        <p>{this.state.response}</p>
        <p>{this.state.username}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={(e) => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p style={{ color: 'blue' }}>
          <b>{this.state.responseToPost}</b>
        </p>
      </div>
    );
  }
}
