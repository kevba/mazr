import {LEVEL_STARTING} from 'src/logic/runStates';

import {
    SET_RUN,
    SET_RUN_STATE
} from 'src/actions/run';

const initialState = {
    run: false,
    runState: LEVEL_STARTING,
};

let run = function(state = initialState, action) {
    switch (action.type) {
    case SET_RUN:
        return {...state, run: action.run};
    case SET_RUN_STATE:
        return {...state, runState: action.state};
    default:
        return state;
    }
};

export default run;
