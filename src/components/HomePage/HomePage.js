import React, { Component } from "react";
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import TaskView from '../Tasks/TaskView';

class Home extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
    console.log(this.props.user);
  }

  render() {
    return (
      <Router>
        <div>
          <TaskView />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = reduxStore => ({
  reduxStore,
});

export default connect(mapStateToProps)(Home);