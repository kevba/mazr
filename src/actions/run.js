export const SET_RUN = 'SET_RUNNING';
export const SET_TRANSITION = 'SET_RUNNING';

export const setRun = function(run) {
    return {
        type: SET_RUN,
        run,
    };
};

export const setTransition = function(transition) {
    return {
        type: SET_TRANSITION,
        transition
    };
};
