import * as gurps from './index.js';

export default class Master {
    constructor() {
    }
    getRandomCharacter() {
        const c = new gurps.Character();
        c.st = this.throwDice(3);
        c.dx = this.throwDice(3);
        c.iq = this.throwDice(3);
        c.ht = this.throwDice(3);
        return c;
    }
    throwDice(n) {
        let result = 0;
        for (let i = 0; i < n; i++) {
            result += Math.floor(6 * Math.random()) + 1;
        }
        return result;
    }
}
