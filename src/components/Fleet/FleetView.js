import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, Grid, Paper, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CancelIcon from '@material-ui/icons/Cancel';
import StarsIcon from '@material-ui/icons/Stars';
import PersonIcon from '@material-ui/icons/Person';
import swal from 'sweetalert';

const styles = {
    fleet: {
        margin: "10px",
    },
    container: {
        width: "80%",
        height: "100%",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "20px",
        fontSize: "28px",
        fontFamily: "cursive",
    },
    each: {
        fontFamily: "cursive",
        fontSize: "24px",
        margin: "0",
    },
    invite: {
        margin: "5px",
        float: "right",
        fontSize: "10px",
        backgroundColor: "#4df95b",
    },
    button: {
        margin: "5px",
        float: "right",
        fontSize: "10px",
        backgroundColor: "#e4878d",
    },
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
        this.props.history.push('/invite');
    }

    render() {
        return (
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Paper style={styles.container}>
                            <div style={styles.fleet}>
                                {this.props.reduxStore.user.groupname}
                                <Button style={styles.invite} onClick={this.sendInvite} variant="contained">
                                    Invite
                                    <GroupAddIcon />
                                </Button>
                            </div>
                            <List>
                                <Divider />
                                <Divider />
                                {this.props.reduxStore.fleet.map(user => (
                                    <div key={user.id}>
                                        <Divider />
                                        <ListItem button>
                                            {user.admin_level === 1 ?
                                                <ListItemText>
                                                    <StarsIcon />
                                                </ListItemText> :
                                                <ListItemText>
                                                    <PersonIcon />
                                                </ListItemText>
                                            }
                                            <ListItemText >
                                                <h3 style={styles.each}>{user.username}</h3>
                                            </ListItemText>
                                            {user.id === this.props.reduxStore.user.id ?
                                                <Button onClick={() => { this.leaveFleet(user) }}
                                                    style={styles.button} variant="contained" >
                                                    Leave
                                                    <CancelIcon />
                                                </Button> :
                                                <Button onClick={() => { this.removeUser(user) }}
                                                    style={styles.button} variant="contained" >
                                                    Remove
                                                    <CancelIcon />
                                                </Button>
                                            }
                                        </ListItem>
                                    </div>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(FleetView);