const board = document.querySelector('.game-board');
const score = document.querySelector('#score');
const step = 6;
let point = 0;
let flag = false;

const level1 = [
    [2, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 0],
    [1, 1, 0, 1, 1, 0],
    [1, 1, 0, 1, 1, 0],
    [1, 1, 0, 1, 1, 0],
];

const level2 = [
    [2, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1],
    [1, 1, 0, 1, 1, 1],
    [1, 1, 0, 1, 1, 1],
    [1, 1, 0, 1, 1, 1],
]


let printCountPoint = (pacman, grid) => {
    point += grid[pacman.indexY][pacman.indexX].classList.contains('point');
    score.textContent = point;
}


function getRandomInt(path) {
    return path[Math.floor(Math.random() * path.length)] //Максимум не включается, минимум включается
}

function getOptimalPath(ghost, grid, path, delEl) {
    let countDel = 0;
    if (ghost.indexY + 1 >= grid.length - 1 || grid[ghost.indexY + 1][ghost.indexX].classList.contains('wall') || grid[ghost.indexY + 1][ghost.indexX].classList.contains('last')) { //вниз
        delEl.push(Number(path.splice(countDel, 1)));
        countDel++;
    }
    if (ghost.indexY - 1 < 0 || grid[ghost.indexY - 1][ghost.indexX].classList.contains('wall') || grid[ghost.indexY - 1][ghost.indexX].classList.contains('last')) { // вверх
        delEl.push(Number(path.splice(1 - countDel, 1)));
        countDel++;
    }
    if (ghost.indexX - 1 < 0 || grid[ghost.indexY][ghost.indexX - 1].classList.contains('wall') || grid[ghost.indexY][ghost.indexX - 1].classList.contains('last')) { //влево
        delEl.push(Number(path.splice(2 - countDel, 1)));
        countDel++;
    }
    if ((ghost.indexX + 1) > grid.length - 1 || grid[ghost.indexY][ghost.indexX + 1].classList.contains('wall') || grid[ghost.indexY][ghost.indexX + 1].classList.contains('last')) { // вправо
        delEl.push(Number(path.splice(3 - countDel, 1)));
    }
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


function checkLose(pacman, ghost, point, countPoint) {
    if (point == countPoint) {
        ghost.name.style.display = 'none';
        alert('Победа за тобой...А Я ... ОБРЕТУ ПОКОЙ!');
        return 0;
    } else if (pacman.indexY == ghost.indexY && pacman.indexX == ghost.indexX) {
        pacman.name.style.display = 'none';
        setTimeout(() => alert('Ты ЖАЛОК'), 100)
        return 1;
    }
    return 2;
}


let f = true;;
let timerId3 = true;
pacman.createCharacter("img/pacman2.jpg", "pacman");
ghost.createCharacter("img/ghost1.jpg", "ghost");



function game(pacman, ghost, level, speedGhost) {
    let grid = [];
    createBoard(level, grid);
    pacman.addCharacterInGame(grid, pacman);
    ghost.addCharacterInGame(grid);

    function listener(e) {
        userMove(e, pacman, grid)
    }
    document.addEventListener('keydown', listener);

    let countPoint = getCountPoint(level);

    let timerId = setTimeout(function tick() {
        movePacman(pacman, grid);
        timerId = setTimeout(tick, 800); // (*)
    }, 800);
    let timerId2 = setTimeout(function tick2() {
        ghostMove(ghost, grid);
        timerId2 = setTimeout(tick2, speedGhost); // (*)
    }, 800);
    timerId3 = setTimeout(function tick3() {
        f = checkLose(pacman, ghost, point, countPoint);
        if (f == 0 || f == 1) {
            document.removeEventListener('keydown', listener);

            clearTimeout(timerId);
            clearTimeout(timerId2);
            clearTimeout(timerId3);
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
        }
        timerId3 = setTimeout(tick3, 0);
    }, 50);
    return;
}

game(pacman, ghost, level1, 800);

// онклик новый левел!!!!
let timerWin = setTimeout(function win() {
    if (!timerId3 && !f) {
        document.querySelector('#win').classList.add('open');
    }
    timerWin = setTimeout(win, 0);
}, 0);


document.querySelector('#btn-win').onclick = () => {
    document.querySelector('#win').classList.add('close');
    flag = false;
    clearTimeout(timerWin);
    score.classList.add('last');
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    point = 0;
    pacman.indexX = 1;
    pacman.indexY = 4;
    ghost.indexY = 0;
    pacman.indexX = 0;
    ghost.name.style.display = 'block';
    game(pacman, ghost, level2, 400);
}