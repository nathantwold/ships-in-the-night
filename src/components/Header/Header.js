import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        <h2 className="header-title">Ships <br /> in <br /> the <br /> Night </h2>
        {/* <img src={require('../../images/ships1.jpg')} alt="Ships" width="100%" height="100" /> */}
      </div>
    )
  }
}

const mapStateToProps = reduxStore => ({
  reduxStore,
});

export default connect(mapStateToProps)(Header);
