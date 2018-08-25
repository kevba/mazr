import {store} from 'src/store';

import Animation from 'src/render/animation/animation';
import SpriteSheet from 'src/render/animation/spriteSheet';

import * as actions from 'src/actions/player.js';


const defaultPlayerStyle = {
    playerColor: '#4f4'
};

class Player {
    constructor(player, scale, style={}) {
        this.height = 1;
        this.width = 1;

        this.player = player;
        this.style = {...defaultPlayerStyle, ...style};

        this.scale = scale;

        // In milliseconds
        this.moveDuration = 150;
        this.lastMoveTime = 0;

        // This is also the animation duration limit, if animating movement.
        let playerSprites = new SpriteSheet('img/player.png');
        this.idleAnimation = new Animation(playerSprites, 1, 50);
        this.walkAnimation = new Animation(playerSprites, 1, this.moveDuration, 1, 1, 2);

        document.addEventListener('keydown', e => {
            this.handleKeyPress(e);
        }, false);
    }

    get x() {
        return this.player.position.x;
    }

    get y() {
        return this.player.position.y;
    }

    update(player) {
        this.player = player;
    }

    isMoving() {
        return store.getState().time.time < this.lastMoveTime + this.moveDuration;
    }

    render(ctx) {
        if (this.isMoving()) {
            this.walkAnimation.play(ctx, this.x, this.y);
        } else {
            this.idleAnimation.play(ctx, this.x, this.y);
        }
    }

    handleKeyPress(e) {
        if (this.isMoving()) {
            return;
        }
        this.lastMoveTime = store.getState().time.time;

        switch (e.key) {
        case 'ArrowRight':
            store.dispatch(actions.move('right'));
            break;
        case 'ArrowLeft':
            store.dispatch(actions.move('left'));
            break;
        case 'ArrowUp':
            store.dispatch(actions.move('up'));
            break;
        case 'ArrowDown':
            store.dispatch(actions.move('down'));
            break;
        default:
            break;
        }
    }
}

export default Player;
