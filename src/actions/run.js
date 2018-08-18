export const SET_RUN = 'SET_RUNNING';
export const SET_RUN_STATE = 'SET_RUN_STATE';

export const setRun = function(run) {
    return {
        type: SET_RUN,
        run,
    };
};

export const setRunState = function(state) {
    return {
        type: SET_RUN_STATE,
        state
    };
};
