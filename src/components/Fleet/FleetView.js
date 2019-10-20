import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

class FleetView extends Component {
    componentDidMount = () => {
        this.getFleet();
    }

    getFleet = () => {
        this.props.dispatch({ type: 'FETCH_FLEET', payload: this.props.reduxStore.user });
    }

    authorizeRemove = (user) => {
        if (this.props.reduxStore.user.admin_level === 1) {
            console.log(user);
            // this.props.dispatch({ type: 'REMOVE_USER', payload: user });
        } else {
            alert('Request denied. Only the fleet commander can remove ');
        }
    }

    render() {
        return (
            <div>
                {this.props.reduxStore.fleet.map(user => (
                    <div key={user.id}>
                        <h4>{user.username}</h4>
                        {user.id === this.props.reduxStore.user.id ?
                            <Button onClick={() => console.log(user.id)}>
                                Leave fleet
                            </Button> :
                            <Button onClick={() => {this.authorizeRemove(user)}}>
                                Remove
                            </Button>
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