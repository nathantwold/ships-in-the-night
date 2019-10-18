import React, { Component } from "react";
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import moment from 'moment';
import { Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

class TaskDetail extends Component {

    componentDidMount = () => {
        this.getDetail();
    }

    getDetail = () => {
        console.log(this.props.match.params);
        this.props.dispatch({ type: 'GET_DETAIL', payload: this.props.match.params });
    }

    handleOwn = (item) => {
        console.log('In own: ', item);

        // this.props.history.push('/home')
    }

    handleComplete = (item) => {
        this.props.dispatch({ type: 'COMPLETE_TASK', payload: item });
        this.props.history.push('/home');
    }

    handleEdit = (item) => {
        this.props.history.push('/edittask/' + item.id)
    }

    handleDelete = (item) => {
        this.props.dispatch({ type: 'DELETE_TASK', payload: item });
        this.props.history.push('/home');
    }

    handleBack = () => {
        this.props.history.push('/home');
    }

    render() {
        return (
            <Router>
                <div>
                    {this.props.reduxStore.tasks.setDetailReducer.map(item => (
                        <div key={item.id}>
                            <h2>{item.title}</h2>
                            <h5>{item.detail}</h5>
                            <h5>Entered on {moment(item.created).format("MMMM Do YYYY")}</h5>
                            <Button variant="contained" onClick={() => { this.handleOwn(item) }}>Claim</Button>
                            <Button variant="contained" onClick={() => { this.handleComplete(item) }}>Complete</Button>
                            <Button variant="contained" onClick={() => { this.handleEdit(item) }}>Edit</Button>
                            <Button variant="contained" onClick={() => { this.handleDelete(item) }}>Delete</Button>
                            <Button variant="contained" onClick={this.handleBack}>Back</Button>
                        </div>
                    ))}
                </div>
            </Router>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(TaskDetail);