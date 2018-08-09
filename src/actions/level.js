export const SET_LEVEL = 'SET_LEVEL';

export const setLevel = function(levelID) {
    return {
        type: SET_LEVEL,
        levelID,
    };
};
