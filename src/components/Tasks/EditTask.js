import React, { Component } from "react";
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

class NewTask extends Component {

    state = {
        groupname: this.props.reduxStore.user.groupname,
        title: '',
        detail: '',
    }

    componentDidMount = () => {
        this.getDetail();
    }

    componentDidUpdate(preProps) {
        if (this.props.reduxStore.tasks.setDetailReducer !== preProps.reduxStore.tasks.setDetailReducer) {
            this.setStateToCurrent();
        }
    }

    getDetail = () => {
        this.props.dispatch({ type: 'GET_DETAIL', payload: this.props.match.params });
    }

    setStateToCurrent = () => {
        this.props.reduxStore.tasks.setDetailReducer.forEach(item => {
            this.setState({
                groupname: this.props.reduxStore.user.groupname,
                title: item.title,
                detail: item.detail,
            })
        })
    }

    style = {
        textField: {
            marginLeft: '20%',
            marginRight: '20%',
            marginTop: '5%',
            width: '60%'
        },
    }

    handleInputChangeFor = (event, input) => {
        this.setState({
            ...this.state,
            [input]: event.target.value,
        });
    }

    checkFields = () => {
        if (this.state.title === '') {
            alert('Please enter a task title!');
        } else {
            this.handleSubmit();
        }
    }

    handleSubmit = () => {
        console.log(this.state);
    }

    render() {
        return (
            <Router>
                <div>
                    {this.props.reduxStore.tasks.setDetailReducer.map(item => (
                        <div key={item.id}>
                            <TextField
                                defaultValue={item.title}
                                style={this.style.textField}
                                label="Task Title*"
                                variant="filled"
                                onChange={(event) => this.handleInputChangeFor(event, 'title')}
                            />
                            <br />
                            <TextField
                                defaultValue={item.detail}
                                style={this.style.textField}
                                label="Task Details"
                                variant="filled"
                                multiline rows="6"
                                onChange={(event) => this.handleInputChangeFor(event, 'detail')}
                            />
                            <br />
                            <Button style={this.style.textField} variant="contained" onClick={this.checkFields}>
                                Done!
                            </Button>
                        </div>
                    ))}
                </div>
            </Router>
        )
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(NewTask);