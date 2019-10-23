import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Paper } from '@material-ui/core';

const styles = {
    container: {
        marginTop: "12%",
    },
    paperComplete: {
        width: '100%',
        backgroundColor: 'lightgray',
    },
    paperOpen: {
        width: '100%',
        backgroundColor: 'yellow',
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

    render() {
        return (
            <div style={styles.container}>
                {this.props.reduxStore.tasks.allTaskReducer.map(item => (
                    <div key={item.id}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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