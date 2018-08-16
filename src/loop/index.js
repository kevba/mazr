import renderLevel from "src/render/renderLevel"
import renderPlayer from "src/render/renderPlayer"

// Should be called for every frame
export const loop = (ctx, gameState) => {
    renderLevel(ctx, gameState.level, gameState.player, gameState.canvas)
    renderPlayer(ctx, gameState.player, gameState.canvas)
}
