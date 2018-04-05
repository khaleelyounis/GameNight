import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import LFOlogoSM from '../assets/images/LFOlogoSM.png'
import '../assets/css/navbar.css'
import ConfirmModal from './confirmModal';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayModal: false,
            route: ''
        }

        this.setDisplayModal = this.setDisplayModal.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
    }

    setDisplayModal(route) {
        this.setState({
            displayModal: true,
            route: route
        })
    }

    closeConfirmModal() {
        this.setState({
            displayModal: false
        })
    }

    //switches nav links depending if user is logged in or not.
    renderLinks() {
        if(this.props.auth === true && this.props.inRoom === true){
            const { displayModal, route } = this.state;
            return (
                <div className="nav-wrapper">
                    <a onClick={()=> {this.setDisplayModal('')}} className='brand-logo left' style={{cursor: 'pointer'}}><span>Live Face Off</span><img className="navImg" src={LFOlogoSM} /></a>
                    <ul className="right navbarUl">
                        <li className="navbarLi">
                            <a onClick={()=> {this.setDisplayModal('About')}} className="navbarItem">About</a>
                        </li>
                        <li className="navbarLi">
                            <a onClick={()=> {this.setDisplayModal('Lobby')}} className="navbarItem">Lobby</a>
                        </li>
                        <li className="navbarLi">
                            <a onClick={()=> {this.setDisplayModal('signOut')}} className="navbarItem">Logout</a>
                        </li>
                    </ul>
                    <ConfirmModal display={displayModal} route={route} close={this.closeConfirmModal} signOut={this.props.signOut}/>
                </div>
            )
        } else if (this.props.auth === true && this.props.inRoom === false){
            return (
                <div className="nav-wrapper">
                    <Link to='/' className='brand-logo left'><span>Live Face Off</span><img className="navImg" src={LFOlogoSM} /></Link>
                    <ul className="right navbarUl">
                        <li className="navbarLi">
                            <Link to='/about' className="navbarItem">About</Link>
                        </li>
                        <li className="navbarLi">
                            <Link to='/lobby' className="navbarItem">Lobby</Link>
                        </li>
                        <li className="navbarLi">
                            <a onClick={this.props.signOut} className="navbarItem">Logout</a>
                        </li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="nav-wrapper">
                    <Link to='/' className='brand-logo left'><span>Live Face Off</span><img className="navImg" src={LFOlogoSM} /></Link>
                    <ul className="right navbarUl">
                        <li className="navbarLi">
                            <Link to='/about' className="navbarItem">About</Link>
                        </li>
                        <li className="navbarLi">
                            <Link to='/register' className="navbarItem">Sign Up</Link>
                        </li>
                        <li className="navbarLi">
                            <Link to='/login' className="navbarItem">Login</Link>
                        </li>
                    </ul>
                </div>
            )
        }
    }

    render() {
        console.log(this.props);
        return (
            <nav className='teal accent-4 navBar'>
                {this.renderLinks()}
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.user.auth,
        inRoom: state.room.inRoom
    }
}

export default connect(mapStateToProps, { signIn: signIn, signOut: signOut })(Navbar);