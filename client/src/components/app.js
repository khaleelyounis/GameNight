import 'materialize-css/dist/css/materialize.min.css';
import '../assets/css/noMobileSupportModal.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from './navbar';
import Homepage from './homepage';
import About from './about';
import SignUp from './signUp';
import LoginPage from './loginPage';
import LobbyPage from './lobbyPage';
import GamePage from './gamePage';
import CamGame from './camGame';
import redirectUser from '../hoc/redirectUser';
import authUser from '../hoc/authUser';
import '../assets/css/app.css'

const App = () => {
    return (
        <div className='mainApp'>
            <div className='gradientStyle'>
                <Navbar />
                <Route exact path='/' component={Homepage} />
                <Route path='/about' component={About} />
                <Route path='/camGame' component={authUser(CamGame)} />
                <Route path='/gamepage' component={authUser(GamePage)} />
                <Route path='/lobby' component={authUser(LobbyPage)} />
                <Route path='/register' component={redirectUser(SignUp, '/login')} />
                <Route path='/login' component={redirectUser(LoginPage, '/lobby')} />
                <div className='noMobileSupportModal screenTooSmall'>
                    <div className='noMobileSupportModalContent'>
                        <p className='rotateTablet'>Please rotate your tablet to landscape mode.</p>
                        <div className='noMobSupport'>
                            <p>Support for small mobile devices is not available.</p>
                            <p>Please visit our website on a desktop, laptop or tablet.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;