export const generateRectange = (x, y, h, w) => {
    let shape = new Array(h*w);
    let shapeLen = 0;
    for (let i=x; i < w+x; i++) {
        for (let j=y; j < h+y; j++) {
            shape[shapeLen++] = {position: {x: i, y: j}};
        }
    }
    return shape;
};

export const generateSquare = (x, y, len) => {
    return generateRectange(x, y, len, len);
};
