import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class FleetPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER' })
    }

    state = {
        fleet: {
            groupname: '',
            password: '',
            currentUser: this.props.reduxStore.user.id,
            newFleet: true
        }
    };

    style = {
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
            alert('Fleet name and password are required!');
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
            this.props.history.push('/home')
        } else {
            this.props.dispatch({
                type: 'JOIN_FLEET',
                payload: this.state.fleet
            })
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
            }
        })
    }

    render() {
        const style = {
            textAlign: "center",
        }

        return (
            <Router>
                <div style={style}>
                    {this.state.fleet.newFleet === true ?
                        <Button onClick={this.toggleFleet} size="small"
                            style={this.style.button} variant="contained"
                        >
                            Join a fleet
                        </Button> :
                        <Button onClick={this.toggleFleet} size="small"
                            style={this.style.button} variant="contained"
                        >
                            Create a new fleet
                        </Button>
                    }
                    <h5>Create or join a fleet to get started!</h5>
                    <br />
                    <TextField
                        id="fleetName"
                        style={this.style.textField}
                        label="Fleet Name"
                        value={this.state.fleet.groupname}
                        onChange={(event) => this.handleInputChangeFor(event, 'groupname')}
                        variant="filled"
                    />
                    <TextField
                        id="password"
                        style={this.style.textField}
                        label="Password"
                        type="password"
                        value={this.state.fleet.password}
                        onChange={(event) => this.handleInputChangeFor(event, 'password')}
                        variant="filled"
                    />
                    <br />
                    {this.state.fleet.newFleet === true ?
                        <Button onClick={this.checkFields}
                            style={this.style.button} variant="contained"
                        >
                            Create!
                        </Button> :
                        <Button onClick={this.checkFields}
                            style={this.style.button} variant="contained"
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
