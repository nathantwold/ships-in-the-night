import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';

const styles = {
    textField: {
        marginTop: '10px',
        width: '240px',
        backgroundColor: '#e5f6f8',
    },
    toggle: {
        marginTop: '10px',
        width: '150px',
    },
    button: {
        marginTop: '10px',
        width: '150px',
        backgroundColor: "#4df95b",
    },
    header: {
        textAlign: 'center',
    },
    text: {
        fontFamily: 'garamond',
        fontSize: '24px',
        marginBottom: '0',
        marginTop: '10px',
        marginLeft: '20px',
        marginRight: '20px',
    }
}

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
            swal(`You are now the commander of ${this.state.fleet.groupname} fleet!`)
                .then(this.props.history.push('/home'));
            this.props.dispatch({ type: 'GET_TASKS' })
        } else {
            this.props.dispatch({
                type: 'JOIN_FLEET',
                payload: this.state.fleet
            })
            this.props.dispatch({ type: 'GET_TASKS' })
            swal(`Welcome to the fleet, Captain ${this.state.fleet.username}!`)
                .then(this.props.history.push('/home'));
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
                <div style={styles.header}>
                    <Button onClick={this.toggleFleet} size="small"
                        style={styles.toggle} variant="contained"
                    >
                        Create / Join
                    </Button>
                    <h5 style={styles.text}>Create or join a fleet to get started!</h5>
                    <br />
                    <TextField
                        id="fleetName"
                        style={styles.textField}
                        label="Fleet Name"
                        value={this.state.fleet.groupname}
                        onChange={(event) => this.handleInputChangeFor(event, 'groupname')}
                        variant="filled"
                    />
                    <br />
                    <TextField
                        id="password"
                        style={styles.textField}
                        label="Password"
                        type="password"
                        value={this.state.fleet.password}
                        onChange={(event) => this.handleInputChangeFor(event, 'password')}
                        variant="filled"
                    />
                    <br />
                    {this.state.fleet.newFleet === true ?
                        <Button onClick={this.checkFields}
                            style={styles.button} variant="contained"
                        >
                            Create!
                        </Button> :
                        <Button onClick={this.checkFields}
                            style={styles.button} variant="contained"
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
