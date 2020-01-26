import * as gurps from './gurps/index.js';
import * as ui from "./ui.js";

let game = null;

/**
 * @param {gurps.Character} c 
 */
function characterToString(c) {
  const hpPercent = Math.floor(c.hp / c.maxHp * 100);
  return `
Сила: ${c.st}
Ловкость: ${c.dx}
Интелект: ${c.iq}
Здоровье: ${c.ht}
Единицы жизни: ${c.hp} / ${c.maxHp} (${hpPercent}%)
`.trim();
}

function attack(attackOptions) {
  const attackResult = game.master.attack(attackOptions);
  ui.printHtml("<u>Мастер:</u>");
  const oldHp = attackResult.defenderHpBeforAttack;
  ui.print(`
Произошло нападение!
Атаковал: ${attackOptions.attacker.name}
Защищался: ${attackOptions.defender.name}
Нанесенный урон: ${attackResult.damage}
Изменение здоровья защищающегося: ${oldHp} -> ${attackOptions.defender.hp}
        `.trim()
  );
}

function startNewGame() {
  game = new gurps.Game();
  buttonsStateMachine.state = "game";
  ui.clearOutput();
  ui.printHtml("<u>Характеристики Вашего персонажа:</u>");
  ui.print(characterToString(game.player));
  ui.printHtml("<u>Характеристики Врага:</u>");
  ui.print(characterToString(game.enemy));
}

let buttonsStateMachine = {
  state: "game",
  buttonsByState: {
    "game": [
      {
        name: 'Ваш персонаж',
        onClick: () => {
          ui.printHtml("<u>Характеристики Вашего персонажа:</u>");
          ui.print(characterToString(game.player));
        },
      },
      {
        name: 'Враг',
        onClick: () => {
          ui.printHtml("<u>Характеристики Врага:</u>");
          ui.print(characterToString(game.enemy));
        },
      },
      {
        name: 'Атаковать врага',
        onClick: () => {
          const attackOptions = {
            attacker: game.player,
            attackType: "thrust",
            defender: game.enemy,
          };
          attack(attackOptions);
          if (attackOptions.defender.hp <= 0) {
            ui.print('Вы попедили врага, но появился новый.');
            game.enemy = game.master.getRandomCharacter();
            game.enemy.name = "Враг";
            ui.printHtml("<u>Характеристики Врага:</u>");
            ui.print(characterToString(game.enemy));
          } else {
            const attackOptions = {
              attacker: game.enemy,
              attackType: "thrust",
              defender: game.player,
            };
            attack(attackOptions);
            if (game.player.hp <= 0) {
              buttonsStateMachine.state = "game-over";
            }
          }
        },
      },
    ],
    "game-over": [
      {
        name: 'Новая игра',
        onClick: () => {
          startNewGame();
        },
      }
    ],
  }
};

ui.setButtonsStateMachine(buttonsStateMachine);

startNewGame();
