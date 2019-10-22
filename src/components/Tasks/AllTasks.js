import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import swal from "sweetalert";

const styles = {
    container: {
        marginTop: "12%",
    },
    paperComplete: {
        width: '100%',
        backgroundColor: 'lightgreen',
    },
    paperOpen: {
        width: '100%',
        backgroundColor: '#e4878d',
    },
    paperClaim: {
        width: '100%',
        backgroundColor: 'lightgreen',
        fontSize: '8px',
    },
    paperDelete: {
        width: '100%',
        backgroundColor: '#e4878d',
        fontSize: '8px',
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
        this.props.dispatch({ type: 'GET_TASKS', payload: this.props.user });
        swal({ text: 'The task is yours, Captain!', icon: 'success' })
    }

    handleDelete = (item) => {
        this.props.dispatch({ type: 'DELETE_TASK', payload: item });
        swal({ text: 'Task deleted!', icon: 'success' })
    }

    showDetail = (id) => {
        this.props.history.push('/detail/' + id);
    }

    render() {
        return (
            <div style={styles.container}>
                {this.props.reduxStore.tasks.allTaskReducer.map(item => (
                    <div key={item.id}>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                {item.complete === true ?
                                    <Paper>
                                        <Button onClick={() => { this.showDetail(item.id) }}
                                            style={styles.paperComplete} variant="contained">
                                            {item.title} 
                                            <br />
                                            completed by: {item.username}
                                        </Button>
                                    </Paper> :
                                    <Paper>
                                        <Button onClick={() => { this.showDetail(item.id) }}
                                            style={styles.paperOpen} variant="contained">
                                            {item.title} 
                                            <br />
                                            claimed by: {item.username}
                                        </Button>
                                    </Paper>
                                }
                            </Grid>
                            <Grid item xs={3}>
                                {item.complete === true ?
                                    <Paper>
                                        <Button onClick={() => { this.handleDelete(item.id) }}
                                            style={styles.paperDelete} variant="contained">
                                            Delete
                                            <DeleteIcon />
                                        </Button>
                                    </Paper> :
                                    <Paper>
                                        <Button onClick={() => { this.handleClaim(item.id) }}
                                            style={styles.paperClaim} variant="contained">
                                            Claim
                                            <GetAppIcon />
                                        </Button>
                                    </Paper>
                                }
                            </Grid>
                        </Grid>
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