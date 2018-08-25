import Animation from 'src/render/animation/animation';
import SpriteSheet from 'src/render/animation/spriteSheet';

const defaultStyle = {
    color: 'yellow',
    borderColor: '#911'
};

class Entrance {
    constructor(entrance, scale, style={}) {
        this.entrance = entrance;
        this.scale = scale;

        this.style = {...defaultStyle, ...style};
        this.height = 2;
        this.width = 2;

        let spriteSheet = new SpriteSheet('img/entrance.png');
        this.swirlAnimation = new Animation(spriteSheet, 4, 500, 2, 2);
    }

    get x() {
        return this.entrance.position.x;
    }

    get y() {
        return this.entrance.position.y;
    }

    update(entrance) {
        this.entrance = entrance;
    }

    render(ctx) {
        // This animation needs to be slighly larger than one gamepixel.
        this.swirlAnimation.play(ctx, this.x, this.y);
    }
}

export default Entrance;
