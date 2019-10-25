import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, TextField, Grid } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import swal from 'sweetalert';

const styles = {
    textField: {
        marginTop: '10px',
        backgroundColor: '#e5f6f8',
        width: '100%',
    },
    button: {
        marginTop: '10px',
        marginBottom: '40px',
        width: '100%',
        fontSize: '8px',
        backgroundColor: '#4df95b',
    },
    div: {
        marginTop: '5px',
        marginBottom: '5px',
    },
    ///--- populate fields button for presentation ---\\\
    populate: {
        width: '100%',
        textAlign: 'center',
    }
}

class GroupInvite extends Component {

    componentDidMount = () => {
        this.getFleet();
    }

    getFleet = () => {
        this.props.dispatch({ type: 'FETCH_FLEET', payload: this.props.reduxStore.user });
    }

    state = {
        senderName: '',
        recipiantName: '',
        recipiantEmail: '',
        groupname: this.props.reduxStore.user.groupname,
    }

    handleInputChangeFor = (event, input) => {
        this.setState({
            ...this.state,
            [input]: event.target.value,
        });
    }

    handleSend = () => {
        const email = this.state;
        axios({
            method: "POST",
            url: "/api/invite",
            data: {
                email: email
            }
        }).then((response) => {
            if (response.data.msg === 'success') {
                swal({ text: 'Message sent!', icon: 'success' });
                this.resetForm()
                this.props.history.push('/fleetview');
            } else if (response.data.msg === 'fail') {
                swal({ text: 'Message failed to send.', icon: 'warning' })
            }
        })
    }

    resetForm = () => {
        this.setState({
            senderName: '',
            recipiantName: '',
            recipiantEmail: '',
            groupname: this.props.reduxStore.user.groupname,
        })
    }

    ///--- auto populate fields for presentation ---\\\
    populate = () => {
        this.setState({
            senderName: 'Megan',
            recipiantName: 'Nathan',
            recipiantEmail: 'natew79@gmail.com',
            groupname: this.props.reduxStore.user.groupname,
        })
    }

    render() {
        return (
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} style={styles.div}>
                        <TextField
                            required
                            value={this.state.senderName}
                            style={styles.textField}
                            label="Your Name"
                            variant="filled"
                            onChange={(event) => this.handleInputChangeFor(event, 'senderName')}
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>

                    {/* ONCLICK EVENT TO POPULATE FIELDS - DELETE THIS AFTER PRESENTATION */}
                    <Grid item xs={12} >
                        <button style={styles.populate} onClick={this.populate}></button>
                    </Grid>  
                    {/* ONCLICK EVENT TO POPULATE FIELDS - DELETE THIS AFTER PRESENTATION */}

                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} style={styles.div}>
                        <TextField
                            required
                            value={this.state.recipiantName}
                            style={styles.textField}
                            label="Recipiant Name"
                            variant="filled"
                            onChange={(event) => this.handleInputChangeFor(event, 'recipiantName')}
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} style={styles.div}>
                        <TextField
                            required
                            value={this.state.recipiantEmail}
                            type="email"
                            autoComplete="email"
                            style={styles.textField}
                            label="Recipiant Email"
                            variant="filled"
                            onChange={(event) => this.handleInputChangeFor(event, 'recipiantEmail')}
                        />
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4} style={styles.div}>
                        <Button style={styles.button} variant="contained" onClick={this.handleSend}>
                            <SendIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(GroupInvite);