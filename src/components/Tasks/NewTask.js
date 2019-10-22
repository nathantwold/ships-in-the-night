import React, { Component } from "react";
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import swal from 'sweetalert';

const styles = {
    textField: {
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: '5%',
        width: '60%'
    },
    button: {
        marginLeft: '35%',
        marginRight: '35%',
        marginTop: '5%',
        width: '30%',
        fontSize: '8px',
        backgroundColor: 'lightgreen',
    },
}

class NewTask extends Component {

    state = {
        groupname: this.props.reduxStore.user.groupname,
        title: '',
        detail: '',
        due: ''
    }

    handleInputChangeFor = (event, input) => {
        this.setState({
            ...this.state,
            [input]: event.target.value,
        });
    }

    checkFields = () => {
        if (this.state.title === '') {
            swal('Missing info', 'Enter a task title!', 'warning');
        } else {
            this.handleSubmit();
        }
    }

    handleSubmit = () => {
        this.props.dispatch({ type: 'ADD_TASK', payload: this.state });
        swal('Success', 'Your task has been created!', 'success')
            .then(this.props.history.push('/home'));
    }

    render() {
        return (
            <Router>
                <div>
                    <TextField
                        required
                        style={styles.textField}
                        label="Task Title"
                        variant="filled"
                        onChange={(event) => this.handleInputChangeFor(event, 'title')}
                    />
                    <br />
                    <TextField
                        style={styles.textField}
                        label="Task Details"
                        variant="filled"
                        multiline rows="6"
                        onChange={(event) => this.handleInputChangeFor(event, 'detail')}
                    />
                    <br />
                    <TextField
                        style={styles.textField}
                        label="Due date"
                        variant="filled"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => this.handleInputChangeFor(event, 'due')}
                    />
                    <br />
                    <Button style={styles.button} variant="contained" onClick={this.checkFields}>
                        Add Task!
                        <CheckCircleIcon />
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