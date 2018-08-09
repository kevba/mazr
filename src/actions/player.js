import {hasEdgeCollision, findCollisions} from 'src/logic/collisions';
import {setLevel} from './level';
import {setRun} from './run';

import {LEVEL} from 'src/logic/transitions';

export const SET_POSITION = 'SET_POSITION';

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
        let {walls, exit} = getState().level;

        if (hasEdgeCollision({x, y}, height/scale, width/scale)) {
            return;
        }

        if (findCollisions({x, y}, walls) !== undefined) {
            return;
        }

        // Check if the exit has been reached;
        if (findCollisions({x, y}, [exit]) !== undefined) {
            dispatch(setLevel(exit.nextLevel));
            dispatch(setRun(false));
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
