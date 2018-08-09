const playerColor = 'yellow';
const playerSize = {
    height: 10,
    width: 10
};

const renderPlayer = (ctx, player, scale) => {
    ctx.fillStyle = playerColor;
    ctx.fillRect(player.position.x * scale, player.position.y * scale, playerSize.height, playerSize.width);
};

export default renderPlayer;
