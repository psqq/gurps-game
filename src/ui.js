
const outputEl = document.querySelector('.output');
const controlsEl = document.querySelector('.controls');

function scrollToBottom(el) {
    el.scrollTop = el.scrollHeight;
}

function _printEl(el) {
    outputEl.append(el);
    scrollToBottom(el);
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

export function clearControls(name, cb) {
    controlsEl.innerHTML = "";
}
