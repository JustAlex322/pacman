class Characters {
    constructor(indexX, indexY) {
        this.indexY = indexY;
        this.indexX = indexX;
        this.name = document.createElement('img');
        this.whatChange = null;
        this.life = 10;
    }

    createCharacter(src, classN, ) {
        this.name.src = `${src}`;
        this.name.classList.add(`${classN}`);
    }

    addCharacterInGame(grid) {
        grid[this.indexY][this.indexX].insertAdjacentElement(
            'afterbegin',
            this.name,
        )
    }
}


let pacman = new Characters(14, 14);
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


function getUserChoose(e) {
    switch (e.key) {
        case 'ArrowUp':
            return 0;
        case 'ArrowDown':
            return 1;
        case 'ArrowLeft':
            return 2;
        case 'ArrowRight':
            return 3;
    }
}

function movePacman(direction, grid, pacman) {
    switch (direction) {
        case MOVE_BOTT:
            if (pacman.indexY + 1 < grid.length && !grid[pacman.indexY + 1][pacman.indexX].classList.contains('wall')) { // шаг вниз
                delPacman(pacman, grid);
                pacman.indexY++;
                printCountPoint(pacman, grid);
                addPacman(pacman, grid);
            }
            break;
        case MOVE_UP:
            if (pacman.indexY > 0 && !grid[pacman.indexY - 1][pacman.indexX].classList.contains('wall')) { // шаг вверх
                delPacman(pacman, grid);
                pacman.indexY--;
                printCountPoint(pacman, grid);
                addPacman(pacman, grid);
            }
            break;
        case MOVE_LEFT:
            if (pacman.indexX - 1 >= 0 && !grid[pacman.indexY][pacman.indexX - 1].classList.contains('wall')) { // шаг влелво
                delPacman(pacman, grid);
                pacman.indexX--;
                printCountPoint(pacman, grid);
                addPacman(pacman, grid);
            }
            break;
        case MOVE_RIGHT:
            if ((pacman.indexX + 1) <= (grid[0].length - 1) && !grid[pacman.indexY][pacman.indexX + 1].classList.contains('wall')) { // шаг вправо
                delPacman(pacman, grid);
                pacman.indexX++;
                printCountPoint(pacman, grid);
                addPacman(pacman, grid);
            }
            break;
    }
}

function userMove(e, pacman, grid) {
    flag = true;
    let direction = getUserChoose(e);
    movePacman(direction, grid, pacman);
    pacman.whatChange = direction;
}