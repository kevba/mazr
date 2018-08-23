const defaultWallStyle = {
    wallColor: 'grey',
    borderColor: '#222'
};

class Wall {
    constructor(wall, scale, style={}) {
        this.wall = wall;
        this.scale = scale;

        this.style = {...defaultWallStyle, ...style};

        this.height = 1;
        this.width = 1;
    }

    get x() {
        return this.wall.position.x;
    }

    get y() {
        return this.wall.position.y;
    }

    update(wall) {
        this.wall = wall;
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
