import * as gurps from './index.js';

export default class Game {
    constructor() {
        this.master = new gurps.Master();
        this.player = this.master.getRandomCharacter();
        this.player.name = "Игрок";
        this.player.player = true;
        this.enemy = this.master.getRandomCharacter();
        this.enemy.name = "Враг";
        this.world = new gurps.World();
        this.world.setTechnologicalLevel(3);
    }
}
