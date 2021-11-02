const MOVE_UP = 0;
const MOVE_BOTT = 1;
const MOVE_LEFT = 2;
const MOVE_RIGHT = 3;
const board = document.querySelector('.game-board');

function createMatr(col, row) {
    let resMatr = [];
    let temp;
    for (let i = 0; i < row; i++) {
        temp = [];
        for (let j = 0; j < col; j++) {
            temp.push(0);
        }
        resMatr.push(temp);
    }
    return resMatr;
}


function getRandomInt(path) {
    return path[Math.floor(Math.random() * path.length)] //Максимум не включается, минимум включается
}


function getPath(matr, cleaner) {
    let res = [];
    if (cleaner.y - 2 >= 0) {
        res.push(MOVE_UP);
    }
    if (cleaner.y + 2 < matr.length) {
        res.push(MOVE_BOTT);
    }
    if (cleaner.x - 2 >= 0) {
        res.push(MOVE_LEFT);
    }
    if (cleaner.x + 2 < matr[0].length) {
        res.push(MOVE_RIGHT);
    }
    return res;
}

function moveCleaner(matr, cleaner, ) {
    let pathCard = getPath(matr, cleaner);
    switch (getRandomInt(pathCard)) {
        case MOVE_UP:
            cleaner.y -= 2;
            if (matr[cleaner.y][cleaner.x] === 0) {
                matr[cleaner.y][cleaner.x] = 1;
                matr[cleaner.y + 1][cleaner.x] = 1
            }
            break;
        case MOVE_BOTT:
            cleaner.y += 2;
            if (matr[cleaner.y][cleaner.x] === 0) {
                matr[cleaner.y][cleaner.x] = 1;
                matr[cleaner.y - 1][cleaner.x] = 1
            }
            break;
        case MOVE_RIGHT:
            cleaner.x += 2;
            if (matr[cleaner.y][cleaner.x] === 0) {
                matr[cleaner.y][cleaner.x] = 1;
                matr[cleaner.y][cleaner.x - 1] = 1
            }
            break;
        case MOVE_LEFT:
            cleaner.x -= 2;
            if (matr[cleaner.y][cleaner.x] === 0) {
                matr[cleaner.y][cleaner.x] = 1;
                matr[cleaner.y][cleaner.x + 1] = 1
            }
            break;
    }
}

function createLab(col, row) {
    let matr = createMatr(col, row);
    let cleaner = {
        x: 0,
        y: 0
    }
    while (!isReadyMatr(matr)) {
        moveCleaner(matr, cleaner);
    }
    return matr
}


function isReadyMatr(matr) {
    for (let i = 0; i < matr.length; i += 2) {
        for (let j = 0; j < matr[i].length; j += 2) {
            if (matr[i][j] == 0) {
                return false
            }
        }
    }
    return true;
}

function createBoard(level, grid, ) {
    let tempArr = [];
    for (let i = 0; i < level.matr.length; i++) {
        tempArr = [];
        for (let j = 0; j < level.matr[i].length; j++) {
            let block = document.createElement('div');
            switch (level.matr[i][j]) {
                case 0:
                    block.classList.add('wall');
                    break;
                case 1:
                    block.classList.add('point');
                    level.countPoint++;
                    break;
            }
            board.insertAdjacentElement(
                'beforeend',
                block,

            )
            tempArr.push(block);
        }
        grid.push(Array.from(tempArr));
    }
}