import React, { Component } from "react";
import { connect } from 'react-redux';

const styles = {
  main: {
    textAlign: 'center',
    margin: '5px',
    padding: '10px'
  },
}

class InfoPage extends Component {

  render() {
    return (
      <div style={styles.main}>
        <h4>Ahoy, {this.props.user.username}!</h4>
        <h5>Welcome to Ships in the Night, your household chore management and delegation app!</h5>
        <h5>Once you create a fleet, all you need to share with your house mates is your fleet name and password so they can join you!</h5>
        <h5>Smooth sailing!</h5>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(InfoPage);
