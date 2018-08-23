import {store} from 'src/store';

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
        // This is also the animation duration limit, if animating movement.
        this.moveDuration = 0.05*1000;
        this.lastMoveTime = 0;

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

    isAllowedMovement() {
        return store.getState().time.time > this.lastMoveTime + this.moveDuration;
    }

    render(ctx) {
        ctx.fillStyle = this.style.playerColor;
        ctx.fillRect(
            this.x * this.scale,
            this.y * this.scale,
            this.height * this.scale,
            this.width * this.scale
        );
    }

    handleKeyPress(e) {
        if (!this.isAllowedMovement()) {
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
