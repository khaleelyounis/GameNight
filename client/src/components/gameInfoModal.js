import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/gameInfoModal.css';

class GameInfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            copied: false
        }
    }

    //switches btn links depending if the user is coming from the lobby or clicking game info.
    switchBtn(redirect) {
        let body = document.getElementsByTagName('BODY')[0];
        body.style.overflow = 'visible';
        if (this.props.fromLobby === true) {
            return <Link to={redirect} className='btn teal accent-4 waves-effect waves-light'>Join Room</Link>
        } else {
            return <button className='btn teal accent-4 waves-effect waves-light' onClick={this.props.close}>Close</button>
        }
    }

    gameInfo() {
        if (this.props.gameType === 'webcam') {
            return <p>This is an interactive webcam room where 2 players can interact with each other
                and play their own home games such as Charades over webcam.</p>
        } else {
            return [<span key='0'>This is a 5 card per hand game where lowest point total wins after 10 rounds.</span>,
            <ul key='1'>
                <li>Click on the high value cards you would like to discard.</li>
                <li>Then click the discard button to replace the cards.</li>
                <li>You must discard at least 1 card per round but no more than 3 cards.</li>
                <li>Aces are the best cards having a 1 point value.</li>
                <li>Jacks, Queens, and Kings are 10 points each.</li>
            </ul>]
        }
    }

    render() {
        let gameName = null,
            contentHeight = null,
            redirect = null;

        if (this.props.gameType === 'webcam') {
            gameName = 'Webcam';
            redirect = '/camGame';
            contentHeight = 'webcamModalSize';
        } else {
            gameName = 'Deal 52';
            redirect = '/gamepage';
            contentHeight = 'dealModalSize';
        }

        let displayModal = {
            display: this.props.display ? 'block' : 'none'
        };

        return (
            <div className='gameInfoModal' style={displayModal}>
                <div className={`gameInfoContent contentBorder ${contentHeight}`}>
                    <div className='row'>
                        <div className='col s12'>
                            <div className='center-align'>
                                <h4>{gameName}</h4>
                                <div className='divider'></div>
                                <h5>How to play</h5>
                                {this.gameInfo()}
                            </div>
                            <div className='divider'></div>
                            <div className='center-align'>
                                <h5>Unique room key</h5>
                                <div style={{ margin: '16px 0' }}><span className='roomKeyStyle'>{this.props.roomKey}</span></div>
                                <p>Share this key with your friends and family so they can join your room!</p>
                            </div>
                            <div className='center-align' style={{ marginTop: '18px' }}>
                                {this.switchBtn(redirect)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameInfoModal;