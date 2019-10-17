import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = {
    div: {
        height: '20%',
        display: 'flex',
        flexDirection: 'wrap',
        width: '100%',
        padding: '1px',
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

    render() {
        return (
            <div>
                {/* {this.props.reduxStore.tasks.openTaskReducer.map(item => ( */}
                    <div key='1' style={styles.div}>
                        <Button onClick={() => console.log('click')}
                            style={styles.paperCenter} variant="contained">
                            Pick up laundry
                        </Button>
                        <Button onClick={() => console.log('click')}
                            style={styles.paperRight} variant="contained">
                            Complete
                            <CheckCircleIcon />
                        </Button>
                    </div>
                {/* ))} */}
            </div>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(OpenTasks);