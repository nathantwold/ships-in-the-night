import React, { Component } from "react";
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import moment from 'moment';
import { Button, TextField, Grid, Paper } from '@material-ui/core';
import swal from 'sweetalert';


const styles = {
    input: {
        margin: '5px',
    },
    textField: {
        width: '100%',
    },
    button: {
        width: '100%',
    },
    delete: {
        width: '100%',
    },
    text: {
        textAlign: 'center',
    }
}

class TaskDetail extends Component {

    state = {
        groupname: this.props.reduxStore.user.groupname,
        title: '',
        detail: '',
        id: '',
        username: '',
        due: '',
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
                due: item.due,
            })
        })
    }

    getDetail = () => {
        this.props.dispatch({ type: 'GET_DETAIL', payload: this.props.match.params });
    }

    handleClaim = () => {
        this.props.dispatch({ type: 'CLAIM_TASK', payload: this.state })
        swal({ text: 'The task is yours, Captain!', icon: 'success' });
        this.props.history.push('/home');
    }

    handleComplete = (item) => {
        this.props.dispatch({ type: 'COMPLETE_TASK', payload: item });
        if (item.complete === false) {
            swal({ text: 'Nice work, Captain!', icon: 'success' })
        } else {
            swal({ text: 'Task has been re-opened!', icon: 'success' })
        }
        this.props.history.push('/home');
    }

    handleDelete = (item) => {
        this.props.dispatch({ type: 'DELETE_TASK', payload: item });
        swal({ text: 'Task deleted!', icon: 'success' })
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
            swal('Missing info', 'Please enter a task title!', 'warning');
        } else {
            this.handleSubmit();
        }
    }

    handleSubmit = () => {
        this.props.dispatch({ type: 'EDIT_TASK', payload: this.state })
        this.props.history.push('/home')
        // swal('Success', 'Your task has been updated!', 'success');
    }

    render() {
        return (
            <Router>
                <div>
                    {this.props.reduxStore.tasks.setDetailReducer.map(item => (
                        <div key={item.id}>
                            <Grid container spacing={0}>
                                <Grid item xs={12}>
                                    <Paper style={styles.text}>Entered on {moment(item.created).format("MMMM Do YYYY")}</Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    {item.complete === false ?
                                        <Paper style={styles.input}>Claimed by: {item.username}</Paper> :
                                        <Paper style={styles.input}>Completed by: {item.username}</Paper>
                                    }
                                </Grid>
                                <Grid item xs={6}>
                                    {item.due !== null ?
                                        <Paper style={styles.input}>Due: {moment(item.due).format("MMM Do YY")}</Paper> : 
                                        <Paper style={styles.input}>Due: </Paper>
                                    }
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper></Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper style={styles.input}>
                                        <TextField
                                            defaultValue={item.title}
                                            style={styles.textField}
                                            label="Task Title*"
                                            variant="filled"
                                            onChange={(event) => this.handleInputChangeFor(event, 'title')}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper></Paper>
                                </Grid>
                                <Grid item xs={2}>
                                    <Paper></Paper>
                                </Grid>
                                <Grid item xs={8}>
                                    <Paper style={styles.input}>
                                        <TextField
                                            defaultValue={item.detail}
                                            style={styles.textField}
                                            label="Task Details"
                                            variant="filled"
                                            multiline rows="6"
                                            onChange={(event) => this.handleInputChangeFor(event, 'detail')}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={2}>
                                    <Paper></Paper>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper></Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper style={styles.input}>
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
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper style={styles.input}>
                                        <Button style={styles.button} variant="contained" onClick={this.checkFields}>
                                            Back
                                        </Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    {item.complete === false ?
                                        <Paper style={styles.input}>
                                            <Button style={styles.button} variant="contained" onClick={() => { this.handleComplete(item) }}>
                                                Complete
                                            </Button>
                                        </Paper> :
                                        <Paper style={styles.input}>
                                            <Button style={styles.button} variant="contained" onClick={() => { this.handleComplete(item) }}>
                                                Re-Open
                                            </Button>
                                        </Paper>
                                    }
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper style={styles.input}>
                                        <Button style={styles.button} variant="contained" onClick={this.handleClaim}>
                                            Claim
                                        </Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper></Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper style={styles.input}>
                                        <Button style={styles.button} variant="contained" onClick={() => {this.handleDelete(item)}}>
                                            Delete
                                        </Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper></Paper>
                                </Grid>
                            </Grid>
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