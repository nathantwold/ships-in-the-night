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
import GetAppIcon from '@material-ui/icons/GetApp';
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
    paperCenter: {
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
        fontSize: '22px',
    },
};

class OpenTasks extends Component {

    componentDidMount() {
        this.getOpenTasks();
    }

    getOpenTasks = () => {
        this.props.dispatch({ type: 'GET_OPEN_TASKS', payload: this.props.user });
    }

    handleClaim = (item) => {
        this.props.dispatch({ type: 'CLAIM_TASK', payload: item });
        this.props.dispatch({ type: 'GET_TASKS', payload: this.props.user });
        swal({ text: 'The task is yours, Captain!', icon: 'success' })
    }

    showDetail = (id) => {
        this.props.history.push('/detail/' + id);
    }

    render() {
        return (
            <div style={styles.container}>
                {this.props.reduxStore.tasks.openTaskReducer.map(item => (
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

export default connect(mapStateToProps)(withRouter(OpenTasks));