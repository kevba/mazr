import {store} from 'src/store';
import Wall from './wall'

class Level {
    constructor(player, level) {
        this.player = player;
        this.walls = level.walls.map(wall => {
            return new Wall(wall);
        });
    }

    withinVisibilyRange = (player, radius, x, y) => {
        if (x > (player.position.x + radius)) {
            return false;
        }
        if (x < (player.position.x - radius)) {
            return false;
        }
        if (y > (player.position.y + radius)) {
            return false;
        }
        if (y < (player.position.y - radius)) {
            return false;
        }

        return true;
    };

    update(ctx, player, level, time) {
        this.level = level;
        this.player = player;

        this.render(ctx);
        for (let wall of this.walls) {
            wall.update(ctx, this.level);
        }
    }

    render(ctx) {
        ctx.fillStyle=this.style.backgoundColor;
        ctx.fillRect(
            (this.player.position.x - (this.level.visibility.radius+2)) * scale,
            (this.player.position.y - (this.level.visibility.radius+2)) * scale,
            ((level.visibility.radius+2)*2) * scale,
            ((level.visibility.radius+2)*2) * scale
        );

        return;
    }
}

export default Level;
