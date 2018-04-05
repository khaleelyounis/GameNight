import React, { Component } from 'react';
import GameBoard from './gameBoard';
import Chat from './chat';
import TokBox from './openTok';
import '../assets/css/gamePage.css';
import { connect } from 'react-redux';
import { enterRoom } from "../actions";

class GamePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.enterRoom();
    }

    render() {
        const game = "deal52";
        return (
            <div className="fullPage">
                <div className="row webcams">
                    <div className="col s12" id="webcamContainer">
                        <TokBox data={game} />
                    </div>
                </div>
                <div className="row gameCards">
                    <div className="col l3 camChat hide-on-med-and-down">
                        <Chat />
                    </div>
                    <div className="col l9 s12">
                        <GameBoard />
                    </div>
                </div >
            </div>
        )
    }
}

export default connect(null, { enterRoom: enterRoom })(GamePage);
