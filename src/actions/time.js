export const SET_TIME = 'SET_TIME';

export const setTime = function(time) {
    return {
        type: SET_TIME,
        time,
    };
};
