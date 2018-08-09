import {LEVEL} from 'src/logic/transitions';

import {
    SET_RUN,
    SET_TRANSITION
} from 'src/actions/run';

const initialState = {
    run: false,
    transition: LEVEL,
};

let run = function(state = initialState, action) {
    switch (action.type) {
    case SET_RUN:
        return {...state, run: action.run};
    case SET_TRANSITION:
        console.log(action.transition);
        return {...state, transition: action.transition};
    default:
        return state;
    }
};

export default run;
