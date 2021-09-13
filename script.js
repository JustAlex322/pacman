const board = document.querySelector('.game-board');
const score = document.querySelector('#score');
const step = 6;
let point = 0;
let flag = false;

const level1 = [
    2, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 1, 0,
    1, 1, 0, 1, 1, 0,
    1, 1, 0, 1, 1, 0,
    1, 1, 0, 1, 1, 0,
];

const level2 = [
    2, 1, 1, 1, 1, 1,
    1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1, 1,
]


let printCountPoint = (pacman, grid) => {
    point += grid[pacman.index].classList.contains('point');
    score.textContent = point;
}


function getRandomInt(path) {
    return path[Math.floor(Math.random() * path.length)] //Максимум не включается, минимум включается
}

function getOptimalPath(ghost, grid, path, delEl) {
    let countDel = 0;
    if (ghost.index + step >= grid.length || grid[ghost.index + step].classList.contains('wall') || grid[ghost.index + step].classList.contains('last')) { //вниз
        delEl.push(Number(path.splice(countDel, 1)));
        countDel++;
    }
    if (ghost.index - step < 0 || grid[ghost.index - step].classList.contains('wall') || grid[ghost.index - step].classList.contains('last')) { // вверх
        delEl.push(Number(path.splice(1 - countDel, 1)));
        countDel++;
    }
    if (ghost.index % step == 0 || grid[ghost.index - 1].classList.contains('wall') || grid[ghost.index - 1].classList.contains('last')) { //влево
        delEl.push(Number(path.splice(2 - countDel, 1)));
        countDel++;
    }
    if ((ghost.index + 1) % step == 0 || grid[ghost.index + 1].classList.contains('wall') || grid[ghost.index + 1].classList.contains('last')) { // вправо
        delEl.push(Number(path.splice(3 - countDel, 1)));
    }
}

function getCountPoint(level1) {
    let count = 0;
    for (let i = 0; i < level1.length; i++) {
        count += level1[i] == 1;
    }
    return count;
}


function checkLose(pacman, ghost, point, countPoint) {
    if (point == countPoint) {
        ghost.name.style.display = 'none';
        alert('Победа за тобой...А Я ... ОБРЕТУ ПОКОЙ!');
        return 0;
    } else if (pacman.index == ghost.index) {
        pacman.name.style.display = 'none';
        setTimeout(() => alert('Ты ЖАЛОК'), 100)
        return 1;
    }
    return 2;
}

function showPopup(atribute) {
    let styles = `visibility: visible;
            opacity: 1;`;
    document.querySelector(`${atribute}`).style = styles;
}


function game(pacman, ghost, level1) {
    let grid = [];
    createBoard(level1, grid);
    pacman.createCharacter("img/pacman2.jpg", "pacman", grid);
    ghost.createCharacter("img/ghost1.jpg", "ghost", grid);

    document.addEventListener('keydown', (e) => userMove(e, pacman, grid));

    let countPoint = getCountPoint(level1);

    let timerId = setTimeout(function tick() {
        movePacman(pacman, level1, grid);
        timerId = setTimeout(tick, 800); // (*)
    }, 800);
    let timerId2 = setTimeout(function tick2() {
        ghostMove(ghost, grid);
        timerId2 = setTimeout(tick2, 800); // (*)
    }, 800);
    let timerId3 = setTimeout(function tick3() {
        let f = checkLose(pacman, ghost, point, countPoint);
        if (f == 0 || f == 1) {
            document.removeEventListener('keydown', userMove);
            clearTimeout(timerId);
            clearTimeout(timerId2);
            clearTimeout(timerId3);
            setTimeout(() => {
                if (f == 1) {
                    showPopup('#lose');
                    document.querySelector('#btn').onclick = () => {
                        location.reload();
                    }
                } else {
                    while (board.firstChild) {
                        board.firstChild.remove()
                    }
                    createBoard(level2, [])
                }
            }, 200);
            return;
        }
        timerId3 = setTimeout(tick3, 0);
    }, 50);
}

game(pacman, ghost, level1);