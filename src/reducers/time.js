import {
    SET_TIME,
} from 'src/actions/time';

const initialState = {
    time: 0,
};

let time = function(state = initialState, action) {
    switch (action.type) {
    case SET_TIME:
        return {...state, time: action.time};
    default:
        return state;
    }
};

export default time;
