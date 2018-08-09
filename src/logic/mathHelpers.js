export const linearFunc = (x1, x2, y1, y2) => {
    if (x1-x2 === 0) {
        return y1;
    }

    let a = (y2 - y1) / (x2 - x1);
    let b = y1 - (a * x1);

    return x => (a*x +b);
};
