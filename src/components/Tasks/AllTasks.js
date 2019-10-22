import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PanToolIcon from '@material-ui/icons/PanTool';
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
        backgroundColor: 'lightred',
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
                            <Grid item xs={12}>
                                <Paper>
                                    {item.complete === true ?
                                    <Button onClick={() => { this.showDetail(item.id) }}
                                        style={styles.paperComplete} variant="contained">
                                        {item.title} completed by: {item.username}
                                    </Button> :
                                    <Button onClick={() => { this.showDetail(item.id) }}
                                        style={styles.paperOpen} variant="contained">
                                        {item.title} claimed by: {item.username}
                                    </Button>
                                    }
                                </Paper>
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