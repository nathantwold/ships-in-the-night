import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = () => {
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: this.state
      });
      this.props.history.push('/home');
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <Button variant="contained" onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}>
          Register
        </Button>
        <div>
          <TextField
            variant="outlined"
            label="username"
            type="text"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
          />
          <br />
          <TextField
            variant="outlined"
            label="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
          />
          <br />
          <Button variant="contained" onClick={this.login}>Log in</Button>
        </div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
