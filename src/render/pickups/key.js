import {store} from 'src/store';

import Animation from 'src/render/animation/animation';
import SpriteSheet from 'src/render/animation/spriteSheet';

class Key {
    constructor(key) {
        this.key = key;
        this.scale = this.scale = store.getState().canvas.scale;

        this.height = 1;
        this.width = 1;

        let keySprites = new SpriteSheet('img/key.png');
        this.keyAnimation = new Animation(keySprites, 1, 1000);
    }

    get x() {
        return this.key.position.x;
    }

    get y() {
        return this.key.position.y;
    }

    update(key) {
        this.key = key;
    }

    render(ctx) {
        this.keyAnimation.play(ctx, this.x, this.y);
    }
}

export default Key;
