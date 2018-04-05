import React, { Component } from 'react';
import TokBox from './openTok';
import '../assets/css/camGame.css';
import Chat from './chat';
import CamGameWinModal from './camGameWinModal';
import GameInfoModal from './gameInfoModal';
import { connect } from 'react-redux';
import { enterRoom } from "../actions";

class CamGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayModal: false,
            displayInfoModal: false,
            teamOneScore: 0,
            teamTwoScore: 0,
            winningTeam: ''
        }

        this.roomKeyId = sessionStorage.getItem('roomKey');
        this.displayInfo = this.displayInfo.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.displayWinner = this.displayWinner.bind(this);
        this.closeWinModal = this.closeWinModal.bind(this);
        this.handleScoreInput = this.handleScoreInput.bind(this);
    }

    componentDidMount() {
        this.props.enterRoom();
    }

    handleScoreInput(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    displayWinner() {
        const { teamOneScore, teamTwoScore } = this.state;
        let msg = (teamOneScore === teamTwoScore) ? 'Tie game!' : (teamOneScore > teamTwoScore) ? 'Team 1 wins!' : 'Team 2 wins!';

        this.setState({
            displayModal: true,
            winningTeam: msg
        })
    }

    displayInfo() {
        this.setState({
            displayInfoModal: true,
        })
    }

    closeInfoModal() {
        this.setState({
            displayInfoModal: false,
        })
    }

    closeWinModal() {
        this.setState({
            displayModal: false,
            winningTeam: '',
            teamOneScore: 0,
            teamTwoScore: 0,
        })
    }

    render() {
        const { displayModal, displayInfoModal, teamOneScore, teamTwoScore, winningTeam } = this.state;

        return (
            <div className="webpage row">
                <div className="col l3 s4 score">
                    <div className="row" id="scoreRow">
                        <div className="col s12 center-align">
                            <div className="card contentBorder scoreInfo">
                                <div className="card-content" id="cardContainer">
                                    <div className="row">
                                        <div className="col l6 s6">
                                            <h5 className="teamText">Team 1</h5>
                                            <input id='teamOneScore' onChange={this.handleScoreInput} name='teamOneScore' value={teamOneScore} className="score" type="number" placeholder="Enter Score" />
                                        </div>
                                        <div className="col l6 s6">
                                            <h5 className="teamText">Team 2</h5>
                                            <input id='teamTwoScore' onChange={this.handleScoreInput} name='teamTwoScore' value={teamTwoScore} className="score" type="number" placeholder="Enter Score" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6 center-align" id="infoBtn">
                                        <button onClick={this.displayInfo} className='btn teal accent-4 camGameBtn waves-effect waves-light'>Room Info</button>
                                    </div>
                                    <div className="col s6 center-align" id="endGameBtn">
                                        <button onClick={this.displayWinner} className="btn red accent-4 camGameBtn waves-effect waves-light">End Game</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12 chatCam" id="camChat">
                                <Chat />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col l9 s8">
                    <TokBox />
                </div>
                <GameInfoModal display={displayInfoModal} close={this.closeInfoModal} gameType='webcam' roomKey={this.roomKeyId} />
                <CamGameWinModal display={displayModal} close={this.closeWinModal} gameResult={winningTeam} teamOneScore={teamOneScore} teamTwoScore={teamTwoScore} />
            </div>
        )
    }
}

export default connect(null, { enterRoom: enterRoom })(CamGame);