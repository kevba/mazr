// import {isEqual, uniqWith} from 'lodash';

import {generateRectange} from './helpers';
import {LEVEL_ONE_ID} from './1';

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
        x: 5,
        y: 5,
    },
    nextLevel: LEVEL_ONE_ID
};

export const entrance = {
    position: {
        x: 40,
        y: 1
    }
};

const level = {
    name: 'Level 2',
    walls: walls, // uniqWith(walls, isEqual)
    visibility: {
        radius: 6,
        fogColor: '#111'
    },
    exit,
    entrance,
    path: {
        color: '#442211'
    }
};

export const LEVEL_TWO_ID = 2;

export default level;
