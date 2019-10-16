import React, { Component } from "react";
import { connect } from 'react-redux';



class InfoPage extends Component {
  click = () => {
    console.log(this.props.user);
  }

  render() {
    return (
      <div>
        <h5>In Info</h5>
        <button onClick={this.click}>
          click
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(InfoPage);
