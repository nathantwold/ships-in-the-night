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

class AllTasks extends Component {

    componentDidMount() {
        this.getAllTasks();
    }

    getAllTasks = () => {
        this.props.dispatch({ type: 'GET_ALL_TASKS', payload: this.props.user })
    }

    handleComplete = (item) => {
        this.props.dispatch({ type: 'COMPLETE_TASK', payload: item })
    }

    showDetail = (id) => {
        this.props.history.push('/detail/' + id);
    }

    render() {
        return (
            <div>
            {this.props.reduxStore.tasks.allTaskReducer.map(item => (
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

export default connect(mapStateToProps)(withRouter(AllTasks));