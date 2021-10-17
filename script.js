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



function game(pacman, ghost, speedGhost) {
    board.style.width = 15 * 66 + 'px';
    board.style.height = 15 * 66 + 'px';
    let level = {
        countPoint: 0,
        matr: null,
    }
    level.matr = createLab(15, 15);
    let grid = [];
    createBoard(level, grid);
    pacman.addCharacterInGame(grid, pacman);
    ghost.addCharacterInGame(grid);

    function listener(e) {
        userMove(e, pacman, grid)
    }
    document.addEventListener('keydown', listener);


    let timerId = setTimeout(function tick() {
        autoMovePacman(pacman, grid);
        timerId = setTimeout(tick, 600); // (*)
    }, 600);
    let timerId2 = setTimeout(function tick2() {
        ghostMove(ghost, grid);
        timerId2 = setTimeout(tick2, speedGhost); // (*)
    }, 800);
    timerId3 = setTimeout(function tick3() {
        f = checkLose(pacman, ghost, point, level.countPoint);
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

game(pacman, ghost, 800);

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
    game(pacman, ghost, 400);
}