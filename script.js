const board = document.querySelector('.game-board');
const score = document.querySelector('#score');

let flag = false;
let step = 6;



const level = [
    2, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 1, 0,
    1, 1, 0, 1, 1, 0,
    1, 1, 0, 1, 1, 0,
    1, 1, 0, 1, 1, 0,
];

let grid = [];

createBoard(level);

const ghost = createGhost("img/ghost1.jpg");
let point = 0;
let printCountPoint = () => {
    point += grid[indexPacman].classList.contains('point');
    score.textContent = point;
}

let flag3 = false;
document.addEventListener('keydown', userMove);

// призраки

function getRandomInt(path) {
    return path[Math.floor(Math.random() * path.length)] //Максимум не включается, минимум включается
}

function getOptimalPath(path, delEl) {
    let countDel = 0;
    if (indexGhost + step >= grid.length || grid[indexGhost + step].classList.contains('wall') || grid[indexGhost + step].classList.contains('last')) { //вниз
        delEl.push(Number(path.splice(countDel, 1)));
        countDel++;
    }
    if (indexGhost - step < 0 || grid[indexGhost - step].classList.contains('wall') || grid[indexGhost - step].classList.contains('last')) { // вверх
        delEl.push(Number(path.splice(1 - countDel, 1)));
        countDel++;
    }
    if (indexGhost % step == 0 || grid[indexGhost - 1].classList.contains('wall') || grid[indexGhost - 1].classList.contains('last')) { //влево
        delEl.push(Number(path.splice(2 - countDel, 1)));
        countDel++;
    }
    if ((indexGhost + 1) % step == 0 || grid[indexGhost + 1].classList.contains('wall') || grid[indexGhost + 1].classList.contains('last')) { // вправо
        delEl.push(Number(path.splice(3 - countDel, 1)));
    }
}

function getCountPoint() {
    let count = 0;
    for (let i = 0; i < level.length; i++) {
        count += level[i] == 1;
    }
    return count;
}

let countPoint = getCountPoint();

function checkLose() {
    if (point == countPoint) {
        ghost.style.display = 'none';
        alert('Победа за тобой...А Я ... ОБРЕТУ ПОКОЙ!');
        return 0;
    } else if (indexPacman == indexGhost) {
        pacMan.style.display = 'none';
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

const pacMan = document.createElement('img');
pacMan.src = "img/pacman2.jpg";
pacMan.classList.add('pacman');
grid[indexPacman].insertAdjacentElement(
    'afterbegin',
    pacMan,
)

function game() {
    let timerId = setTimeout(function tick() {
        movePacman();
        timerId = setTimeout(tick, 800); // (*)
    }, 800);
    let timerId2 = setTimeout(function tick2() {
        ghostMove();
        timerId2 = setTimeout(tick2, 800); // (*)
    }, 800);
    let timerId3 = setTimeout(function tick3() {
        let f = checkLose();
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
                }
            }, 200);
            return;
        }
        timerId3 = setTimeout(tick3, 0); // (*)
    }, 50);
}

game();

function newLevel() {
    const level = [
        2, 1, 1, 1, 1, 1,
        1, 1, 0, 1, 1, 1,
        1, 1, 0, 1, 1, 1,
        1, 1, 0, 1, 1, 1,
        1, 1, 0, 1, 1, 1,
    ];
    createBoard(level);
}