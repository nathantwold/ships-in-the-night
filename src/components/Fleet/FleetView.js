import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
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
            swal({
                text: `Are you sure you wish to remove ${user.username} from the fleet?`,
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        this.props.dispatch({ type: 'REMOVE_USER', payload: user });
                        swal(`${user.username} has left the fleet!`, {
                            icon: "success",
                        });
                    } else {
                        swal('Cancelled!');
                    }
                });
            this.getFleet();
        } else {
            swal('Request denied', 'Only the fleet commander can remove a user.', 'warning');
        }
    }

    leaveFleet = (user) => {
        swal({
            text: `Are you sure you wish to leave ${user.groupname} fleet?`,
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.dispatch({ type: 'REMOVE_USER', payload: user });
                    swal('You have left the fleet!', {
                        icon: "success",
                    });
                    this.props.history.push('/fleet');
                } else {
                    swal('Cancelled!');
                }
            });
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
                        <GroupAddIcon />
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