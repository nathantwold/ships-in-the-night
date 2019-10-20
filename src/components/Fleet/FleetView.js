import React, { Component } from "react";
import { connect } from 'react-redux';

class FleetView extends Component {
    componentDidMount = () => {
        this.getFleet();
    }

    getFleet = () => {
        this.props.dispatch({ type: 'FETCH_FLEET', payload: this.props.reduxStore.user });
    }

    render() {
        return (
            <div>  
                <h2>In fleet view</h2>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(FleetView);