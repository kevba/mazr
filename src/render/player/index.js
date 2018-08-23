import {store} from 'src/store';

import * as actions from 'src/actions/player.js';


const defaultPlayerStyle = {
    playerColor: '#993'
};

class Player {
    constructor(player, scale, style={}) {
        this.height = 1;
        this.width = 1;

        this.player = player;
        this.x = player.position.x;
        this.y = player.position.y;

        this.style = {...defaultPlayerStyle, ...style};

        this.scale = scale;

        document.addEventListener('keydown', e => {
            this.handleKeyPress(e);
        }, false);
    }

    update(ctx, player, render=true) {
        this.player = player;
        this.x = player.position.x;
        this.y = player.position.y;

        if (render) {
            this.render(ctx);
        }
    }

    render(ctx) {
        ctx.fillStyle = this.style.playerColor;
        ctx.fillRect(this.x * this.scale, this.y * this.scale, this.height, this.width);
    }

    handleKeyPress(e) {
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
