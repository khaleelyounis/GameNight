import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import types from './actions/types';
import axios from 'axios';
import App from './components/app';

const store = createStore(rootReducer, {}, applyMiddleware(thunk)); //thunk middleware used for async axios calls

//checks to see if user is logged in and keeps user logged in if user refreshes page or navigates away.
if (localStorage.getItem('token')) {
    console.log('we made it to localstorage call');
    store.dispatch({
        type: types.SIGN_IN
    })
} else {
    axios.get('/auth/verify').then(resp => {
        if (resp.data.isLoggedIn) {
            localStorage.setItem('token', resp.data.token);
            store.dispatch({
                type: types.SIGN_IN
            })
        }
    })
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

