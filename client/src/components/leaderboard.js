import React, { Component } from 'react';
import axios from 'axios';

class Leaderboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userMap: [],
            list: []
        }
    }

    mapUserData() {
        const { userMap } = this.state;
        let rankCounter = 0;
        const list = userMap[0].map((item, index) => {
            rankCounter = rankCounter++
            rankCounter++;
            return (
                <tr key={index}>
                    <td>{rankCounter}</td>
                    <td>{item.name}</td>
                    <td>Deal 52</td>
                    <td>{item.lowestScore}</td>
                </tr>
            )
        });
        this.setState({
            list
        });
    }

    componentWillMount() {
        axios({
            method: 'get',
            url: 'tokbox/leaderboard',
        }).then(res => {
            this.setState({
                userMap: [...this.state.userMap, res.data.userMap]
            }, () => {
                this.mapUserData(10);
            });
        });
    }

    render() {
        const { list } = this.state;
        return (
            <div className='row z-depth-5 leaderBoard contentBorder'>
                <div className='col s8 offset-s2'>
                    <h5 className='center-align lobbyHeaders'>Top 10 Leaderboard</h5>
                    <table className='highlight bordered centered tableMargin'>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Game Type</th>
                                <th>Lowest Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Leaderboard;