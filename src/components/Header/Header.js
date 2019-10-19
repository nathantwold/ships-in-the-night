import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h2 className="header-title">Ships in the Night</h2>
        
        {this.props.reduxStore.user.id ? 
        <h6 className="header-welcome">
          Welcome, Captain {this.props.reduxStore.user.username} of the {this.props.reduxStore.user.groupname} fleet!
        </h6> : ''
        }
      </div>
    )
  }
}

const mapStateToProps = reduxStore => ({
  reduxStore,
});

export default connect(mapStateToProps)(Header);
