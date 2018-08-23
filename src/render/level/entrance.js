import {store} from 'src/store';

const defaultStyle = {
    color: 'yellow',
    borderColor: '#911'
};

class Entrance {
    constructor(entrance, scale, style={}) {
        this.entrance = entrance;
        this.scale = scale;

        this.style = {...defaultStyle, ...style};
        this.height = 2;
        this.width = 2;

        this.frameWidth = 10;
        this.frameHeight = 10;

        // Begin on the last frame, the render always moves it one
        // forward, so the first render will render the first frame
        this.totalFrames = 3;
        this.currentFrame = 1;

        this.frameDuration = 0.1*1000;
        this.lastFrameTime = 0;

        this.image = new Image();
        this.image.src = 'img/entrance.png';

        // this.allowRender = false;
        //
        // this.image.onload = () => {
        //     this.allowRender = true;
        // };
    }

    get x() {
        return this.entrance.position.x;
    }

    get y() {
        return this.entrance.position.y;
    }

    update(entrance) {
        this.entrance = entrance;
    }

    shouldRenderNextFrame() {
        return store.getState().time.time > this.lastFrameTime + this.frameDuration;
    }

    render(ctx) {
        if (this.shouldRenderNextFrame()) {
            if (this.currentFrame < this.totalFrames) {
                this.currentFrame++;
            } else {
                this.currentFrame = 1;
            }

            this.lastFrameTime = store.getState().time.time;
        }

        let sx = (this.frameWidth*(this.currentFrame-1))+this.currentFrame;
        ctx.drawImage(
            this.image,
            sx,
            1,
            this.frameWidth,
            this.frameHeight,
            (this.x-0.5) * this.scale,
            (this.y-0.5) * this.scale,
            this.height * this.scale,
            this.width * this.scale
        );
    }
}

export default Entrance;
