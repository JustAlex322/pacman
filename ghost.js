class CharactersGhost extends Characters {
    constructor(indexX, indexY, last, classG) {
        super(indexX, indexY);
        this.lastX = indexX;
        this.lastY = indexY;
        this.last = last;
        this.class = classG;
    }
}

let ghost = new CharactersGhost(7, 7, 'last-1', 'ghost');
let ghost1 = new CharactersGhost(7, 7, 'last-2', 'ghost-1');
let ghost2 = new CharactersGhost(7, 7, 'last-3', 'ghost-2');



function delGhost(ghost, grid) {
    document.querySelector(`.${ghost.last}`).classList.remove(`${ghost.last}`);
    grid[ghost.indexY][ghost.indexX].querySelector(`.${ghost.class}`).remove();
    grid[ghost.indexY][ghost.indexX].classList.add(`${ghost.last}`);
}

function getOptimalPath(ghost, grid, ) {
    let res = [];
    if (ghost.indexY + 1 < grid.length && !grid[ghost.indexY + 1][ghost.indexX].classList.contains('wall') && !grid[ghost.indexY + 1][ghost.indexX].classList.contains(`${ghost.last}`)) { //вниз
        res.push(MOVE_BOTT)
    }
    if (ghost.indexY - 1 >= 0 && !grid[ghost.indexY - 1][ghost.indexX].classList.contains('wall') && !grid[ghost.indexY - 1][ghost.indexX].classList.contains(`${ghost.last}`)) { // вверх
        res.push(MOVE_UP)
    }
    if (ghost.indexX - 1 >= 0 && !grid[ghost.indexY][ghost.indexX - 1].classList.contains('wall') && !grid[ghost.indexY][ghost.indexX - 1].classList.contains(`${ghost.last}`)) { //влево
        res.push(MOVE_LEFT)
    }
    if (ghost.indexX + 1 < grid.length && !grid[ghost.indexY][ghost.indexX + 1].classList.contains('wall') && !grid[ghost.indexY][ghost.indexX + 1].classList.contains(`${ghost.last}`)) { // вправо
        res.push(MOVE_RIGHT)
    }
    return res;
}

function ghostMove(ghost, grid) {
    let path = getOptimalPath(ghost, grid);
    switch (getRandomInt(path)) {
        case MOVE_BOTT:
            delGhost(ghost, grid);
            ghost.lastY = ghost.indexY;
            ghost.indexY++;
            ghost.whatChange = 'y'
            ghost.addCharacterInGame(grid);
            break;
        case MOVE_UP:
            delGhost(ghost, grid);
            ghost.lastY = ghost.indexY;
            ghost.indexY--;
            ghost.whatChange = 'y'
            ghost.addCharacterInGame(grid);
            break;
        case MOVE_LEFT:
            delGhost(ghost, grid);
            ghost.lastX = ghost.indexX
            ghost.indexX--;
            ghost.whatChange = 'x'
            ghost.addCharacterInGame(grid);
            break;
        case MOVE_RIGHT:
            // saveIndex4(-1)
            delGhost(ghost, grid);
            ghost.lastX = ghost.indexX
            ghost.indexX++;
            ghost.whatChange = 'x'
            ghost.addCharacterInGame(grid);
            break;
        default:
            delGhost(ghost, grid);
            if (ghost.whatChange === 'x') {
                ghost.indexX = ghost.lastX;
            } else {
                ghost.indexY = ghost.lastY;
            }
            ghost.addCharacterInGame(grid);
    }
}