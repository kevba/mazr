import {store} from 'src/store';

const defaultWallStyle = {
    wallColor: 'grey',
    borderColor: '#222'
};

class Wall {
    constructor(x, y, scale, style={}) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.style = {...defaultWallStyle, ...style};
        this.height = 1;
        this.width = 1;
    }

    update(ctx, wall) {
        this.wall = wall;
        this.render(ctx);
    }

    render(ctx) {
        ctx.fillStyle = this.style.wallColor;
        ctx.fillRect(
            this.x * this.scale,
            this.y * this.scale,
            this.height * this.scale,
            this.width * this.scale
        );
        ctx.strokeStyle = this.style.borderColor;
        ctx.strokeRect(
            this.x * this.scale,
            this.y * this.scale,
            this.height * this.scale,
            this.width * this.scale
        );
    }
}

export default Wall;
