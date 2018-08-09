import {find} from 'lodash';

export const findCollisions = (pos, collidables) => {
    return find(collidables, c => {
        return (c.position.x === pos.x && c.position.y === pos.y);
    });
};

export const hasEdgeCollision = (pos, h, w) => {
    if (pos.x < 0 || pos.x > w-1 || pos.y < 0 || pos.y > h-1) {
        return true;
    }
    return false;
};
