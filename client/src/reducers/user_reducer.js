import types from '../actions/types';

const DEFAULT_STATE = {
    auth: false
};

//sets the global redux states depending on action type.
export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.SIGN_IN:
            return { auth: true };
        case types.SIGN_OUT:
            return { auth: false };
        default:
            return state;
    }
}