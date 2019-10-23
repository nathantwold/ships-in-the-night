import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Paper } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import swal from "sweetalert";

const styles = {
    container: {
        marginTop: "40px",
    },
    paperCenter: {
        width: '100%',
        backgroundColor: '#d4ff39',
    },
    paperRight: {
        width: '100%',
        fontSize: '8px',
        backgroundColor: 'lightgreen',
    }
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
        return (
            <div style={styles.container}>
                {this.props.reduxStore.tasks.myTaskReducer.map(item => (
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
                                    <Button onClick={() => { this.handleComplete(item) }}
                                        style={styles.paperRight} variant="contained">
                                        Done
                                        <CheckCircleIcon />
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

export default connect(mapStateToProps)(withRouter(MyTasks));