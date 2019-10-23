import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreIcon from '@material-ui/icons/More';
import GetAppIcon from '@material-ui/icons/GetApp';

const styles = {
    container: {
        marginTop: "40px",
    },
    paperLeft: {
        width: '100%',
        fontSize: '8px',
        backgroundColor: 'yellow',
    },
    paperCenter: {
        width: '100%',
        backgroundColor: '#d4ff39',
        textAlign: 'center',
    },
    paperRight: {
        width: '100%',
        fontSize: '8px',
        backgroundColor: 'lightblue',
    }
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
        // swal({ text: 'The task is yours, Captain!', icon: 'success' })
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
                                            {item.title}
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Paper>
                                                        due: {item.due}
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Paper>
                                                        {item.detail}
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Paper>
                                                        <Button onClick={() => { this.showDetail(item.id) }}
                                                            style={styles.paperLeft} variant="contained">
                                                            <MoreIcon />
                                                            Info
                                                        </Button>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Paper>
                                                    </Paper>
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