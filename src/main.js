import * as grups from './gurps/index.js';
import * as ui from "./ui.js";

const game = new grups.Game();

function characterToString(c) {
    return `
Сила: ${c.st}
Ловкость: ${c.dx}
Интелект: ${c.iq}
Здоровье: ${c.ht}
`.trim();
}

ui.addButton(
    'Ваш персонаж',
    () => {
        ui.printHtml("<u>Характеристики Вашего персонажа:</u>");
        ui.print(characterToString(game.player));
    }
);

ui.addButton(
    'Враг',
    () => {
        ui.printHtml("<u>Характеристики Врага:</u>");
        ui.print(characterToString(game.enemy));
    }
);
