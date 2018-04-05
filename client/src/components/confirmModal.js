import React, { Component } from 'react';
import '../assets/css/confirmModal.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { leaveRoom } from "../actions";

class ConfirmModal extends Component {

    closeModalAndLeaveRoom() {
        this.props.close();
        this.props.leaveRoom();
    }

    switchLinks() {
        if(this.props.route === 'signOut'){
            return <a onClick={this.props.signOut} className='btn teal accent-4 waves-effect waves-light'>Log out</a>
        } else {
            return <Link to={`/${this.props.route}`} onClick={this.closeModalAndLeaveRoom.bind(this)} className='btn teal accent-4 waves-effect waves-light'>Yes</Link>
        }
    }

    render() {
        let displayModal = {
            display: this.props.display ? 'block' : 'none'
        };
        console.log(this.props)

        return (
            <div className='confirmModal' style={displayModal}>
                <div className='confirmModalContent contentBorder center-align'>
                    <div>
                        <h3>Are you sure you want to leave?</h3>
                        {this.switchLinks()}
                        <button style={{marginLeft: '15px'}} className='btn red accent-4 waves-effect waves-light' onClick={this.props.close}>No</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { leaveRoom: leaveRoom})(ConfirmModal);