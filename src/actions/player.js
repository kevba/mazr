import {hasEdgeCollision, findCollisions} from 'src/logic/collisions';
import {setLevel, removePickup} from './level';
import {setRunState} from './run';

import {LEVEL_STARTING} from 'src/logic/runStates';

export const SET_POSITION = 'SET_POSITION';
export const ADD_ITEM = 'ADD_ITEM';

export const addItem = function(item) {
    return {
        type: ADD_ITEM,
        item
    };
};

export const setPosition = function(x, y) {
    return {
        type: SET_POSITION,
        x,
        y,
    };
};

export const moveTo = function(x, y) {
    return (dispatch, getState) => {
        let {height, width, scale} = getState().canvas;
        let {walls, exit, pickups} = getState().level;

        if (hasEdgeCollision({x, y}, height/scale, width/scale)) {
            return;
        }

        if (findCollisions({x, y}, walls) !== undefined) {
            return;
        }

        // Check if the exit has been reached;
        if (findCollisions({x, y}, [exit]) !== undefined) {
            dispatch(setLevel(exit.nextLevel));
            dispatch(setRunState(LEVEL_STARTING));
        }

        // Check if an item should been picked up
        let foundPickups = findCollisions({x, y}, pickups);
        if (foundPickups !== undefined) {
            pickups.forEach(i => {
                dispatch(removePickup(i));
                dispatch(addItem(i));
            });
        }

        dispatch(setPosition(x, y));
    };
};

export const move = function(move) {
    return (dispatch, getState) => {
        let {position} = getState().player;
        let newPosition = {...position};

        switch (move) {
        case 'left':
            newPosition.x -=1;
            break;
        case 'right':
            newPosition.x +=1;
            break;
        case 'up':
            newPosition.y -=1;
            break;
        case 'down':
            newPosition.y +=1;
            break;
        default:
            break;
        }

        dispatch(moveTo(newPosition.x, newPosition.y));
    };
};
