import React, { Component } from "react";
import { connect } from 'react-redux';
import { HashRouter as Router, Link } from 'react-router-dom';

class NewTask extends Component {

    
    render() {
        return (
            <Router>
                <div>
                    <h1>In New Task</h1>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(NewTask);