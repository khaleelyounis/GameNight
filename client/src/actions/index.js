import types from './types';
import axios from 'axios';

export function signIn() {
    return async dispatch => {
        try {
            const resp = await axios.get('/auth/verify');

            if (resp.data.isLoggedIn) {
                localStorage.setItem('token', resp.data.token);
                dispatch({ type: types.SIGN_IN })
            }
        } catch (err) {
            console.log('Sign in error:', err.message)
        }
    }
}

export function signOut() {
    return async dispatch => {
        try {
            await axios.get('/auth/logout');
            localStorage.removeItem('token');
            sessionStorage.clear();
            dispatch({ type: types.SIGN_OUT })
        } catch (err) {
            console.log('Sign out error:', err.message)
        }
    }
}

export function setFinalScore(finalScore) {
    return {
        payload: finalScore,
        type: types.SET_FINAL_SCORE
    }
}

export function enterRoom() {
    return {
        type: types.ENTER_ROOM
    }
}

export function leaveRoom() {
    return {
        type: types.LEAVE_ROOM
    }
}