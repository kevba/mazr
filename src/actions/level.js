export const SET_LEVEL = 'SET_LEVEL';
export const SET_PICKUPS = 'SET_PICkUPS';

export const setPickups = function(pickups) {
    return {
        type: SET_PICKUPS,
        pickups
    };
};

export const removePickup = function(pickup) {
    return (dispatch, getState) => {
        let {pickups} = getState().level;
        let newPickups = pickups.filter(
            p => p.position.x === pickup.position.x && p.position.y === pickup.position.x
        );

        dispatch(setPickups(newPickups));
    };
};

export const setLevel = function(levelID) {
    return {
        type: SET_LEVEL,
        levelID,
    };
};
