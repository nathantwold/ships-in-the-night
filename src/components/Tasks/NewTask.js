import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, TextField, Grid } from '@material-ui/core';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import swal from 'sweetalert';

const styles = {
    textField: {
        backgroundColor: '#e5f6f8',
        width: '100%',
    },
    button: {
        marginBottom: '40px',
        width: '100%',
        fontSize: '8px',
        backgroundColor: '#4df95b',
    },
    randomBut: {
        backgroundColor: '#4480ed',
        fontSize: '12px',
        padding: '10%',
        width: '90%',
        height: '90%',
    },
    div: {
        marginTop: '10px',
        marginBottom: '5px',
    }
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
        due: null,
        random: false,
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

    randomPicker = () => {
        let min = 0;
        let max = this.props.reduxStore.fleet.length - 1;
        let randomNum = this.randomNumber(min, max)
        let randomUser = this.props.reduxStore.fleet[randomNum]
        this.setState({ username: randomUser.username, random: true })
    }

    randomNumber = (min, max) => {
        return Math.floor(Math.random() * (1 + max - min) + min);
    }

    render() {
        return (
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} style={styles.div}>
                        <TextField
                            required
                            defaultValue={this.state.title}
                            style={styles.textField}
                            label="Title"
                            variant="filled"
                            onChange={(event) => this.handleInputChangeFor(event, 'title')}
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} style={styles.div}>
                        <TextField
                            defaultValue={this.state.detail}
                            style={styles.textField}
                            label="Details"
                            variant="filled"
                            multiline rows="6"
                            onChange={(event) => this.handleInputChangeFor(event, 'detail')}
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} style={styles.div}>
                        <TextField
                            style={styles.textField}
                            label="Due"
                            variant="filled"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => this.handleInputChangeFor(event, 'due')}
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={3} style={styles.div}>
                        <Button variant="contained" style={styles.randomBut} disabled={this.state.random}
                            onClick={this.randomPicker}>
                            Assign random
                            </Button>
                    </Grid>
                    <Grid item xs={5} style={styles.div}>
                        <TextField
                            label="Assign to: "
                            style={styles.textField}
                            variant="filled"
                            value={this.state.username}
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4} style={styles.div}>
                        <Button style={styles.button} variant="contained" onClick={this.checkFields}>
                            <PlaylistAddCheckIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(NewTask);