import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, Grid, Paper } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CancelIcon from '@material-ui/icons/Cancel';
import swal from 'sweetalert';

const styles = {
    main: {
        textAlign: "left",
    },
    crew: {
        margin: "5px",
        float: "right",
        fontSize: "10px",
        backgroundColor: "green",
    },
    button: {
        margin: "5px",
        float: "right",
        fontSize: "10px",
        backgroundColor: "#e4878d",
    },
    div: {
        margin: "10px",
        height: "45px",
    }
}

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

    render() {
        return (
            <div style={styles.main}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Paper style={styles.div}>
                            {this.props.reduxStore.user.groupname}
                            <Button style={styles.crew} onClick={this.sendInvite} variant="contained">
                                <GroupAddIcon />
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>




                {this.props.reduxStore.fleet.map(user => (
                    <div key={user.id}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <Paper style={styles.div}>
                                    {user.username}
                                    {user.id === this.props.reduxStore.user.id ?
                                        <Button onClick={() => { this.leaveFleet(user) }}
                                            style={styles.button} variant="contained" >
                                            Leave fleet
                                            <CancelIcon />
                                        </Button> :
                                        <Button onClick={() => { this.removeUser(user) }}
                                            style={styles.button} variant="contained" >
                                            Remove
                                            <CancelIcon />
                                        </Button>
                                    }
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                ))}







                {/* {this.props.reduxStore.fleet.map(user => (
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
                ))} */}
            </div>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(FleetView);