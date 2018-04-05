import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/login.css';
import DisplayMessages from './errorMessage';
import axios from 'axios';
import { connect } from 'react-redux';
import { signIn } from '../actions';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                password: ''
            },
            messages: null
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Submits login information with axios
    handleSubmit(event) {
        document.getElementById('localLoginBtn').disabled = true;
        const { form } = this.state;
        event.preventDefault();

        axios.post('/users/login', form)
            .then(res => {
                if (res.data.hasOwnProperty('messages')) {
                    this.setState({
                        messages: res.data.messages
                    });
                    document.getElementById('localLoginBtn').disabled = false;
                } else {
                    this.props.signIn();
                }
            }).catch(error => {
                console.log('submission error:', error)
            });
    }

    //Updates the react state for form inputs.
    handleInput(event) {
        const { value, name } = event.target;
        const { form } = this.state;
        form[name] = value;
        this.setState({
            form: { ...form }
        });
    }

    render() {
        const { handleInput, handleSubmit } = this;
        const { email, password, messages } = this.state;

        return (
            <div className='container loginContainer'>
                <DisplayMessages messages={messages} />
                <div className='signInArea contentBorder z-depth-5'>
                    <div className='row'>
                        <div className="col s12 homeTitle center-align">
                            <h2 className="signInText">Live Face Off</h2>
                        </div>
                    </div>
                    <div className="row">
                        <form className="col s12 center-align" onSubmit={handleSubmit}>
                            <div className='inputFieldCentering'>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">mail_outline</i><input type="text" className="validate" name="email" placeholder="Email" onChange={handleInput} value={email} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">work</i><input id="password" type="password" className="validate" name="password" placeholder="Password" onChange={handleInput} value={password} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className='buttonArea col s12'>
                                    <button id='localLoginBtn' type="submit" className='logInBtn waves-effect waves-light btn teal accent-4'>Log In</button>
                                </div>
                            </div>
                            <div className="row googleFB">
                                <div className='buttonAreaTwo col s12 center-align'>
                                    <h5 className='center-align'>Or direct login with</h5>
                                    <br />
                                    <a className="facebookBtn waves-effect waves-light btn light-blue accent-4" href="/auth/facebook">Facebook</a>
                                    <a className="googleBtn waves-effect waves-light btn deep-orange accent-3" href="/auth/google">Google</a>
                                </div>
                            </div>
                            <br />
                            <div className="row googleFB">
                                <span>Don't have an account yet?</span><Link className='signInBtn waves-effect waves-light btn teal accent-4' to='/register'>Sign Up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { signIn: signIn })(LoginPage);