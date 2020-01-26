import * as tables from './tables.js';

export default class World {
  constructor() {
    this.technologicalLevel = 0;
    this.initialWealth = 250;
  }
  setTechnologicalLevel(newTechnologicalLevel) {
    this.technologicalLevel = newTechnologicalLevel;
    this.initialWealth = tables.initialWealth[this.technologicalLevel][1];
  }
}
