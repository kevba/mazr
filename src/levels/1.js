// import {isEqual, uniqWith} from 'lodash';

import {generateRectange} from './helpers';
import {LEVEL_TWO_ID} from './2';

let walls = [
    ...generateRectange(0, 0, 2, 22),
    ...generateRectange(0, 9, 2, 17),
    ...generateRectange(22, 0, 21, 17),
    ...generateRectange(5, 14, 2, 17),
    ...generateRectange(0, 19, 72, 18),
    ...generateRectange(22, 25, 12, 17),
    ...generateRectange(18, 40, 40, 62),
    ...generateRectange(42, 0, 40, 62),
];

export const exit = {
    position: {
        x: 40, y: 2
    },
    nextLevel: LEVEL_TWO_ID
};

export const entrance = {
    position: {
        x: 5, y: 5
    }
};

const level = {
    name: 'Level 1',
    walls: walls, // uniqWith(walls, isEqual)
    visibility: {
        radius: 10,
        fogColor: '#333'
    },
    exit,
    entrance,
    path: {
        color: '#332200'
    },
    pickups: [
        {type: 'key', color: 'green', position: {x: 15, y: 5}}
    ]
};

export const LEVEL_ONE_ID = 1;

export default level;
