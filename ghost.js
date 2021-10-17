let ghost = new Characters(0, 4);
ghost.lastX = 0;
ghost.lastY = 4;
ghost.whatChange = null;



function delGhost(ghost, grid) {
    document.querySelector('.last').classList.remove('last');
    grid[ghost.indexY][ghost.indexX].querySelector('.ghost').remove();
    grid[ghost.indexY][ghost.indexX].classList.add('last');
}

function getOptimalPath(ghost, grid, ) {
    let res = [];
    if (ghost.indexY + 1 < grid.length && !grid[ghost.indexY + 1][ghost.indexX].classList.contains('wall') && !grid[ghost.indexY + 1][ghost.indexX].classList.contains('last')) { //вниз
        res.push(MOVE_BOTT)
    }
    if (ghost.indexY - 1 >= 0 && !grid[ghost.indexY - 1][ghost.indexX].classList.contains('wall') && !grid[ghost.indexY - 1][ghost.indexX].classList.contains('last')) { // вверх
        res.push(MOVE_UP)
    }
    if (ghost.indexX - 1 >= 0 && !grid[ghost.indexY][ghost.indexX - 1].classList.contains('wall') && !grid[ghost.indexY][ghost.indexX - 1].classList.contains('last')) { //влево
        res.push(MOVE_LEFT)
    }
    if (ghost.indexX + 1 < grid.length && !grid[ghost.indexY][ghost.indexX + 1].classList.contains('wall') && !grid[ghost.indexY][ghost.indexX + 1].classList.contains('last')) { // вправо
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