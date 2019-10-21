import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import PanToolIcon from '@material-ui/icons/PanTool';

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

    handleClaim = (item) => {
        this.props.dispatch({ type: 'CLAIM_TASK', payload: item });
        this.props.dispatch({ type: 'GET_TASKS', payload: this.props.user })
    }

    handleDelete = (item) => {
        this.props.dispatch({ type: 'DELETE_TASK', payload: item });
    }

    showDetail = (id) => {
        this.props.history.push('/detail/' + id);
    }

    render() {
        return (
            <div>
                <h5>Claimed tasks:</h5>
                {this.props.reduxStore.tasks.allTaskReducer.map(item => (
                    <div key={item.id}>
                        {item.username !== "none" ?
                            <div style={styles.div}>
                                <Button onClick={() => { this.showDetail(item.id) }}
                                    style={styles.paperCenter} variant="contained">
                                    {item.title}
                                </Button>
                                <Button
                                    style={styles.paperRight} variant="contained">
                                    Claimed by: {item.username}
                                </Button>
                            </div> : ''
                        }
                    </div>
                ))}

                <h5>Unclaimed tasks:</h5>
                {this.props.reduxStore.tasks.allTaskReducer.map(item => (
                    <div key={item.id}>
                        {item.complete === false && item.username === "none" ?
                            <div style={styles.div}>
                                <Button onClick={() => { this.showDetail(item.id) }}
                                    style={styles.paperCenter} variant="contained">
                                    {item.title}
                                </Button>
                                <Button onClick={() => { this.handleClaim(item) }}
                                    style={styles.paperRight} variant="contained">
                                    Claim
                                    <PanToolIcon />
                                </Button>
                            </div> : ''
                        }
                    </div>
                ))}

                <h5>Completed tasks:</h5>
                {this.props.reduxStore.tasks.allTaskReducer.map(item => (
                    <div key={item.id}>
                        {item.complete === true ?
                            <div style={styles.div}>
                                <Button onClick={() => { this.showDetail(item.id) }}
                                    style={styles.paperCenter} variant="contained">
                                    {item.title}
                                </Button>
                                <Button onClick={() => { this.handleDelete(item) }}
                                    style={styles.paperRight} variant="contained">
                                    Delete
                                    <DeleteIcon />
                                </Button>
                            </div> : ''
                        }
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