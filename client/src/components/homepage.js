import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../assets/css/homePage.css';
import fam from '../assets/images/itlitfam.png';
import homepage from '../assets/images/LFOdemo.png'

class Homepage extends Component {
    //switches btn links depending on whether user is logged in or not.
    switchLinks() {
        if (this.props.auth) {
            return <Link id='toLobby' className='btn teal accent-4 waves-effect waves-light btn-large' to='/lobby' style={{ margin: '2%' }}>Go To Lobby</Link>
        } else {
            return [
                <Link key='0' id='loginHomepage' className='btn teal accent-4 waves-effect waves-light btn-large' to='/login' style={{ margin: '2%' }}>Login</Link>,
                <Link key='1' id='signUpAcc' className='btn orange accent-4 waves-effect waves-light btn-large' to='/register' style={{ margin: '2%' }} >Sign Up</Link>
            ]
        }
    }

    render() {
        return (
            <div className='pageContainer'>
                <div className='row'>
                    <div className='landing col l6 s12'>
                        <div className='mainDiv'>
                            <h1 className="gameTitle home center center-align">Live Face Off</h1>
                        </div>
                    </div>
                    <div className='col l6 s12'>
                        <div className='row'>
                            <div className="col s12">
                                <div className="card contentBorder">
                                    <div className="card-content">
                                        <h3 className='title center center-align'>What is Live Face Off?</h3>
                                        <p className="center center-align paragraphTopHomePage">Want to reconnect with a family member overseas? Need a place to hangout with buddies after a long day of work? Live Face Off is a platform where you can easily spend some time with someone close and catch up. Our mission is to create an interface that can be used by just about anyone, while bringing together core technologies that allow for easy communication and fun.</p>
                                        <div className='fam row'>
                                            <div className="col s12">
                                                <img id="fam" src={fam} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s12">
                                                <div className='accountAccess center center-align'>
                                                    {this.switchLinks()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col s6 offset-s3'>
                        <h1 className="feature center center-align">Features</h1>
                    </div>
                </div>
                <div className='row homepageLastRow'>
                    <div className='col s12'>
                        <div className='col l3 s6'>
                            <div className="card contentBorder">
                                <div className="card-content">
                                    <h5 className='center center-align'>Friendly Login System</h5>
                                    <div className='divider black'></div>
                                    <p className="paragraphInHomePage center center-align">Our login process is quick and easy, especially for grandma and grandpa! We've provided the ability to log in with Facebook and Google that way you can use an existing account. You may also choose to create an account with us in a few easy steps. </p>
                                </div>
                            </div>
                        </div>
                        <div className='col l3 s6'>
                            <div className="card contentBorder">
                                <div className="card-content">
                                    <h5 className='center center-align'>Easy Navigation</h5>
                                    <div className='divider black'></div>
                                    <p className="paragraphInHomePage center center-align">Once you log in, you are welcomed into our lobby. You have the option of creating your own game and sharing your special key code with friends and family or joining a room with a given key. There are no installations or downloads required to get started with Live Face Off!</p>
                                </div>
                            </div>
                        </div>
                        <div className='col l3 s6'>
                            <div className="card contentBorder">
                                <div className="card-content">
                                    <h5 className='center center-align'>Variety of Games</h5>
                                    <div className='divider black'></div>
                                    <p className="paragraphInHomePage center center-align">We enhanced the experience by enabling you to communicate with your friends and family via video and voice. If you have a slower connection or don't have a webcam, you can always communicate just as easily with our integrated web chat!</p>
                                </div>
                            </div>
                        </div>
                        <div className='col l3 s6'>
                            <div className="card contentBorder">
                                <div className="card-content">
                                    <h5 className='center center-align'>Video, Voice, and Text Chat</h5>
                                    <div className='divider black'></div>
                                    <p className="paragraphInHomePage center center-align">Choose between our Deal 52 card game or a peer to peer game in our webchat game room. You will have the option to customize scores and win conditions with our webchat game.</p>
                                    <p className="center center-align paragraphInHomePage"><i> More Coming soon!</i></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="imageContainer col l6 offset-l3 s12">
                        <div className="card contentBorder" id="examplePlay">
                            <div className="card-content">
                                <img src={homepage} className="contentBorder gameImage col s12 z-depth-5" id="gameImage" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.user.auth
    }
}

export default connect(mapStateToProps)(Homepage);