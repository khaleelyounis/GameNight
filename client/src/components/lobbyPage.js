import React, { Component } from 'react';
import '../assets/css/lobbyPage.css'
import axios from 'axios';
import GameInfoModal from './gameInfoModal';
import Leaderboard from './leaderboard';
import DisplayMessages from './errorMessage';

class LobbyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lobbies: [],
            leaderboardData: [],
            gameType: 'webcam',
            maxPlayers: '2',
            room: '',
            firstName: '',
            lastName: '',
            roomKey: '',
            displayModal: false,
            messages: null,
            teamName: '',
            roomKeyFromServer: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleJoinSubmit = this.handleJoinSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    setDisplayModal() {
        this.setState({
            displayModal: true
        }, () => {
            if (this.state.displayModal) {
                let body = document.getElementsByTagName('BODY')[0];
                body.style.overflow = 'hidden';
            }
        })
    }

    //route that grabs user's information from the server
    getUserInfo() {
        axios({
            method: 'get',
            url: 'tokbox/lobby',
        }).then(res => {
            this.setState({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                teamName: `${res.data.firstName}'s Team`,
                gamesPlayed: res.data.gamesPlayed,
                totalWins: res.data.totalWins,
                lowestScore: res.data.lowestScore
            });
        });
    }

    //attached to the start button, sends info the server to create the lobby, then receives the key used for people to join with.
    handleSubmit(event) {
        const { lobbies, gameType, maxPlayers, room } = this.state;
        document.getElementById('startButton').disabled = true;
        event.preventDefault();
        this.setState({
            lobbies: [...lobbies, {
                'gameType': gameType,
                'maxPlayers': maxPlayers,
                'room': room
            }],
        });

        axios({
            method: 'post',
            url: `/tokbox/room`,
            data: {
                gameType,
                maxPlayers
            }
        }).then(res => {
            this.setState({
                roomKeyFromServer: res.data.roomKey
            });

            const dataFromServer = JSON.stringify(res.data);
            sessionStorage.setItem('gameSession', dataFromServer);
            sessionStorage.setItem('roomKey', res.data.roomKey);
            this.setDisplayModal();
        });
    }

    //checks the roomKey that was entered against any in the database, then joins if there is a match.
    handleJoinSubmit(event) {
        document.getElementById('joinButton').disabled = true;
        const { roomKey } = this.state;
        event.preventDefault();

        axios({
            method: 'post',
            url: `/tokbox/join`,
            data: {
                roomKey
            }
        }).then(res => {
            const dataFromServer = JSON.stringify(res.data);
            sessionStorage.setItem('gameSession', dataFromServer);
            sessionStorage.setItem('roomKey', res.data.roomKey);
            if (res.data.hasOwnProperty('pathname')) {
                const { origin } = location;
                location.href = `${origin}${res.data.pathname}`;
            }
            if (res.data.hasOwnProperty('messages')) {
                this.setState({
                    messages: res.data.messages
                });
                document.getElementById('joinButton').disabled = false;
            }
        });
    }

    //Updates React state for form inputs and form selection on every key change.
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    componentWillMount() {
        this.getUserInfo();
        this.setState({
            displayModal: false
        })
    }

    componentDidMount() {
        //initializes the MaterializeCSS select tags
        $('select').material_select();
        $('select').on('change', this.handleChange);

        this.setState({
            leaderboardData: this.leaderboardDummyData
        })
    }

    componentWillUnmount() {
        //Removes the event handler from select tags
        $('select').off('change', this.handleChange);
    }

    render() {
        const { leaderboardData, gameType, firstName, lastName, gamesPlayed, totalWins, lowestScore, roomKey, displayModal, messages, roomKeyFromServer, teamName } = this.state;

        return (
            <div className='container' id="lobbyContainer" >
                <DisplayMessages messages={messages} />
                <div className='row topCards'>
                    <div className='col s4 center-align' id="playerCard">
                        <div className="card contentBorder profileCard z-depth-5">
                            <div className="card-content">
                                <div>
                                    <div className='userIconPos'>
                                        <i className="userIcon far fa-user-circle"></i>
                                    </div>
                                    <h5 className="lobbyUsername"><span>{firstName} {lastName}</span></h5>
                                    <ul className='profileInfo'>
                                        <li>Team Name: {teamName}</li>
                                        <li>Deal52 Games Played: {gamesPlayed || 0}</li>
                                        <li>Deal 52 Lowest Score: {lowestScore || 0}</li>
                                        <li>Deal 52 Wins: {totalWins || 0}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col s4 center-align' id="createCard">
                        <div className="card contentBorder z-depth-5 profileCard">
                            <div className="card-content">
                                <div className="col s12">
                                    <h5 className='center-align lobbyText'>Create a Game</h5>
                                </div>
                                <div className="col s12">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className='col s12'>
                                            <div className='input-field '>
                                                <select name='gameType'>
                                                    <option value='webcam'>Webcam</option>
                                                    <option value='deal52'>Deal 52</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col s12'>
                                            <div className='input-field'>
                                                <select name='maxPlayers'>
                                                    <option value='2'>2 Players</option>
                                                    <option value='3'>3 Players</option>
                                                    <option value='4'>4 Players</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col s12'>
                                            <div className='col s12'>
                                                <button id='startButton' className='btn teal accent-4 waves-effect waves-light' type="submit">Start</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col s4 center-align' id="joinCard">
                        <div className="card contentBorder z-depth-5 profileCard">
                            <div className="card-content">
                                <div className="col s12">
                                    <h5 className='joinTitle lobbyText'>Join a Game</h5>
                                </div>
                                <form className='row' onSubmit={this.handleJoinSubmit}>
                                    <div className='col s12'>
                                        <div className='input-field col s10 offset-s1 center-align'>
                                            <input type="text" className="validate roomKey" onChange={this.handleChange} value={roomKey} name="roomKey" placeholder="Enter Room Key" />
                                        </div>
                                    </div>
                                    <div className='col s12'>
                                        <div className='col s12'>
                                            <button id='joinButton' className='btn orange accent-4 waves-effect waves-light' type="submit" style={{ marginTop: '23px' }}>Join</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Leaderboard data={leaderboardData} />
                <GameInfoModal fromLobby={true} gameType={gameType} roomKey={roomKeyFromServer} display={displayModal} />
            </div >
        )
    }
}

export default LobbyPage;