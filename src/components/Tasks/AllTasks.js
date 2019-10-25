import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Button,
    Grid,
    Paper,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreIcon from '@material-ui/icons/More';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';

const styles = {
    container: {
        marginTop: '40px',
    },
    paperLeft: {
        width: '100%',
        fontSize: '8px',
        backgroundColor: '#4480ed',
    },
    paperComplete: {
        width: '100%',
        backgroundColor: 'lightgray',
        textAlign: 'center',
        fontFamily: 'cursive',
    },
    paperDelete: {
        width: '100%',
        fontSize: '8px',
        backgroundColor: '#e4878d',
    },
    paperOpen: {
        width: '100%',
        backgroundColor: '#93daf9',
        textAlign: 'center',
        fontFamily: 'cursive',
    },
    paperRight: {
        width: '100%',
        fontSize: '8px',
        backgroundColor: '#4480ed',
    },
    title: {
        margin: '0',
    },
};

class AllTasks extends Component {

    componentDidMount() {
        this.getAllTasks();
    }

    getAllTasks = () => {
        this.props.dispatch({ type: 'GET_ALL_TASKS', payload: this.props.user })
    }

    showDetail = (id) => {
        this.props.history.push('/detail/' + id);
    }

    handleDelete = (item) => {
        this.props.dispatch({ type: 'DELETE_TASK', payload: item });
        swal({ text: 'Task deleted!', icon: 'success' });
    }
    
    handleClaim = (item) => {
        this.props.dispatch({ type: 'CLAIM_TASK', payload: item });
        this.props.dispatch({ type: 'GET_TASKS', payload: this.props.user });
        swal({ text: 'The task is yours, Captain!', icon: 'success' })
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
                                        <ExpansionPanel style={styles.paperComplete}>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <h3 style={styles.title}>√  {item.title}</h3>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Paper>
                                                            <h3 style={styles.title}>completed by: {item.username}</h3>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Paper>
                                                            <Button onClick={() => { this.showDetail(item.id) }}
                                                                style={styles.paperLeft} variant="contained">
                                                                <MoreIcon />
                                                                Details
                                                            </Button>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Paper>
                                                            <Button onClick={() => { this.handleDelete(item) }}
                                                                style={styles.paperDelete} variant="contained">
                                                                Delete
                                                            <DeleteIcon />
                                                            </Button>
                                                        </Paper>
                                                    </Grid>
                                                </Grid>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel> :
                                        <ExpansionPanel style={styles.paperOpen}>
                                            <ExpansionPanelSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <h3 style={styles.title}>{item.title}</h3>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Paper>
                                                            <h3 style={styles.title}>Claimed by: {item.username}</h3>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Paper>
                                                            <Button onClick={() => { this.showDetail(item.id) }}
                                                                style={styles.paperLeft} variant="contained">
                                                                <MoreIcon />
                                                                Details
                                                            </Button>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Paper>
                                                            <Button onClick={() => { this.handleClaim(item) }}
                                                                style={styles.paperRight} variant="contained">
                                                                Claim
                                                            <GetAppIcon />
                                                            </Button>
                                                        </Paper>
                                                    </Grid>
                                                </Grid>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
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