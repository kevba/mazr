import {store} from 'src/store';
import Wall from './wall'

import Player from '../player';

const defaultLevelStyle = {
    backgoundColor: '#77f',
};

class Level {
    constructor(height, width, level, player, scale, style={}) {
        this.height = height;
        this.width = width;

        this.style = {...defaultLevelStyle, ...style};

        this.player = new Player(player, scale);
        this.level = level;
        this.scale = scale;

        this.visibilityRadius = level.visibility.radius;
        this.walls = level.walls.map(wall => {
            return new Wall(
                wall.position.x,
                wall.position.y,
                scale
            );
        });
    }

    withinVisibilyRange = (x, y) => {
        if (x > (this.player.x + this.visibilityRadius)) {
            return false;
        }
        if (x < (this.player.x - this.visibilityRadius)) {
            return false;
        }
        if (y > (this.player.y + this.visibilityRadius)) {
            return false;
        }
        if (y < (this.player.y - this.visibilityRadius)) {
            return false;
        }

        return true;
    };

    update(ctx, player, time) {
        this.render(ctx);
        this.player.update(ctx, player, false);
        for (let wall of this.walls) {
            if (this.withinVisibilyRange(wall.x, wall.y)) {
                wall.update(ctx, this.level);
            }
        }
        this.renderVisibilityRadius(ctx);
    }

    render(ctx) {
        // The 'fog'
        ctx.fillStyle = this.level.visibility.fogColor;
        ctx.fillRect(0, 0, this.height, this.width);

        ctx.fillStyle=this.style.backgoundColor;
        ctx.fillRect(
            (this.player.x - (this.visibilityRadius+2)) * this.scale,
            (this.player.y - (this.visibilityRadius+2)) * this.scale,
            ((this.visibilityRadius+2)*2) * this.scale,
            ((this.visibilityRadius+2)*2) * this.scale
        );
    }

    renderVisibilityRadius(ctx) {
        let rGrad = ctx.createRadialGradient(
            (this.player.x + 0.5) * this.scale,
            (this.player.y + 0.5) * this.scale,
            0,
            (this.player.x + 0.5) * this.scale,
            (this.player.y + 0.5) * this.scale,
            this.visibilityRadius * this.scale
        );

        rGrad.addColorStop(0, 'transparent');
        rGrad.addColorStop(1, this.level.visibility.fogColor);

        ctx.fillStyle=rGrad;
        ctx.fillRect(
            (this.player.x - (this.visibilityRadius+2)) * this.scale,
            (this.player.y - (this.visibilityRadius+2)) * this.scale,
            ((this.visibilityRadius+2)*2) * this.scale,
            ((this.visibilityRadius+2)*2) * this.scale
        );

        this.player.render(ctx);
    }
}

export default Level;
