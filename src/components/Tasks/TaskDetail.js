import React, { Component } from "react";
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

class TaskDetail extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h1>In detail</h1>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
  });
  
  export default connect(mapStateToProps)(TaskDetail);