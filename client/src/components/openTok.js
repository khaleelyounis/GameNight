import React, { Component } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import { Link } from 'react-router-dom';
import '../assets/css/tokbox.css';
import axios from 'axios';
import GamePage from './gamePage';
import { relative } from 'path';
const OT = require('@opentok/client');

class TokBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            connection: 'Connecting',
            publishVideo: true,
            apiKey: '',
            sessionId: '',
            token: '',
        };

        this.publisher = null;

        this.sessionEventHandlers = {
            sessionConnected: () => {
                this.setState({ connection: 'Connected' });
            },
            sessionDisconnected: () => {
                this.setState({ connection: 'Disconnected' });
            },
            sessionReconnected: () => {
                this.setState({ connection: 'Reconnected' });
            },
            sessionReconnecting: () => {
                this.setState({ connection: 'Reconnecting' });
            },
        };

        this.publisherEventHandlers = {
            accessDenied: () => {
                console.log('User denied access to media source');
            },
            streamCreated: () => {
                console.log('Publisher stream created');
            },
            streamDestroyed: ({ reason }) => {
                console.log(`Publisher stream destroyed because: ${reason}`);
            },
        };

        this.subscriberEventHandlers = {
            videoEnabled: () => {
                console.log('Subscriber video enabled');
            },
            videoDisabled: () => {
                console.log('Subscriber video disabled');
            },
        };
    }
    onSessionError = error => {
        this.setState({ error });
    };

    onPublish = () => {
        console.log('Publish Success');
    };

    onPublishError = error => {
        this.setState({ error });
    };

    onSubscribe = () => {
        console.log('Subscribe Success');
    };

    onSubscribeError = error => {
        this.setState({ error });
    };

    toggleVideo = () => {
        this.setState({ publishVideo: !this.state.publishVideo });
    };

    componentWillMount() {
        let sessionInfo = sessionStorage.getItem('gameSession');
        sessionInfo = JSON.parse(sessionInfo);
        this.setState({
            apiKey: sessionInfo.apiKey,
            sessionId: sessionInfo.sessionId,
            token: sessionInfo.token
        });
        console.log('sessionStorage item: ', sessionInfo);
    }

    componentWillUnmount() {
        console.log('Open Tok Unmounting');
    }

    render() {
        const { apiKey, sessionId, token, error, connection, publishVideo } = this.state;
        const vidSize = (this.props.data === "deal52") ? { width: "24vw", height: "26vh" } : { width: "71vw", height: "85vh" };

        if (!apiKey) {
            return (
                <h1>Loading...</h1>
            )
        }
        return (
            <div className="row col s12 fullscreen" id='fullScreen'>
                <OTSession
                    apiKey={apiKey}
                    sessionId={sessionId}
                    token={token}
                    onError={this.onSessionError}
                    eventHandlers={this.sessionEventHandlers}
                >
                    <OTStreams>
                        <OTSubscriber
                            properties={vidSize}
                            onSubscribe={this.onSubscribe}
                            onError={this.onSubscribeError}
                            eventHandlers={this.subscriberEventHandlers}
                        />
                    </OTStreams>
                    <OTPublisher
                        properties={{ publishVideo, width: "24vw", height: "26vh", }}
                        onPublish={this.onPublish}
                        onError={this.onPublishError}
                        eventHandlers={this.publisherEventHandlers}
                    />
                </OTSession>
            </div >
        );
    }
}

export default TokBox;

