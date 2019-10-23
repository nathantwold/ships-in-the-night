import React, { Component } from "react";
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import swal from 'sweetalert';

const styles = {
    textField: {
        marginLeft: '20%',
        marginRight: '20%',
        marginTop: '5%',
        width: '60%'
    },
    button: {
        marginLeft: '40%',
        marginRight: '40%',
        marginTop: '5%',
        marginBottom: '40px',
        width: '20%',
        fontSize: '8px',
        backgroundColor: 'lightgreen',
    },
}

class NewTask extends Component {

    componentDidMount = () => {
        this.getFleet();
    }

    getFleet = () => {
        this.props.dispatch({ type: 'FETCH_FLEET', payload: this.props.reduxStore.user });
    }

    state = {
        groupname: this.props.reduxStore.user.groupname,
        title: '',
        detail: '',
        username: 'none',
        due: null
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
                    <FormControl variant="filled" style={styles.textField}>
                        <InputLabel>
                            Assignment
                        </InputLabel>
                        <Select
                            value={this.state.username}
                            onChange={(event) => this.handleInputChangeFor(event, 'username')}
                        >
                            <MenuItem value={'none'}>Open</MenuItem>
                            {this.props.reduxStore.fleet.map(user => (
                            <MenuItem key={user.id} value={user.username}>{user.username}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br />
                    <Button style={styles.button} variant="contained" onClick={this.checkFields}>
                        <PlaylistAddCheckIcon />
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