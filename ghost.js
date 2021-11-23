let ghost = new CharactersGhost(0, 5, 'last-1', 'ghost');
let ghost1 = new CharactersGhost(7, 5, 'last-2', 'ghost-1');
let ghost2 = new CharactersGhost(7, 3, 'last-3', 'ghost-2');


function delGhost(ghost, grid) {
    document.querySelector(`.${ghost.last}`).classList.remove(`${ghost.last}`);
    grid[ghost.indexY][ghost.indexX].querySelector(`.${ghost.class}`).remove();
    grid[ghost.indexY][ghost.indexX].classList.add(`${ghost.last}`);
}

const isValidDir = (ghost, grid, axis, sign) => {

    if (axis === 'x') {
        if (sign > 0) {
            return ghost.indexX + 1 < grid.length && !grid[ghost.indexY][ghost.indexX + 1].classList.contains('wall') && !grid[ghost.indexY][ghost.indexX + 1].classList.contains(`${ghost.last}`)
        } else {
            return ghost.indexX - 1 >= 0 && !grid[ghost.indexY][ghost.indexX - 1].classList.contains('wall') && !grid[ghost.indexY][ghost.indexX - 1].classList.contains(`${ghost.last}`)
        }
    } else {
        if (sign > 0) {
            return ghost.indexY + 1 < grid.length && !grid[ghost.indexY + 1][ghost.indexX].classList.contains('wall') && !grid[ghost.indexY + 1][ghost.indexX].classList.contains(`${ghost.last}`)
        } else {
            return ghost.indexY - 1 >= 0 && !grid[ghost.indexY - 1][ghost.indexX].classList.contains('wall') && !grid[ghost.indexY - 1][ghost.indexX].classList.contains(`${ghost.last}`)
        }
    }

}

function getOptimalPath(ghost, grid, ) {
    let res = [];
    if (isValidDir(ghost, grid, 'y', 1)) { //вниз
        res.push(MOVE_BOTT)
    }
    if (isValidDir(ghost, grid, 'y', -1)) { // вверх
        res.push(MOVE_UP)
    }
    if (isValidDir(ghost, grid, 'x', -1)) { //влево
        res.push(MOVE_LEFT)
    }
    if (isValidDir(ghost, grid, 'x', 1)) { // вправо
        res.push(MOVE_RIGHT)
    }

    return getRandomInt(res);
}




function getOptimalPathForGhost1(ghost, grid, pacman) {
    let distance = [Infinity, Infinity, Infinity, Infinity, ];

    if (isValidDir(ghost, grid, 'y', 1)) { //вниз
        distance[MOVE_BOTT] = (Math.abs(ghost.indexX - pacman.indexX) + Math.abs(ghost.indexY + 1 - pacman.indexY))
    }
    if (isValidDir(ghost, grid, 'y', -1)) { // вверх
        distance[MOVE_UP] = (
            Math.abs(ghost.indexX - pacman.indexX) + Math.abs(ghost.indexY - pacman.indexY))
    }
    if (isValidDir(ghost, grid, 'x', -1)) { //влево
        distance[MOVE_LEFT] = (Math.abs(ghost.indexX - 1 - pacman.indexX) + Math.abs(ghost.indexY - pacman.indexY))
    }
    if (isValidDir(ghost, grid, 'x', 1)) { // вправо
        distance[MOVE_RIGHT] = (Math.abs(ghost.indexX + 1 - pacman.indexX) + Math.abs(ghost.indexY - pacman.indexY))
    }

    return (Math.min(...distance) !== Infinity) ? distance.indexOf(Math.min(...distance)) : -1;
}

let renderingGhost = (ghost, grid, axis, sign) => {
    delGhost(ghost, grid);
    if (axis === 'x') {
        ghost.lastX = ghost.indexX;
        ghost.indexX += sign;
        ghost.whatChange = 'x'
    } else {
        ghost.lastY = ghost.indexY;
        ghost.indexY += sign;
        ghost.whatChange = 'y'
    }
    ghost.addCharacterInGame(grid);
}

function ghostMove(ghost, grid, pacman, getPath) {
    switch (getPath(ghost, grid, pacman)) {
        case MOVE_BOTT:
            renderingGhost(ghost, grid, 'y', 1)
            break;
        case MOVE_UP:
            renderingGhost(ghost, grid, 'y', -1)
            break;
        case MOVE_LEFT:
            renderingGhost(ghost, grid, 'x', -1)
            break;
        case MOVE_RIGHT:
            renderingGhost(ghost, grid, 'x', 1)
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