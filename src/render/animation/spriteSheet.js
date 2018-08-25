class SpriteSheet {
    constructor(imgPath, frameHeight = 10, frameWidth = 10) {
        this.frameHeight = frameHeight;
        this.frameWidth = frameWidth;

        // TODO: make sure the game does not crash and burn when an image is
        // not found or loaded in time.
        this.image = new Image();
        this.image.src = imgPath;
    }

    getImage() {
        return this.image;
    }

    getFrameWidth(row) {
        return this.frameWidth * row;
    }

    getFrameHeight(row) {
        return this.frameHeight * row;
    }
}

export default SpriteSheet;
