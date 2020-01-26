import * as tables from './tables.js';
import * as dice from './dice.js';

export default class Character {
    constructor() {
        this.name = "Character";
        this.player = false;
        this.score = 100;
        this.st = 10;
        this.dx = 10;
        this.iq = 10;
        this.ht = 10;
        this.hp = 10;
        this.maxHp = 10;
    }
    getThrustDamage() {
        let dmg = tables.damage[this.st][1];
        let k = 0;
        if (this.st > 100) {
            k = Math.floor((this.st - 100) / 10);
        }
        return dice.throwIt(dmg[0] + k) + dmg[1];
    }
    getSwingDamage() {
        let dmg = tables.damage[this.st][2];
        let k = 0;
        if (this.st > 100) {
            k = Math.floor((this.st - 100) / 10);
        }
        return dice.throwIt(dmg[0] + k) + dmg[1];
    }
    getDamage() {
        return {
            swing: this.getSwingDamage(),
            thrust: this.getThrustDamage(),
        };
    }
}
