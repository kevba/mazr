import Wall from './wall';
import Entrance from './entrance';

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

        this.entrance = new Entrance(this.level.entrance, scale);

        // An exit looks the ame as an entrance for now.
        this.exit = new Entrance(this.level.exit, scale);

        this.walls = level.walls.map(wall => {
            return new Wall(wall, scale);
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

    update(level, player) {
        this.level = level;

        this.player.update(player, false);

        // We dont need to update walls, since they can't do anything (yet).
        this.entrance.update(this.level.entrance);
        this.exit.update(this.level.exit);
    }

    render(ctx) {
        // The 'fog'
        ctx.fillStyle = this.level.visibility.fogColor;
        ctx.fillRect(0, 0, this.height, this.width);

        // The paths
        ctx.fillStyle=this.style.backgoundColor;
        ctx.fillRect(
            ((this.player.x+0.5) - (this.visibilityRadius+1)) * this.scale,
            ((this.player.y+0.5) - (this.visibilityRadius+1)) * this.scale,
            ((this.visibilityRadius+1)*2) * this.scale,
            ((this.visibilityRadius+1)*2) * this.scale
        );

        for (let wall of this.walls) {
            if (this.withinVisibilyRange(wall.x, wall.y)) {
                wall.render(ctx);
            }
        }

        if (this.withinVisibilyRange(this.entrance.x, this.entrance.y)) {
            this.entrance.render(ctx);
        }

        if (this.withinVisibilyRange(this.exit.x, this.exit.y)) {
            this.exit.render(ctx);
        }

        this.renderVisibilityRadius(ctx);
        this.player.render(ctx);
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
            ((this.player.x+0.5) - (this.visibilityRadius+1)) * this.scale,
            ((this.player.y+0.5) - (this.visibilityRadius+1)) * this.scale,
            ((this.visibilityRadius+1)*2) * this.scale,
            ((this.visibilityRadius+1)*2) * this.scale
        );

    }
}

export default Level;
