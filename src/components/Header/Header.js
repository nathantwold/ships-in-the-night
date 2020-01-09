import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h2 className="header-main">
          Ships
        </h2>
        <br />
        <p className="header-sub">in the</p>
        <br />
        <h2 className="header-main"> Night </h2>
      </div>
    )
  }
}

const mapStateToProps = reduxStore => ({
  reduxStore,
});

export default connect(mapStateToProps)(Header);
