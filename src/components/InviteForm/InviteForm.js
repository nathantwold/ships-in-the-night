import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';

class GroupInvite extends Component {

    componentDidMount = () => {
        this.getFleet();
    }

    getFleet = () => {
        this.props.dispatch({ type: 'FETCH_FLEET', payload: this.props.reduxStore.user });
    }

    state = {
        senderName: '',
        recipiantName: '',
        recipiantEmail: '',
        groupname: this.props.reduxStore.user.groupname,
    }

    handleInputChangeFor = (event, input) => {
        this.setState({
            ...this.state,
            [input]: event.target.value,
        });
    }

    handleSend = () => {
        const email = this.state;
        axios({
            method: "POST",
            url: "/api/invite",
            data: {
                email: email
            }
        }).then((response) => {
            if (response.data.msg === 'success') {
                swal({ text: 'Message sent!', icon: 'success' });
                this.resetForm()
                this.props.history.push('/fleetview');
            } else if (response.data.msg === 'fail') {
                swal({ text: 'Message failed to send.', icon: 'warning' })
            }
        })
    }

    resetForm = () => {
        this.setState({
            senderName: '',
            recipiantName: '',
            recipiantEmail: '',
            groupname: this.props.reduxStore.user.groupname,
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSend}>
                    <div className="form-group">
                        <label>Your name</label>
                        <input type="text" onChange={(event) => {this.handleInputChangeFor(event, 'senderName')}} />
                        <label>Recipiant name</label>
                        <input type="text" onChange={(event) => {this.handleInputChangeFor(event, 'recipiantName')}} />
                        <label>Recipiant email address</label>
                        <input type="email" onChange={(event) => {this.handleInputChangeFor(event, 'recipiantEmail')}} aria-describedby="emailHelp" />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStateToProps)(GroupInvite);