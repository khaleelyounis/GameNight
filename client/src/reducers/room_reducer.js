import types from '../actions/types';

const DEFAULT_STATE = {
    inRoom: false
};

//sets the global redux states depending on action type.
export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.ENTER_ROOM:
            return { inRoom: true };
        case types.LEAVE_ROOM:
            return { inRoom: false };
        default:
            return state;
    }
}