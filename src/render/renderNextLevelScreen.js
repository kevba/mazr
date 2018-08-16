import {linearFunc} from 'src/logic/mathHelpers';
import renderLevel from 'src/gameView/boardView/renderLevel';

const textStyle = {
    color: '#990000',
    size: 5
};

const renderText = (ctx, text, x, y, textSize) => {
    ctx.textBaseline = 'top';
    ctx.font = `bold ${textSize}px Serif`;
    ctx.fillStyle = textStyle.color;
    ctx.fillText(
        text,
        x,
        y
    );
};


export const renderNextLevelScreenLevel = (ctx, level, player, canvas, scale) => {
    let textSize = textStyle.size * scale;
    let {height, width} = canvas;

    let frameCount = 0;
    let totalFrames = 20;
    let maxY = ((height/2)-textSize);
    let getY = linearFunc(frameCount, totalFrames, 0, maxY);

    renderLevel(ctx, level, player, canvas, scale);

    let renderDroppingText = (curFrame, totalFrames) => {
        if (curFrame < totalFrames) {
            renderLevel(ctx, level, player, canvas, scale);

            let x = (width/2)/2;
            let y = getY(curFrame);
            renderText(ctx, level.name, x, y, textSize);
            curFrame++;
            setTimeout(() => {
                renderDroppingText(curFrame, totalFrames);
            }, 60);
        } else {
            let x = (width/2)/2;
            let y = maxY;

            renderText(ctx, 'Press Space to start', x, y+textSize, textSize-20);
        }
    };

    renderDroppingText(frameCount, totalFrames);
};

export default renderNextLevelScreenLevel;
