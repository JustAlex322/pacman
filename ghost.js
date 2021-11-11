class CharactersGhost extends Characters {
    constructor(indexX, indexY, last, classG) {
        super(indexX, indexY);
        this.lastX = indexX;
        this.lastY = indexY;
        this.last = last;
        this.class = classG;
    }
    hasAroundPac(pacman, ) {
        return Math.abs(this.indexX - pacman.indexX) <= 5 || Math.abs(this.indexY - pacman.indexY) <= 5;
    }
}
let ghost = new CharactersGhost(0, 5, 'last-1', 'ghost');
let ghost1 = new CharactersGhost(7, 5, 'last-2', 'ghost-1');
let ghost2 = new CharactersGhost(7, 3, 'last-3', 'ghost-2');



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

    return getRandomInt(res);
}

function getOptimalPathForGhost1(ghost, grid, pacman) {
    let distance = [1000, 1000, 1000, 1000];

    if (ghost.indexY + 1 < grid.length && !grid[ghost.indexY + 1][ghost.indexX].classList.contains('wall') && !grid[ghost.indexY + 1][ghost.indexX].classList.contains(`${ghost.last}`)) { //вниз
        distance[MOVE_BOTT] = (Math.abs(ghost.indexX - pacman.indexX) + Math.abs(ghost.indexY + 1 - pacman.indexY))
    }
    if (ghost.indexY - 1 >= 0 && !grid[ghost.indexY - 1][ghost.indexX].classList.contains('wall') && !grid[ghost.indexY - 1][ghost.indexX].classList.contains(`${ghost.last}`)) { // вверх
        distance[MOVE_UP] = (
            Math.abs(ghost.indexX - pacman.indexX) + Math.abs(ghost.indexY - pacman.indexY))
    }
    if (ghost.indexX - 1 >= 0 && !grid[ghost.indexY][ghost.indexX - 1].classList.contains('wall') && !grid[ghost.indexY][ghost.indexX - 1].classList.contains(`${ghost.last}`)) { //влево
        distance[MOVE_LEFT] = (Math.abs(ghost.indexX - 1 - pacman.indexX) + Math.abs(ghost.indexY - pacman.indexY))
    }
    if (ghost.indexX + 1 < grid.length && !grid[ghost.indexY][ghost.indexX + 1].classList.contains('wall') && !grid[ghost.indexY][ghost.indexX + 1].classList.contains(`${ghost.last}`)) { // вправо
        distance[MOVE_RIGHT] = (Math.abs(ghost.indexX + 1 - pacman.indexX) + Math.abs(ghost.indexY - pacman.indexY))
    }
    return distance.indexOf(Math.min(...distance))
}

let changeGhost = (ghost, grid, axis, sign) => {
    delGhost(ghost, grid);
    if (axis === 'x') {
        ghost.lastX = ghost.indexX;
        ghost.indexX += 1 * sign;
        ghost.whatChange = 'x'
    } else {
        ghost.lastY = ghost.indexY;
        ghost.indexY += 1 * sign;
        ghost.whatChange = 'y'
    }
    ghost.addCharacterInGame(grid);
}

function ghostMove(ghost, grid, pacman, getPath) {
    switch (getPath(ghost, grid, pacman)) {
        case MOVE_BOTT:
            changeGhost(ghost, grid, 'y', 1)
            break;
        case MOVE_UP:
            changeGhost(ghost, grid, 'y', -1)
            break;
        case MOVE_LEFT:
            changeGhost(ghost, grid, 'x', -1)
            break;
        case MOVE_RIGHT:
            changeGhost(ghost, grid, 'x', 1)
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