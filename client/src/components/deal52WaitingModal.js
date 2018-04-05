import React, { Component } from 'react';
import '../assets/css/waitingGameModals.css';

class Deal52WaitingModal extends Component {

    render() {
        let displayModal = {
            display: this.props.display ? 'block' : 'none'
        };

        return (
            <div className='waitingGameModal' id="waitingModalContent" style={displayModal}>
                <div className='waitingModalContent contentBorder'>
                    <div className='center-align'>
                        <h4 id="waitingText">Waiting For All Players</h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default Deal52WaitingModal;