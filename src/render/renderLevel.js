const withinVisibilyRange = (player, level, x, y) => {
    let radius = level.visibility.radius;

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

const entranceColor = 'yellow';
const entranceBorderColor = 'blue';
const entranceSize = {
    height: 1,
    width: 1
};

const renderEntrance = (ctx, exit, scale) => {
    ctx.fillStyle = entranceColor;
    ctx.fillRect(
        exit.position.x * scale, exit.position.y * scale, entranceSize.height * scale, entranceSize.width * scale);
    ctx.strokeStyle = entranceBorderColor;
    ctx.strokeRect(
        exit.position.x * scale, exit.position.y * scale, entranceSize.height * scale, entranceSize.width * scale);
};

const exitColor = 'green';
const exitBorderColor = 'blue';
const exitSize = {
    height: 1,
    width: 1
};

const renderExit = (ctx, exit, scale) => {
    ctx.fillStyle = exitColor;
    ctx.fillRect(exit.position.x * scale, exit.position.y * scale, exitSize.height * scale, exitSize.width * scale);
    ctx.strokeStyle = exitBorderColor;
    ctx.strokeRect(exit.position.x * scale, exit.position.y * scale, exitSize.height * scale, exitSize.width * scale);
};

const wallColor = 'grey';
const borderColor = '#222';
const wallSize = {
    height: 1,
    width: 1
};

const renderWall = (ctx, wall, scale) => {
    ctx.fillStyle = wallColor;
    ctx.fillRect(wall.position.x * scale, wall.position.y * scale, wallSize.height * scale, wallSize.width * scale);
    ctx.strokeStyle = borderColor;
    ctx.strokeRect(wall.position.x * scale, wall.position.y * scale, wallSize.height * scale, wallSize.width * scale);
};

const renderPaths = (ctx, level, player, scale) => {
    ctx.fillStyle=level.path.color;
    ctx.fillRect(
        (player.position.x - (level.visibility.radius+2)) * scale,
        (player.position.y - (level.visibility.radius+2)) * scale,
        ((level.visibility.radius+2)*2) * scale,
        ((level.visibility.radius+2)*2) * scale
    );
};

const renderFog = (ctx, visibility, canvas) => {
    let {height, width} = canvas;

    ctx.fillStyle = visibility.fogColor;
    ctx.fillRect(0, 0, height, width);
};

const renderVisibilityRadius = (ctx, visibility, player, scale) => {
    let rGrad = ctx.createRadialGradient(
        (player.position.x + 0.5) * scale,
        (player.position.y + 0.5) * scale,
        0,
        (player.position.x + 0.5) * scale,
        (player.position.y + 0.5) * scale,
        visibility.radius * scale
    );

    rGrad.addColorStop(0, 'transparent');
    rGrad.addColorStop(1, visibility.fogColor);

    ctx.fillStyle=rGrad;
    ctx.fillRect(
        (player.position.x - (visibility.radius+2)) * scale,
        (player.position.y - (visibility.radius+2)) * scale,
        ((visibility.radius+2)*2) * scale,
        ((visibility.radius+2)*2) * scale
    );
};

const renderLevel = (ctx, level, player, canvas) => {
    renderFog(ctx, level.visibility, canvas);
    renderPaths(ctx, level, player, canvas.scale);

    for (let w of level.walls) {
        if (withinVisibilyRange(player, level, w.position.x, w.position.y)) {
            renderWall(ctx, w, canvas.scale);
        }
    }

    if (withinVisibilyRange(player, level, level.exit.position.x, level.exit.position.y)) {
        renderExit(ctx, level.exit, canvas.scale);
    }

    if (withinVisibilyRange(player, level, level.entrance.position.x, level.entrance.position.y)) {
        renderEntrance(ctx, level.entrance, canvas.scale);
    }

    renderVisibilityRadius(ctx, level.visibility, player, canvas.scale);
};

export default renderLevel;
