import {combineReducers} from 'redux';
import {SET_POSITION} from 'src/actions/player';


const initialPosition = {
    x: 5,
    y: 5,
};

let position = function(state = initialPosition, action) {
    switch (action.type) {
    case SET_POSITION:
        return {...state, x: action.x, y: action.y};
    default:
        return state;
    }
};

const initialInventory = {};

let inventory = function(state = initialInventory, action) {
    switch (action.type) {
    default:
        return state;
    }
};

const player = combineReducers({
    position,
    inventory
});


export default player;
