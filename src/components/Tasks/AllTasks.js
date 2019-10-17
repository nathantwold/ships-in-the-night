import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

class AllTasks extends Component {

    addTask = () => {
        console.log('add task');
    }

    componentDidMount() {
        this.getOpenTasks();
    }

    getOpenTasks = () => {
        this.props.dispatch({ type: 'GET_ALL_TASKS', payload: this.props.user })
    }

    render() {
        return (
            <div>
                {this.props.reduxStore.tasks.allTaskReducer.map(item => (
                    <div key={item.id}>
                        <li>{item.title}{item.detail}</li>
                    </div>
                ))}
                <div>
                    <Button variant="outlined" onClick={this.addTask}>Add New</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(AllTasks);