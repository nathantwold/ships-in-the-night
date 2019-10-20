import React, { Component } from 'react';
import { connect } from 'react-redux';
// import HeaderWelcome from './HeaderWelcome';
import './Header.css';

// const styles = {
//   header: {
//     position: "fixed",
//     top: "0",
//     width: "100%",
//   }
// }

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h2 className="header-title">Ships in the Night</h2>
        {/* {this.props.reduxStore.user.groupname ?
          <HeaderWelcome /> : ''
        } */}
      </div>
    )
  }
}

const mapStateToProps = reduxStore => ({
  reduxStore,
});

export default connect(mapStateToProps)(Header);
