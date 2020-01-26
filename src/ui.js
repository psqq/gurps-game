
const outputEl = document.querySelector('.output');
const controlsEl = document.querySelector('.controls');

let buttonsStateMachine = null;

function scrollToBottom(el) {
    el.scrollTop = el.scrollHeight;
}

function _printEl(el) {
    outputEl.append(el);
    scrollToBottom(outputEl);
}

export function printHtml(msg) {
    const divEl = document.createElement('div');
    divEl.innerHTML = msg;
    _printEl(divEl);
}

export function print(msg) {
    const preEl = document.createElement('pre');
    preEl.innerText = msg;
    _printEl(preEl);
}

export function addButton(name, cb) {
    const btnEl = document.createElement('button');
    btnEl.innerText = name;
    btnEl.onclick = cb;
    controlsEl.append(btnEl);
}

function showCurrentStateButtons() {
    clearControls();
    const buttons = buttonsStateMachine.buttonsByState[buttonsStateMachine.state];
    for(let btn of buttons) {
        addButton(btn.name, () => {
            const oldState = buttonsStateMachine.state;
            btn.onClick();
            if (oldState != buttonsStateMachine.state) {
                showCurrentStateButtons();
            }
        });
    }
}

/**
 * @param {Object} buttonsStateMachine 
 * @param {string} buttonsStateMachine.state
 * @param {{[key: string]: { name: string, cb: (...args) => any}}} buttonsStateMachine.buttonsByState
 */
export function setButtonsStateMachine(_buttonsStateMachine) {
    buttonsStateMachine = _buttonsStateMachine;
    showCurrentStateButtons();
}

export function clearControls() {
    controlsEl.innerHTML = "";
}

export function clearOutput() {
    outputEl.innerHTML = "";
}
