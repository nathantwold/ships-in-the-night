import React, { Component } from "react";
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

class NewTask extends Component {

    state = {
        groupname: this.props.reduxStore.user.groupname,
        title: '',
        detail: '',
    }

    style = {
        textField: {
            marginLeft: '20%',
            marginRight: '20%',
            marginTop: '5%',
            width: '60%'
        },
    }

    handleInputChangeFor = (event, input) => {
        this.setState({
            ...this.state,
            [input]: event.target.value,
        });
    }

    checkFields = () => {
        if (this.state.title === '') {
            alert('Please enter a task title!');
        } else {
            this.handleSubmit();
        }
    }

    handleSubmit = () => {
        this.props.dispatch({
            type: 'ADD_TASK',
            payload: this.state
        })
        this.props.dispatch({ type: 'GET_TASKS', payload: this.props.reduxStore.user })
        this.props.history.push('/home')
        alert('Success!  Your task has been created!');
    }

    render() {
        return (
            <Router>
                <div>
                    <TextField
                        required
                        style={this.style.textField}
                        label="Task Title"
                        variant="filled"
                        onChange={(event) => this.handleInputChangeFor(event, 'title')}
                    />
                    <br />
                    <TextField
                        style={this.style.textField}
                        label="Task Details"
                        variant="filled"
                        multiline rows="6"
                        onChange={(event) => this.handleInputChangeFor(event, 'detail')}
                    />
                    <br />
                    <Button style={this.style.textField} variant="contained" onClick={this.checkFields}>
                        Add Task!
                    </Button>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(NewTask);