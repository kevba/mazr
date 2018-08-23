import {combineReducers} from 'redux';

import run from 'src/reducers/run';
import time from 'src/reducers/time';
import canvas from 'src/reducers/canvas';
import player from 'src/reducers/player';
import level from 'src/reducers/level';

const reducer = combineReducers({
    run,
    canvas,
    player,
    level,
    time
});

export default reducer;
