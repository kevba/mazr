const playerColor = 'yellow';
const playerSize = {
    height: 10,
    width: 10
};

const renderPlayer = (ctx, player, canvas) => {
    ctx.fillStyle = playerColor;
    ctx.fillRect(player.position.x * canvas.scale, player.position.y * canvas.scale, playerSize.height, playerSize.width);
};

export default renderPlayer;
