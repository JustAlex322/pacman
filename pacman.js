let pacman = new Characters(12, 12);
pacman.whatChange = MOVE_RIGHT;

function addPacman(pacman, grid) {
    grid[pacman.indexY][pacman.indexX].classList.remove('point');
    grid[pacman.indexY][pacman.indexX].classList.add('empty');
    grid[pacman.indexY][pacman.indexX].insertAdjacentElement(
        'afterbegin',
        pacman.name,
    )
}

function delPacman(pacman, grid) {
    grid[pacman.indexY][pacman.indexX].classList.remove('pacman');
}

function autoMovePacman(pacman, grid) {
    if (!flag) {
        movePacman(pacman.whatChange, grid, pacman);
    }
    flag = false;
}


function getUserChoice(e) {
    switch (e.key) {
        case 'ArrowUp':
            return MOVE_UP;
        case 'ArrowDown':
            return MOVE_BOTT;
        case 'ArrowLeft':
            return MOVE_LEFT;
        case 'ArrowRight':
            return MOVE_RIGHT;
    }
}


const renderingPacman = (pacman, grid, axis, sign) => {
    delPacman(pacman, grid);
    if (axis === 'x') {
        pacman.indexX += sign;
    } else {
        pacman.indexY += sign
    }
    printCountPoint(pacman, grid);
    addPacman(pacman, grid);
}

function movePacman(direction, grid, pacman) {
    switch (direction) {
        case MOVE_BOTT:
            if (pacman.indexY + 1 < grid.length && !grid[pacman.indexY + 1][pacman.indexX].classList.contains('wall')) { // шаг вниз
                renderingPacman(pacman, grid, 'y', 1)
            }
            break;
        case MOVE_UP:
            if (pacman.indexY > 0 && !grid[pacman.indexY - 1][pacman.indexX].classList.contains('wall')) { // шаг вверх
                renderingPacman(pacman, grid, 'y', -1)
            }
            break;
        case MOVE_LEFT:
            if (pacman.indexX - 1 >= 0 && !grid[pacman.indexY][pacman.indexX - 1].classList.contains('wall')) { // шаг влелво
                renderingPacman(pacman, grid, 'x', -1)
            }
            break;
        case MOVE_RIGHT:
            if ((pacman.indexX + 1) <= (grid[0].length - 1) && !grid[pacman.indexY][pacman.indexX + 1].classList.contains('wall')) { // шаг вправо
                renderingPacman(pacman, grid, 'x', 1)
            }
            break;
    }
}

function userMove(e, pacman, grid) {
    flag = true;
    let direction = getUserChoice(e);
    movePacman(direction, grid, pacman);
    pacman.whatChange = direction;
}