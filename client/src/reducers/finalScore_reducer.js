import types from '../actions/types';

const DEFAULT_STATE = {
    finalScore: null
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.SET_FINAL_SCORE:
            return { finalScore: action.payload };
        default:
            return state;
    }
}