
export function throwIt(n) {
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += Math.floor(6 * Math.random()) + 1;
    }
    return result;
}
