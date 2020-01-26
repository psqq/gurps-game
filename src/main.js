import * as gurps from './gurps/index.js';
import * as ui from "./ui.js";

const game = new gurps.Game();

/**
 * @param {gurps.Character} c 
 */
function characterToString(c) {
    return `
Сила: ${c.st}
Ловкость: ${c.dx}
Интелект: ${c.iq}
Здоровье: ${c.ht}
Единицы жизни: ${c.hp}
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

ui.addButton(
    'Атаковать врага',
    () => {
        const attackOptions = {
            attacker: game.player,
            attackType: "thrust",
            defender: game.enemy,
        };
        const attackResult = game.master.attack(attackOptions);
        ui.printHtml("<u>Мастер:</u>");
        const oldHp = attackResult.defenderHpBeforAttack;
        const dmg = attackResult.damage;
        ui.print(`
Произошло нападение!
Атаковал: ${attackOptions.attacker.name}
Защищался: ${attackOptions.defender.name}
Нанесенный урон: ${attackResult.damage}
Изменение здоровья защищающегося: ${oldHp} -> ${attackOptions.defender.hp}
            `.trim()
        );
    }
);
