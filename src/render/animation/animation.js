import {store} from 'src/store';

class Animation {
    //  height and width should be given in game-pixels; that is to say,
    // without the scaling applied (game-pixel = actual pixels/scale).
    constructor(spriteSheet, totalFrames, frameDuration, height=1, width=1, frameRow=1) {
        this.spriteSheet = spriteSheet;
        this.frameRow = frameRow;

        this.scale = store.getState().canvas.scale;
        this.height = height * this.scale;
        this.width = width * this.scale;

        // Begin on the last frame, the render always moves it one
        // forward, so the first render will render the first frame
        this.totalFrames = totalFrames;
        this.currentFrame = 1;

        this.frameDuration = frameDuration;
        this.lastFrameTime = 0;
    }

    shouldRenderNextFrame() {
        return store.getState().time.time > this.lastFrameTime + this.frameDuration;
    }

    // Plays the next frame in the animation, if enough time has passed since
    // the last frame. This method should be called every clocktick.
    //
    // The animation gets rendered at the middle point of the given x and y coordinate.
    play(ctx, x, y) {
        if (this.shouldRenderNextFrame()) {
            if (this.currentFrame < this.totalFrames) {
                this.currentFrame++;
            } else {
                this.currentFrame = 1;
            }

            this.lastFrameTime = store.getState().time.time;
        }

        // Normal rendering still needs to happen, even when the frame does not change.
        let spriteX = (this.spriteSheet.frameWidth*(this.currentFrame-1))+this.currentFrame;
        let spriteY = 1 + ((this.spriteSheet.frameHeight+1)*(this.frameRow-1));

        let destX = x - ((this.width/10)/2)+0.5;
        let destY = y - ((this.height/10)/2)+0.5;

        ctx.drawImage(
            this.spriteSheet.getImage(),
            spriteX,
            spriteY,
            this.spriteSheet.frameWidth,
            this.spriteSheet.frameHeight,
            (destX) * this.scale,
            (destY) * this.scale,
            this.height,
            this.width
        );
    }
}

export default Animation;
