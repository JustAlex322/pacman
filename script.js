const score = document.querySelector('#score');
const hearts = document.querySelector('.hearts');

let point = 0;
let flag = false;

const WIN = 0;
const LOSE = 1;
const LOST_LIFE = 2;

let flagForGame = null


let printCountPoint = (pacman, grid) => {
    point += grid[pacman.indexY][pacman.indexX].classList.contains('point');
    score.textContent = point;
}

function checkLose(pacman, ghost, ghost1, ghost2, point, countPoint) {
    if (point == countPoint) {
        alert('Победа за тобой...А Я ... ОБРЕТУ ПОКОЙ!');
        return WIN;
    } else if ((pacman.indexY == ghost.indexY && pacman.indexX == ghost.indexX) || (pacman.indexY == ghost1.indexY && pacman.indexX == ghost1.indexX) || (pacman.indexY == ghost2.indexY && pacman.indexX == ghost2.indexX)) {
        pacman.life--;
        if (pacman.life === 0) {
            pacman.name.style.display = 'none';
            setTimeout(() => alert('Ты ЖАЛОК'), 100)
            return LOSE;
        }
        return LOST_LIFE;
    }
    return 3;
}

function clearTimeouts(arrTimers) {
    arrTimers.forEach(el => {
        clearTimeout(el);
    })
}

pacman.createCharacter("img/pacman2.jpg", "pacman");
ghost.createCharacter("https://static.wikia.nocookie.net/among-us/images/5/5e/Bluenew.png/revision/latest/scale-to-width-down/250?cb=20210616054220&path-prefix=ru", "ghost");
ghost1.createCharacter("img/ghost2.png", "ghost-1");
ghost2.createCharacter("img/ghost1.jpg", "ghost-2");



function game(pacman, ghost, ghost1, ghost2, speedGhost) {
    board.style.width = 13 * 61 + 'px';
    board.style.height = 13 * 61 + 'px';
    let level = {
        countPoint: 0,
        matr: null,
    }
    level.matr = createLab(13, 13);
    let grid = [];
    createBoard(level, grid);
    pacman.addCharacterInGame(grid, pacman);
    ghost.addCharacterInGame(grid);
    ghost1.addCharacterInGame(grid)
    ghost2.addCharacterInGame(grid)

    function listener(e) {
        userMove(e, pacman, grid)
    }
    document.addEventListener('keydown', listener);


    let timerId = setTimeout(function tick() {
        autoMovePacman(pacman, grid);
        timerId = setTimeout(tick, 600); // (*)
    }, 600);
    let timerId2 = setTimeout(function tick2() {
        if (ghost.hasAroundPac(pacman)) {
            ghostMove(ghost, grid, pacman, getOptimalPathForGhost1);
        } else {
            ghostMove(ghost, grid, pacman, getOptimalPath);
        }
        timerId2 = setTimeout(tick2, speedGhost); // (*)
    }, 800);
    let timerId3 = setTimeout(function tick4() {

        ghostMove(ghost1, grid, pacman, getOptimalPath);
        timerId3 = setTimeout(tick4, speedGhost); // (*)
    }, 800);
    let timerId4 = setTimeout(function tick5() {

        ghostMove(ghost2, grid, pacman, getOptimalPath);
        // (*)
        timerId4 = setTimeout(tick5, speedGhost); // (*)
    }, 800);
    let timerId5 = setTimeout(function tick3() {
        flagForGame = checkLose(pacman, ghost, ghost1, ghost2, point, level.countPoint);
        if (flagForGame == WIN || flagForGame == LOSE) {
            document.removeEventListener('keydown', listener);
            clearTimeouts([timerId, timerId2, timerId3, timerId4, timerId5])
            setTimeout(() => {
                if (flagForGame == LOSE) {
                    document.querySelector('#lose').classList.add('open');
                    document.querySelector('#btn').onclick = () => {
                        location.reload();
                    }
                }
            }, 200);
            return;
        } else if (flagForGame == LOST_LIFE) {
            alert('Вы потеряли жизнь');
            hearts.lastElementChild.remove();
            pacman.indexX = pacman.indexY = 10;
            pacman.addCharacterInGame(grid, pacman);
        }
        timerId5 = setTimeout(tick3, 0);
    }, 50);
    return;
}

game(pacman, ghost, ghost1, ghost2, 600);

// онклик новый левел!!!!
let timerWin = setTimeout(function win() {
    if (flagForGame == WIN) {
        document.querySelector('#win').classList.add('open');
    }
    timerWin = setTimeout(win, 0);
}, 0);


let heart = document.createElement('img');
heart.src = 'img/heart.png"'

document.querySelector('#btn-win').onclick = () => {
    document.querySelector('#win').classList.add('close');
    flag = false;
    clearTimeout(timerWin);
    score.classList.add('last-1');
    score.classList.add('last-2');
    score.classList.add('last-3');

    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    for (let i = pacman.life; i <= 3; i++) {
        hearts.insertAdjacentElement(
            'beforeend',
            heart
        )
    }
    pacman.life = 3;
    point = 0;
    pacman.indexX = 1;
    pacman.indexY = 4;
    ghost.indexY = 7;
    ghost.indexX = 7;
    ghost1.indexY = 7;
    ghost1.indexX = 7;
    ghost2.indexY = 7;
    ghost2.indexX = 7;
    game(pacman, ghost, ghost1, ghost2, 400);
}