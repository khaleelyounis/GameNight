import React, { Component, PropTypes } from 'react';
import '../assets/css/gameBoard.css';
import { connect } from 'react-redux';
import { setFinalScore } from '../actions'
import deck from './deck';
import openSocket from 'socket.io-client';
import CardClicked from './cardClicked';
import GameInfoModal from './gameInfoModal';
import EndGameModal from "./endGameModal";
import Deal52WaitingModal from './deal52WaitingModal';
import axios from 'axios';


class GameBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [1],
            currentPlayer: '',
            playerId: null,
            room: null,
            playerHand1: [],
            clickedCards: [false, false, false, false, false],
            player1Total: 0,
            roundFinalScore: null,
            gameMessage: 'Click on up to 3 cards then discard',
            displayEndGameModal: false,
            displayInfoModal: false,
            displayDeal52WaitingModal: true
        }
        this.socket = openSocket('/', { 'forceNew': true });
        this.roomKeyId = sessionStorage.getItem('roomKey');
        this.deck = [];
        this.discardPile = [];
        this.discardArr = [];
        this.roundCounter = 1;
        this.finalScore = [];

        this.handleWaitingModal = this.handleWaitingModal.bind(this);
        this.displayEndGame = this.displayEndGame.bind(this);
        this.closeEndGameModal = this.closeEndGameModal.bind(this);
        this.dealInitialHand = this.dealInitialHand.bind(this);
        this.cardsToDiscard = this.cardsToDiscard.bind(this);
        this.discardCardBtn = this.discardCardBtn.bind(this);
        this.displayInfo = this.displayInfo.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);

        this.socket.on('startGame', this.handleWaitingModal);
    }

    displayEndGame() {
        this.setState({
            displayEndGameModal: true,
        }, () => {
            this.socket.emit('endGame', {
                finalScore: this.state.player1Total,
                room: this.state.room,
                player: this.state.currentPlayer
            });
            this.props.setFinalScore(this.state.player1Total);
        });
    }

    closeEndGameModal() {
        this.deck = [];
        this.discardPile = [];
        this.discardArr = [];
        this.roundCounter = 1;
        this.setState({
            players: [1],
            playerHand1: [],
            clickedCards: [false, false, false, false, false],
            player1Total: 0,
            gameMessage: 'Click on up to 3 cards then discard',
            displayEndGameModal: false,
            displayInfoModal: false,
            displayDeal52WaitingModal: true
        }, () => {
            this.shuffleDeck();
            this.dealInitialHand();
            this.socket.emit('restartGame', {
                room: this.state.room,
                player: this.state.currentPlayer,
                finalScore: this.finalScore[this.finalScore.length - 1]
            });
        });
    }

    displayInfo() {
        this.setState({
            displayInfoModal: true
        })
    }

    closeInfoModal() {
        this.setState({
            displayInfoModal: false
        })
    }

    handleWaitingModal() {
        this.setState({
            displayDeal52WaitingModal: false,
        });
    }

    componentDidMount() {
        this.shuffleDeck();
        this.dealInitialHand();
    }

    async componentWillMount() {
        let sessionInfo = sessionStorage.getItem('gameSession');
        sessionInfo = JSON.parse(sessionInfo);
        await axios({
            method: 'post',
            url: 'tokbox/sockets',
            data: {
                room: sessionInfo.roomKey
            }
        }).then(response => {
            this.setState({
                currentPlayer: response.data.id.username,
                room: sessionInfo.roomKey,
                playerId: response.data.id
            }, () => {
                this.socket.emit('startGame', {
                    room: this.state.room,
                    player: this.state.currentPlayer,
                    playerId: this.state.playerId
                });
            });
        });
    }

    componentWillUnmount() {
        const { room, currentPlayer } = this.state;
        this.socket.emit('gameDisconnected', {
            room,
            player: currentPlayer
        });
    }

    shuffleDeck() {
        this.deck = deck.slice().sort(function () { return 0.5 - Math.random(); });
    }

    dealInitialHand() {

        const numOfPlayers = this.state.players.length;
        const hand1 = [];
        let cardCounter = 5;

        for (let cardCountIndex = 0; cardCountIndex < cardCounter; cardCountIndex++) {
            hand1.push(this.deck.shift());
        }

        let player1Total = this.currentPointTotal(hand1);

        this.setState({
            playerHand1: [...hand1],
            player1Total
        });
    }

    discardCardBtn() {
        this.discardCards(this.discardArr);
    };

    cardsToDiscard(event) {
        var oldClickedCards = this.state.clickedCards.slice();
        var cardPosition = parseInt((event.target.className).slice(-1));
        if (oldClickedCards[cardPosition] === true) {
            oldClickedCards[cardPosition] = false;
            switch (cardPosition) {
                case this.discardArr[0]:
                    this.discardArr.splice(0, 1);
                    break;
                case this.discardArr[1]:
                    this.discardArr.splice(1, 1);
                    break;
                case this.discardArr[2]:
                    this.discardArr.splice(2, 1);
                    break;
                case this.discardArr[3]:
                    this.discardArr.splice(3, 1);
                    break;
                case this.discardArr[4]:
                    this.discardArr.splice(4, 1);
            }

            this.setState({
                clickedCards: oldClickedCards
            })
        } else {
            if (this.discardArr.length >= 3) {
                return;
            }
            oldClickedCards[cardPosition] = true;
            this.discardArr.push(cardPosition);
            this.setState({
                clickedCards: oldClickedCards
            })
        }
    };

    discardCards(deleteIndexArray) {

        deleteIndexArray.sort(function (a, b) { return b - a });
        let currentPlayersHand = this.state.playerHand1;
        for (let cardIndex = 0; cardIndex < deleteIndexArray.length; cardIndex++) {
            let currentCard = currentPlayersHand.splice(deleteIndexArray[cardIndex], 1);
            this.discardPile.push(currentCard[0]);
            let newCard = this.deck.pop();
            currentPlayersHand.push(newCard);
        }

        this.roundCounter++;
        let player1Total = this.currentPointTotal(this.state.playerHand1);
        this.setState({
            playerHand1: currentPlayersHand,
            player1Total: player1Total,
            gameMessage: 'Click on up to 3 cards to discard',
            clickedCards: [false, false, false, false, false]
        });

        this.discardArr = [];
        if (this.roundCounter === 10) {
            this.endGame();
        }
    };

    currentPointTotal(currentHand) {
        let currentPointTotal = 0;
        for (let cardIndex = 0; cardIndex < 5; cardIndex++) {
            currentPointTotal += currentHand[cardIndex].value;
        }
        return currentPointTotal;
    }

    endGame() {
        this.displayEndGame();
    };

    renderCards(count) {
        let cards = [];
        for (let index = 0; index < count; index++) {
            cards.push(<CardClicked key={index} discardArr={this.discardArr} handleClick={this.cardsToDiscard} className={'playerCard' + index} style={this.state.playerHand1[index].image} clickedStatus={this.state.clickedCards[index]} />)
        }
        return cards;
    }

    render() {
        const { playerHand1, player1Total, gameMessage, displayInfoModal, displayEndGameModal, players, displayDeal52WaitingModal } = this.state;

        if (!playerHand1[0] || !playerHand1[1] || !playerHand1[2] || !playerHand1[3]) {
            return (
                <div className="instructions center-align">
                    <h2>Deal 52</h2>
                </div>
            )
        }
        return (
            <div className="col l12 s12 m12 gameArea">
                <div className="row cardsArea">
                    <div className="col s12 playerHand">
                        {this.renderCards(5)}
                    </div>
                </div>
                <div className="row bottomInfo">
                    <div className="col l12 s12 bottomCardContainer">
                        <div className="card bottomCard">
                            <div className="card-content">
                                <div className="col s3 l3">
                                    <h6 className="gameMessage">{gameMessage}</h6>
                                </div>
                                <div className="col s3 l3 center-align">
                                    <button onClick={this.discardCardBtn} className="waves-effect waves-light btn red accent-4 center-align" type="submit">Discard</button>
                                </div>
                                <div className="col s3 l3 center-align">
                                    <button onClick={this.displayInfo} className="waves-effect waves-light btn teal accent-4" type="button">Info</button>
                                </div>
                                <div className="col s3 l3">
                                    <h6 className="right-align gameTotals">Total Points : {player1Total}</h6>
                                    <h6 className="right-align gameTotals">Current Round : {this.roundCounter} / 10 </h6>
                                </div>
                            </div >
                        </div>
                    </div>
                </div>
                <Deal52WaitingModal display={displayDeal52WaitingModal} close={this.closeDeal52WaitingModal} player={players[0]} />
                <EndGameModal display={displayEndGameModal} close={this.closeEndGameModal} points={player1Total} />
                <GameInfoModal gameType='deal52' display={displayInfoModal} close={this.closeInfoModal} roomKey={this.roomKeyId} />
            </div>

        );
    }
}

export default connect(null, { setFinalScore })(GameBoard);
