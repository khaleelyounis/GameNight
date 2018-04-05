import React, { Component } from 'react';
import '../assets/css/camGameWinModal.css';

class CamGameWinModal extends Component {

    render() {
        let displayModal = {
            display: this.props.display ? 'block' : 'none'
        };

        return (
            <div className='camGameWinModal' style={displayModal}>
                <div className='camGameWinModalContent contentBorder center-align'>
                    <div>
                        <h3>{this.props.gameResult}</h3>
                        <h4>Final Score</h4>
                        <h4>{this.props.teamOneScore} - {this.props.teamTwoScore}</h4>
                        <button className='btn teal accent-4 waves-effect waves-light' onClick={this.props.close}>Reset</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CamGameWinModal;