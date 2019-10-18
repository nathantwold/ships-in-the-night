import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = {
    div: {
        height: '20%',
        display: 'flex',
        flexDirection: 'wrap',
        width: '100%',
        padding: '1px',
        margin: '5px'
    },
    paperLeft: {
        height: '35px',
        borderRadius: '3px',
        textAlign: 'center',
        fontSize: '8px',
        backgroundColor: 'lightgreen',
    },
    paperCenter: {
        height: '35px',
        borderRadius: '3px',
        width: '85%',
        textAlign: 'center',
        backgroundColor: 'lightblue',
    },
    paperRight: {
        height: '35px',
        borderRadius: '3px',
        textAlign: 'center',
        fontSize: '8px',
        backgroundColor: 'lightgreen',
    }
};

class OpenTasks extends Component {

    componentDidMount() {
        this.getOpenTasks();
    }

    getOpenTasks = () => {
        this.props.dispatch({ type: 'GET_OPEN_TASKS', payload: this.props.user })
    }

    handleComplete = (item) => {
        this.props.dispatch({ type: 'COMPLETE_TASK', payload: item })
    }

    showDetail = (id) => {
        this.props.history.push('/detail/' + id);
    }

    addNewTask = () => {
        this.props.history.push('/newtask')
    }

    render() {
        return (
            <div>
                <Button variant="contained" onClick={this.addNewTask}>Add task</Button>
                {this.props.reduxStore.tasks.openTaskReducer.map(item => (
                    <div key={item.id} style={styles.div}>
                        <Button onClick={() => { this.showDetail(item.id) }}
                            style={styles.paperCenter} variant="contained">
                            {item.title}
                        </Button>
                        <Button onClick={() => { this.handleComplete(item) }}
                            style={styles.paperRight} variant="contained">
                            Complete?
                            <CheckCircleIcon />
                        </Button>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(withRouter(OpenTasks));