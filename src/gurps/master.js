import * as gurps from './index.js';
import * as dice from './dice.js';

export default class Master {
    constructor() {
    }
    getRandomCharacter() {
        const c = new gurps.Character();
        c.st = dice.throwIt(3);
        c.dx = dice.throwIt(3);
        c.iq = dice.throwIt(3);
        c.ht = dice.throwIt(3);
        c.hp = c.ht + Math.floor(c.ht * (Math.random() * 0.6 - 0.3));
        c.maxHp = c.hp;
        return c;
    }
    /**
     * The Master performs the necessary attack actions. 
     * @param {Object} o options
     * @param {gurps.Character} o.attacker
     * @param {gurps.Character} o.defender 
     * @param {"thrust" | "swing"} o.attackType 
     */
    attack(o) {
        let dmg = o.attacker.getDamage()[o.attackType];
        dmg = Math.max(0, dmg);
        const oldHp = o.defender.hp;
        o.defender.hp -= dmg;
        return {
            defenderHpBeforAttack: oldHp,
            damage: dmg,
        };
    }
}
