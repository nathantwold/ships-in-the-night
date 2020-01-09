import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import swal from 'sweetalert';

const styles = {
  inputs: {
    margin: '10px',
  },
  register: {
    margin: '10px',
    backgroundColor: '#4df95b',
  },
  login: {
    marginBottom: '20px',
    width: '100%',
    backgroundColor: '#4480ed'
  }
}

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: ''
  };

  registerUser = () => {
    if (this.state.password !== this.state.confirmPassword) {
      swal({ text: 'Please confirm password', icon: 'warning' });
    }
    else {
      if (this.state.username && this.state.password) {
        this.props.dispatch({
          type: 'REGISTER',
          payload: this.state
        });
        this.props.history.push('/fleet')
      } else {
        this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
      }
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Button variant="contained" style={styles.login}
          onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}>
          Back To Login
        </Button>
        <TextField
          style={styles.inputs}
          variant="outlined"
          label="username"
          type="text"
          value={this.state.username}
          onChange={this.handleInputChangeFor('username')}
        />
        <br />
        <TextField
          style={styles.inputs}
          variant="outlined"
          label="password"
          type="password"
          value={this.state.password}
          onChange={this.handleInputChangeFor('password')}
        />
        <br />
        <TextField
          style={styles.inputs}
          variant="outlined"
          label="confirm password"
          type="password"
          value={this.state.confirmPassword}
          onChange={this.handleInputChangeFor('confirmPassword')}
        />
        <br />
        <Button style={styles.register} variant="contained"
          onClick={this.registerUser}>Register</Button>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
      </div >
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

