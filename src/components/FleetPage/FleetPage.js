import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class FleetPage extends Component {
    state = {
        fleet: {
            groupname: '',
            password: '',
        },
        newFleet: true
    };

    handleSubmit = () => {
        console.log(this.state);

        // if (this.state.groupname && this.state.password) {
        //     this.props.dispatch({
        //         type: 'NEW_FLEET',
        //         payload: {
        //             groupname: this.state.groupname,
        //             password: this.state.password,
        //         },
        //     });
        // } else {
        //     alert('Enter a new fleet name and password to create a fleet, or an existing name and password to join a fleet');
        // }
    } // end login

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            fleet: {
                [propertyName]: event.target.value,
            }
        });
    }

    toggleFleet = () => {
        this.setState({
            newFleet: !this.state.newFleet
        })
        console.log(this.state);
    }

    render() {
        const style = {
            textAlign: "center",
        }

        return (
            <div style={style}>
                {this.state.newFleet === true ?
                    <Button onClick={this.toggleFleet} size="small" variant="outlined">Join a fleet</Button> :
                    <Button onClick={this.toggleFleet} size="small" variant="outlined">Create a new fleet</Button>
                }
                {this.state.newFleet === true ?
                    <h5>Enter a fleet name and password to create a fleet</h5> : <h5>Enter a fleet name and password to join a fleet</h5>
                }
                <TextField
                    id="fleetName"
                    label="Fleet Name"
                    onChange={this.handleInputChangeFor('groupname')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="password"
                    label="Password"
                    onChange={this.handleInputChangeFor('password')}
                    margin="normal"
                    variant="outlined"
                />
                <br />
                {this.state.newFleet === true ?
                    <Button onClick={this.handleSubmit} variant="outlined">Create!</Button> :
                    <Button onClick={this.handleSubmit} variant="outlined">Join!</Button>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FleetPage);
