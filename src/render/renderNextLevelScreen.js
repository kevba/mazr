import {linearFunc} from 'src/logic/mathHelpers';
import renderLevel from './renderLevel';

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

// let renderDroppingText = (curFrame, totalFrames) => {
//     if (curFrame < totalFrames) {
//         renderLevel(ctx, level, player, canvas, scale);
//
//         let x = (width/2)/2;
//         let y = getY(curFrame);
//         renderText(ctx, level.name, x, y, textSize);
//         curFrame++;
//         setTimeout(() => {
//             renderDroppingText(curFrame, totalFrames);
//         }, 60);
//     } else {
//         let x = (width/2)/2;
//         let y = maxY;
//
//         renderText(ctx, 'Press Space to start', x, y+textSize, textSize-20);
//     }
// };

let totalFrames = 30;
let curFrame = 0;

export const renderNextLevelScreenLevel = (ctx, level, player, canvas, reset) => {
    if (reset) {
        totalFrames = 60;
        curFrame = 0;
    }

    let textSize = textStyle.size * canvas.scale;
    let {height, width} = canvas;

    let maxY = ((height/2)-textSize);
    let getY = linearFunc(0, totalFrames, 0, maxY);

    renderLevel(ctx, level, player, canvas, canvas.scale);

    if (curFrame < totalFrames) {
        let x = (width/2)/2;
        let y = getY(curFrame);
        renderText(ctx, level.name, x, y, textSize);
        curFrame++;
    } else {
        let x = (width/2)/2;
        let y = maxY;

        renderText(ctx, level.name, x, y, textSize);
        renderText(ctx, 'Press Space to start', x, y+textSize, textSize-20);
    }
};

export default renderNextLevelScreenLevel;
