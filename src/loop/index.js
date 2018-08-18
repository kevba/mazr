import {LEVEL_STARTING, LEVEL_RUNNING} from 'src/logic/runStates';

import renderLevel from 'src/render/renderLevel';
import renderPlayer from 'src/render/renderPlayer';
import renderNextLevelScreen from 'src/render/renderNextLevelScreen';

let defaultPrevState = {
    runtime: {
        runState: 'NONE'
    }
};

let prevState = defaultPrevState;

// Should be called for every frame
export const loop = (ctx, gameState) => {
    if (gameState.runtime.runState === LEVEL_RUNNING) {
        renderLevel(ctx, gameState.level, gameState.player, gameState.canvas);
        renderPlayer(ctx, gameState.player, gameState.canvas);
    }

    if (gameState.runtime.runState === LEVEL_STARTING) {
        let reset = prevState.runtime.runState !== gameState.runtime.runState;

        renderNextLevelScreen(ctx, gameState.level, gameState.player, gameState.canvas, reset);
    }

    prevState = gameState;
};
