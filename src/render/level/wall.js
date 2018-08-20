import {store} from 'src/store';

const defaultWallStyle = {
    wallColor: 'grey',
    borderColor: '#222'
};

class Wall {
    constructor(wall, style={}) {
        this.wall = wall;
        this.style = {defaultWallStyle, ...style};
        this.height = 1;
        this.width = 1;
        this.initialRender = true;
    }

    update(ctx, wall) {
        this.wall = wall;
        this.render(ctx);
    }

    render(ctx) {
        ctx.fillStyle = this.style.wallColor;
        ctx.fillRect(
            this.wall.position.x * this.scale,
            this.wall.position.y * this.scale,
            this.height * this.scale,
            this.width * this.scale
        );
        ctx.strokeStyle = this.style.borderColor;
        ctx.strokeRect(
            this.wall.position.x * this.scale,
            this.wall.position.y * this.scale,
            this.height * this.scale,
            this.width * this.scale
        );
    }
}

export default Wall;
