import React, { Component } from 'react';
import { connect } from 'react-redux';
let aws = require('aws-sdk');
const nodemailer = require('nodemailer');

aws.config.loadFromPath('config.json');

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new aws.SES({
        apiVersion: '2010-12-01'
    })
});

// send some mail
transporter.sendMail({
    from: REACT_APP_EMAIL_USER,
    to: this.state.email.recipiant,
    subject: 'You have been invited to join a fleet!',
    text: `${this.state.email.sender} has invited you to join ${this.props.reduxStore.fleet.name} fleet!
            Once you create an account, you may join ${this.props.reduxStore.fleet.name} 
            with password '${this.props.reduxStore.fleet.password}'`,
    ses: { // optional extra arguments for SendRawEmail
        Tags: [{
            Name: 'tag name',
            Value: 'tag value'
        }]
    }
}, (err, info) => {
    console.log(info.envelope);
    console.log(info.messageId);
});

class InviteForm extends Component {
    state = {
        email: {
            sender: '',
            recipiant: '',
        }
    }

    handleInputChangeFor = (event, input) => {
        this.setState({
            ...this.state.email,
            [input]: event.target.value,
        });
    }

    handleClick = () => {
        console.log(this.state.email);
    }

    render() {
        return (
            <div className="Test">
                <h1>In Test</h1>
                <input placeholder="recipiant email" onChange={(event) => this.handleChange(event, 'recipiant')} />
                <input placeholder="sender's email" onChange={(event) => this.handleChange(event, 'sender')} />
                <button onClick={this.handleClick}>submit</button>
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(InviteForm);