import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class FleetPage extends Component {

    state = {
        fleet: {
            groupname: '',
            password: '',
            currentUser: this.props.user.id,
            newFleet: true
        }
    };

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
        } else {
            this.props.dispatch({
                type: 'JOIN_FLEET',
                payload: this.state.fleet
            })
        }
        this.props.dispatch({ type: 'GET_OPEN_TASKS' })
    }

    handleInputChangeFor = (event, input) => {
        this.setState({
            fleet: {
                ...this.state.fleet,
                [input]: event.target.value,
            }
        });
    }

    toggleFleet = () => {
        this.setState({
            fleet: {
                groupname: '',
                password: '',
                currentUser: this.props.user.id,
                newFleet: !this.state.fleet.newFleet,
            }
        })
    }

    render() {
        const style = {
            textAlign: "center",
        }

        return (
            <div style={style}>
                {this.state.fleet.newFleet === true ?
                    <Button onClick={this.toggleFleet} size="small" variant="outlined">Join a fleet</Button> :
                    <Button onClick={this.toggleFleet} size="small" variant="outlined">Create a new fleet</Button>
                }
                {this.state.newFleet === true ?
                    <h5>Enter a fleet name and password to create a fleet</h5> : <h5>Enter a fleet name and password to join a fleet</h5>
                }
                <TextField
                    id="fleetName"
                    label="Fleet Name"
                    value={this.state.fleet.groupname}
                    onChange={(event) => this.handleInputChangeFor(event, 'groupname')}
                    variant="outlined"
                />
                <TextField
                    id="password"
                    label="Password"
                    value={this.state.fleet.password}
                    onChange={(event) => this.handleInputChangeFor(event, 'password')}
                    variant="outlined"
                />
                <br />
                {this.state.fleet.newFleet === true ?
                    <Button onClick={this.checkFields} variant="outlined">Create!</Button> :
                    <Button onClick={this.checkFields} variant="outlined">Join!</Button>
                }
            </div>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(FleetPage);
