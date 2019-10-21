import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';

class FleetPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER' })
    }

    state = {
        fleet: {
            groupname: '',
            password: '',
            currentUser: this.props.reduxStore.user.id,
            username: this.props.reduxStore.user.username,
            newFleet: true
        }
    };

    styles = {
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
            width: '30%'
        },
        header: {
            textAlign: "center",
        }
    }

    handleInputChangeFor = (event, input) => {
        this.setState({
            fleet: {
                ...this.state.fleet,
                [input]: event.target.value,
            }
        });
    }

    // alert if fields are empty on submit
    checkFields = () => {
        if (this.state.fleet.groupname === '' || this.state.fleet.password === '') {
            swal('Missing info', 'Enter a fleet name and password!', 'warning');
        } else {
            this.handleSubmit();
        }
    }

    handleSubmit = () => {
        if (this.state.fleet.newFleet === true) {
            this.props.dispatch({
                type: 'NEW_FLEET',
                payload: this.state.fleet
            })
            this.props.dispatch({ type: 'GET_TASKS' })
            this.props.history.push('/home')
        } else {
            this.props.dispatch({
                type: 'JOIN_FLEET',
                payload: this.state.fleet
            })
            this.props.dispatch({ type: 'GET_TASKS' })
            this.props.history.push('/home')
        }
    }

    toggleFleet = () => {
        this.setState({
            fleet: {
                groupname: '',
                password: '',
                currentUser: this.props.reduxStore.user.id,
                newFleet: !this.state.fleet.newFleet,
                username: this.props.reduxStore.user.username,
            }
        })
    }

    render() {

        return (
            <Router>
                <div style={this.styles.header}>
                    {this.state.fleet.newFleet === true ?
                        <Button onClick={this.toggleFleet} size="small"
                            style={this.styles.button} variant="contained"
                        >
                            Join a fleet
                        </Button> :
                        <Button onClick={this.toggleFleet} size="small"
                            style={this.styles.button} variant="contained"
                        >
                            Create a new fleet
                        </Button>
                    }
                    <h5>Create or join a fleet to get started!</h5>
                    <br />
                    <TextField
                        id="fleetName"
                        style={this.styles.textField}
                        label="Fleet Name"
                        value={this.state.fleet.groupname}
                        onChange={(event) => this.handleInputChangeFor(event, 'groupname')}
                        variant="filled"
                    />
                    <TextField
                        id="password"
                        style={this.styles.textField}
                        label="Password"
                        type="password"
                        value={this.state.fleet.password}
                        onChange={(event) => this.handleInputChangeFor(event, 'password')}
                        variant="filled"
                    />
                    <br />
                    {this.state.fleet.newFleet === true ?
                        <Button onClick={this.checkFields}
                            style={this.styles.button} variant="contained"
                        >
                            Create!
                        </Button> :
                        <Button onClick={this.checkFields}
                            style={this.styles.button} variant="contained"
                        >
                            Join!
                        </Button>
                    }
                </div>
            </Router>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(FleetPage);
