const score = document.querySelector('#score');
const hearts = document.querySelector('.hearts');
const step = 6;
let point = 0;
let flag = false;

let printCountPoint = (pacman, grid) => {
    point += grid[pacman.indexY][pacman.indexX].classList.contains('point');
    score.textContent = point;
}



function getCountPoint(level) {
    let count = 0;
    for (let i = 0; i < level.length; i++) {
        for (let j = 0; j < level[i].length; j++) {
            count += level[i][j] == 1;
        }
    }
    return count;
}

function checkLose(pacman, ghost, ghost1, ghost2, point, countPoint) {
    if (point == countPoint) {
        alert('Победа за тобой...А Я ... ОБРЕТУ ПОКОЙ!');
        return 0;
    } else if ((pacman.indexY == ghost.indexY && pacman.indexX == ghost.indexX) || (pacman.indexY == ghost1.indexY && pacman.indexX == ghost1.indexX) || (pacman.indexY == ghost2.indexY && pacman.indexX == ghost2.indexX)) {
        pacman.life--;
        if (pacman.life === 0) {
            pacman.name.style.display = 'none';
            setTimeout(() => alert('Ты ЖАЛОК'), 100)
            return 1;
        }
        return 2;
    }
    return 3;
}

function clearTimeouts(t1, t2, t3, t4, t5) {
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
    clearTimeout(t4);
    clearTimeout(t5);
}

let f = true;;
let timerId3 = true;
pacman.createCharacter("img/pacman2.jpg", "pacman");
ghost.createCharacter("img/ghost1.jpg", "ghost");
ghost1.createCharacter("img/ghost2.png", "ghost-1");
ghost2.createCharacter("img/ghost1.jpg", "ghost-2");



function game(pacman, ghost, ghost1, ghost2, speedGhost) {
    board.style.width = 15 * 61 + 'px';
    board.style.height = 15 * 61 + 'px';
    let level = {
        countPoint: 0,
        matr: null,
    }
    level.matr = createLab(15, 15);
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
    let timerId4 = setTimeout(function tick4() {

        ghostMove(ghost1, grid, pacman, getOptimalPath);
        timerId4 = setTimeout(tick4, speedGhost); // (*)
    }, 800);
    let timerId5 = setTimeout(function tick5() {

        ghostMove(ghost2, grid, pacman, getOptimalPath);
        // (*)
        timerId5 = setTimeout(tick5, speedGhost); // (*)
    }, 800);
    timerId3 = setTimeout(function tick3() {
        f = checkLose(pacman, ghost, ghost1, ghost2, point, level.countPoint);
        if (f == 0 || f == 1) {
            document.removeEventListener('keydown', listener);
            clearTimeouts(timerId, timerId2, timerId3, timerId4, timerId5)
            timerId3 = false
            setTimeout(() => {
                if (f == 1) {
                    document.querySelector('#lose').classList.add('open');
                    document.querySelector('#btn').onclick = () => {
                        location.reload();
                    }
                }
            }, 200);
            return;
        } else if (f == 2) {
            alert('Вы потеряли жизнь');
            hearts.lastElementChild.remove();
            pacman.indexX = pacman.indexY = 10;
            pacman.addCharacterInGame(grid, pacman);
        }
        timerId3 = setTimeout(tick3, 0);
    }, 50);
    return;
}

game(pacman, ghost, ghost1, ghost2, 600);

// онклик новый левел!!!!
let timerWin = setTimeout(function win() {
    if (!timerId3 && !f) {
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
    for (let i = 0; i < 3; i++) {
        hearts.insertAdjacentElement(
            'beforeend',
            heart
        )
    }
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