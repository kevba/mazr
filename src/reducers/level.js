import {SET_LEVEL} from 'src/actions/level';

import levelOne, {LEVEL_ONE_ID} from 'src/levels/1';
import levelTwo, {LEVEL_TWO_ID} from 'src/levels/2';

const initialState = levelOne;

let level = function(state = initialState, action) {
    switch (action.type) {
    case SET_LEVEL:
        switch (action.levelID) {
        case LEVEL_ONE_ID:
            return levelOne;
        case LEVEL_TWO_ID:
            return levelTwo;
        default:
            return levelOne;
        }
    default:
        return state;
    }
};

export default level;
