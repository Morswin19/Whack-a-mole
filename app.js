const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
timeUp = false;
let gameTime;
const button = document.querySelector('button');

function randomTime(min, max) {
    return(Math.random() * (max - min) + min)
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time);
}

function startGame() {
    button.disabled = true;
    button.style.color = 'rgba(104, 51, 0, 0.5)'
    scoreBoard.textContent = 0
    timeUp = false;
    score = 0;
    peep();
    gameTime = setTimeout(() => {
        timeUp = true;
        button.disabled = false;
        button.style.color = '#683300';
    }
    , 10000)
}

function bonk(e) {
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score
}

moles.forEach(mole => mole.addEventListener('click', bonk))