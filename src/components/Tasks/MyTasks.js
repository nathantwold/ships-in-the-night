import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
    Button,
    Grid,
    Paper,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Divider
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreIcon from '@material-ui/icons/More';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import swal from "sweetalert";

const styles = {
    container: {
        marginTop: '40px',
    },
    paperLeft: {
        width: '100%',
        fontSize: '8px',
        backgroundColor: '#4480ed',
    },
    paperCenter: {
        width: '100%',
        backgroundColor: '#93daf9',
        textAlign: 'center',
        fontFamily: 'garamond',
    },
    paperRight: {
        width: '100%',
        fontSize: '8px',
        backgroundColor: '#4df95b',
    },
    title: {
        margin: '0',
        fontSize: '20px',
    },
};

class MyTasks extends Component {

    componentDidMount() {
        this.getMyTasks();
    }

    getMyTasks = () => {
        this.props.dispatch({ type: 'GET_MY_TASKS', payload: this.props.user });
    }

    handleComplete = (item) => {
        this.props.dispatch({ type: 'COMPLETE_TASK', payload: item });
        swal({ text: 'Nice work, Captain!', icon: 'success' })
    }

    showDetail = (id) => {
        this.props.history.push('/detail/' + id);
    }

    render() {
        return (<div style={styles.container}>
            {this.props.reduxStore.tasks.myTaskReducer.map(item => (
                <div key={item.id}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper>
                                <ExpansionPanel style={styles.paperCenter}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <h3 style={styles.title}>{item.title}</h3>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Paper>
                                                    {item.due === null ?
                                                        <h3 style={styles.title}>
                                                            due: ASAP
                                                            <Divider />
                                                            {item.detail}
                                                        </h3> :
                                                        <h3 style={styles.title}>
                                                            due: {moment(item.due).format("MMM Do YY")}
                                                            <Divider />
                                                            {item.detail}
                                                        </h3>
                                                    }
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
                                                    <Button onClick={() => { this.handleComplete(item) }}
                                                        style={styles.paperRight} variant="contained">
                                                        Complete
                                                        <CheckCircleIcon />
                                                    </Button>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
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

export default connect(mapStateToProps)(withRouter(MyTasks));