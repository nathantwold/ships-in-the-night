import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import swal from 'sweetalert';

class FleetView extends Component {
    componentDidMount = () => {
        this.getFleet();
    }

    getFleet = () => {
        this.props.dispatch({ type: 'FETCH_FLEET', payload: this.props.reduxStore.user });
    }

    removeUser = (user) => {
        if (this.props.reduxStore.user.admin_level === 1) {
            this.props.dispatch({ type: 'REMOVE_USER', payload: user });
            this.getFleet();
        } else {
            swal('Request denied. Only the fleet commander can remove a user.');
        }
    }

    leaveFleet = (user) => {
        if (window.confirm(`Are you sure you wish to leave ${user.groupname} fleet?`)) {
            this.props.dispatch({ type: 'REMOVE_USER', payload: user });
            this.props.history.push('/fleet');
        }
    }

    sendInvite = () => {
        console.log('sending invite');
    }

    styles = {
        main: {
            textAlign: "center",
        },
        button: {
            margin: "10px",
        }
    }

    render() {
        return (
            <div style={this.styles.main}>
                {this.props.reduxStore.user.groupname !== "0" ?
                    <Button style={this.styles.button} onClick={this.sendInvite} variant="contained">
                        Send fleet invite
                    </Button> : ''
                }
                {this.props.reduxStore.fleet.map(user => (
                    <div key={user.id}>
                        {user.id === this.props.reduxStore.user.id ?
                            <div>
                                <h4>{user.username}</h4>
                                <Button variant="contained" onClick={() => { this.leaveFleet(user) }}>
                                    Leave fleet
                                </Button>
                            </div> : ''
                        }
                    </div>
                ))}
                {this.props.reduxStore.fleet.map(user => (
                    <div key={user.id}>
                        {user.id !== this.props.reduxStore.user.id ?
                            <div>
                                <h4>{user.username}</h4>
                                <Button variant="contained" onClick={() => { this.removeUser(user) }}>
                                    Remove
                                </Button>
                            </div> : ''
                        }
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(FleetView);