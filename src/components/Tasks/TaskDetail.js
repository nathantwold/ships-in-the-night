import React, { Component } from "react";
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import moment from 'moment';
import { Button, TextField } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import swal from 'sweetalert';

class TaskDetail extends Component {

    state = {
        groupname: this.props.reduxStore.user.groupname,
        title: '',
        detail: '',
        id: '',
        username: '',
    }

    style = {
        textField: {
            marginLeft: '20%',
            marginRight: '20%',
            marginTop: '5%',
            width: '60%',
        },
        button: {
            marginLeft: '35%',
            marginRight: '35%',
            marginTop: '5%',
            width: '30%',
            marginBottom: '5%',
            backgroundColor: 'seagreen',
        },
        delete: {
            marginLeft: '35%',
            marginRight: '35%',
            marginTop: '5%',
            width: '30%',
            marginBottom: '15%',
            backgroundColor: 'red',
        },
        options: {
            textAlign: 'center',
        }
    }

    componentDidMount = () => {
        this.getDetail();
    }

    componentDidUpdate(preProps) {
        if (this.props.reduxStore.tasks.setDetailReducer !== preProps.reduxStore.tasks.setDetailReducer) {
            this.setStateToCurrent();
        }
    }

    setStateToCurrent = () => {
        this.props.reduxStore.tasks.setDetailReducer.forEach(item => {
            this.setState({
                groupname: this.props.reduxStore.user.groupname,
                title: item.title,
                detail: item.detail,
                id: item.id,
                username: this.props.reduxStore.user.username,
            })
        })
    }

    getDetail = () => {
        console.log(this.props.match.params);
        this.props.dispatch({ type: 'GET_DETAIL', payload: this.props.match.params });
    }

    handleClaim = () => {
        console.log('In own: ', this.state);
        this.props.dispatch({ type: 'CLAIM_TASK', payload: this.state })
        this.props.dispatch({ type: 'GET_TASKS', payload: this.state })
        this.props.history.push('/home')
    }

    handleComplete = (item) => {
        this.props.dispatch({ type: 'COMPLETE_TASK', payload: item });
        this.props.history.push('/home');
    }

    handleDelete = (item) => {
        this.props.dispatch({ type: 'DELETE_TASK', payload: item });
        this.props.history.push('/home');
    }

    handleBack = () => {
        this.props.history.push('/home');
    }

    handleInputChangeFor = (event, input) => {
        this.setState({
            ...this.state,
            [input]: event.target.value,
        });
    }

    checkFields = () => {
        if (this.state.title === '') {
            swal('Please enter a task title!');
        } else {
            this.handleSubmit();
        }
    }

    handleSubmit = () => {
        this.props.dispatch({ type: 'EDIT_TASK', payload: this.state })
        this.props.history.push('/home')
        swal('Success!  Your task has been updated!');
    }

    render() {
        return (
            <Router>
                <div>
                    {this.props.reduxStore.tasks.setDetailReducer.map(item => (
                        <div key={item.id}>
                            <h5>Entered on {moment(item.created).format("MMMM Do YYYY")}</h5>
                            <h5>Currently claimed by: {item.username}</h5>
                            <TextField
                                defaultValue={item.title}
                                style={this.style.textField}
                                label="Task Title*"
                                variant="filled"
                                onChange={(event) => this.handleInputChangeFor(event, 'title')}
                            />
                            <br />
                            <TextField
                                defaultValue={item.detail}
                                style={this.style.textField}
                                label="Task Details"
                                variant="filled"
                                multiline rows="6"
                                onChange={(event) => this.handleInputChangeFor(event, 'detail')}
                            />
                            <br />
                            <Button style={this.style.button} variant="contained" onClick={this.checkFields}>
                                Save
                            </Button>
                            <div style={this.style.options}>
                                <Button variant="contained" onClick={this.handleBack}>Back</Button>
                                <Button variant="contained" onClick={() => { this.handleComplete(item) }}>Complete</Button>
                                <Button variant="contained" onClick={this.handleClaim}>Claim</Button>
                            </div>
                            <Button style={this.style.delete} variant="contained" 
                                onClick={() => { this.handleDelete(item) }}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </div>
            </Router>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(TaskDetail);