import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

class HeaderWelcome extends Component {
    render() {
        return (
            <div className="header">
                <h6 className="header-welcome">
                    Awaiting orders, Captain {this.props.reduxStore.user.username}.
                </h6>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(HeaderWelcome);
