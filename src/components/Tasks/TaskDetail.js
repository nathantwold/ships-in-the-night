import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, TextField, Grid, Paper } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';

const styles = {
    text: {
        textAlign: 'center',
        margin: '0',
        padding: '0',
        backgroundColor: '#e5f6f8',
    },
    input: {
        width: '100%',
        margin: '10px',
        backgroundColor: '#e5f6f8',
    },
    button: {
        margin: '5px',
    },
    complete: {
        width: '100%',
        fontSize: '8px',
        backgroundColor: '#4df95b',
    },
    back: {
        width: '100%',
        fontSize: '8px',
        backgroundColor: '#4480ed',
    },
    delete: {
        width: '100%',
        fontSize: '8px',
        backgroundColor: '#e4878d',
    },
    textField: {
        width: '100%',
    }
}

class TaskDetail extends Component {

    state = {
        groupname: this.props.reduxStore.user.groupname,
        title: '',
        detail: '',
        id: '',
        username: '',
        due: null,
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
        // this.props.history.push('/home');
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
                <div>
                    {this.props.reduxStore.tasks.setDetailReducer.map(item => (
                        <div key={item.id}>
                            <Grid container spacing={0}>
                                <Grid item xs={12}>
                                    <Paper style={styles.text}>
                                        Entered on {moment(item.created).format("MMMM Do YYYY")}
                                        {item.due !== null ?
                                            <p style={styles.text}>Due: {moment(item.due).format("MMMM Do YYYY")}</p> :
                                            <p style={styles.text}>Due: ASAP</p>
                                        }
                                        {item.complete === false ?
                                            <p style={styles.text}>Claimed by: {item.username}</p> :
                                            <p style={styles.text}>Completed by: {item.username}</p>
                                        }
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={6}>
                                    <Paper style={styles.input}>
                                        <TextField
                                            defaultValue={item.title}
                                            style={styles.textField}
                                            label="Title*"
                                            variant="filled"
                                            onChange={(event) => this.handleInputChangeFor(event, 'title')}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={10}>
                                    <Paper style={styles.input}>
                                        <TextField
                                            defaultValue={item.detail}
                                            style={styles.textField}
                                            label="Details"
                                            variant="filled"
                                            multiline rows="6"
                                            onChange={(event) => this.handleInputChangeFor(event, 'detail')}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}></Grid>
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
                                <Grid item xs={3}></Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Paper style={styles.button}>
                                        <Button style={styles.back} variant="contained" onClick={this.checkFields}>
                                            <ArrowBackIosIcon />
                                            Save
                                        </Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    {item.complete === false ?
                                        <Paper style={styles.button}>
                                            <Button style={styles.complete} variant="contained" onClick={() => { this.handleComplete(item) }}>
                                                Complete
                                                <CheckCircleIcon />
                                            </Button>
                                        </Paper> :
                                        <Paper style={styles.button}>
                                            <Button style={styles.complete} variant="contained" onClick={() => { this.handleComplete(item) }}>
                                                Re-Open
                                                <ReplayIcon />
                                            </Button>
                                        </Paper>
                                    }
                                </Grid>
                                <Grid item xs={3}>
                                    <Paper style={styles.button}>
                                        <Button style={styles.delete} variant="contained" onClick={() => { this.handleDelete(item) }}>
                                            Delete
                                            <DeleteIcon />
                                        </Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={1}></Grid>
                            </Grid>
                        </div>
                    ))}
                </div>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(TaskDetail);