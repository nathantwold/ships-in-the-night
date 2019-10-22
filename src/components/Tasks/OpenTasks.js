import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Paper } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

const styles = {
    container: {
        marginTop: "12%",
    },
    paperCenter: {
        width: '100%',
        backgroundColor: 'lightblue',
    },
    paperRight: {
        width: '100%',
        fontSize: '8px',
        backgroundColor: 'lightgreen',
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
                            <Grid item xs={9}>
                                <Paper>
                                    <Button onClick={() => { this.showDetail(item.id) }}
                                        style={styles.paperCenter} variant="contained">
                                        {item.title}
                                    </Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper>
                                    <Button onClick={() => { this.handleClaim(item) }}
                                        style={styles.paperRight} variant="contained">
                                        Claim
                                        <GetAppIcon />
                                    </Button>
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