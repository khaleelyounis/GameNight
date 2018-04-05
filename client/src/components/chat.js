import React, { Component, PropTypes } from 'react';
import '../assets/css/chat.css';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import ChatHistory from './chatHistory';
import axios from 'axios';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            output: '',
            messages: [],
            room: '',
            currentPlayer: '',
            maxPlayers: null,
        };
        this.socket = openSocket('/', { 'forceNew': true });

        this.socket.on('chat', (data) => {
            this.setState({
                messages: [...this.state.messages, data]
            });
        });

        // this.socket.on('adduser', (data) => {
        //     console.log('data on socket.on(adduser):', data);
        // })

        this.sendMessage = (event) => {
            event.preventDefault();
            if (this.state.message === '') {
                return;
            } else {
                this.socket.emit('chat', {
                    message: this.state.message,
                    room: this.state.room,
                    player: this.state.currentPlayer
                });
            }
            this.setState({
                message: ''
            });
            this.keepScrollHeightAtText();
        }
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
                room: sessionInfo.roomKey
            }, () => {
                this.socket.emit('adduser', {
                    room: this.state.room,
                    player: this.state.currentPlayer
                });
            });
        });
    }

    componentWillUnmount() {
        const { room, currentPlayer } = this.state;
        axios({
            method: 'post',
            url: '/tokbox/delete',
            data: {
                room
            }
        });
        this.socket.emit('chatDisconnected', {
            room,
            player: currentPlayer
        });
    }

    handleInputChange(event) {
        const { value } = event.target;
        this.setState({
            message: value
        });
    }

    keepScrollHeightAtText() {
        let element = document.getElementById('chat-window');
        element.scrollTop = element.scrollHeight;
    }

    render() {
        const { message, output, messages } = this.state;
        return (
            <div className="lituation-chat z-depth-5" >
                <form className="form-chat">
                    <div id="chat-window">
                        <div id="output">
                            <ChatHistory data={messages} />
                        </div>
                        <div id="feedback"></div>
                    </div>
                    <input value={this.state.message} onChange={this.handleInputChange.bind(this)} id="message" type="text" placeholder="Type Message" />
                    <button className="chatBtn waves-effect waves-light btn teal accent-4" onClick={this.sendMessage.bind(this)} id="send">Send</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        finalScore: state.finalScore
    }
}

export default connect(mapStateToProps, null)(Chat);
