import * as gurps from './index.js';

export default class Game {
    constructor() {
        this.master = new gurps.Master();
        this.player = this.master.getRandomCharacter();
        this.enemy = this.master.getRandomCharacter();
    }
}
