import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h2 className="header-title">Ships <br /> in <br /> the <br /> Night </h2>
      </div>
    )
  }
}

const mapStateToProps = reduxStore => ({
  reduxStore,
});

export default connect(mapStateToProps)(Header);
