class Characters {
    constructor(indexX, indexY) {
        this.indexY = indexY;
        this.indexX = indexX;
        this.name = document.createElement('img');
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


let pacman = new Characters(0, 0);

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
    if ((pacman.indexX + 1) <= grid[0].length - 1 && !grid[pacman.indexY][pacman.indexX + 1].classList.contains('wall')) {
        delPacman(pacman, grid);
        pacman.indexX++;
        printCountPoint(pacman, grid);
        addPacman(pacman, grid);
    }
}

function movePacman(pacman, grid) {
    if (!flag) {
        autoMovePacman(pacman, grid);
    }
    flag = false;
}


function getUserChoose(e) {
    switch (e.key) {
        case 'ArrowDown':
            return 0;
        case 'ArrowUp':
            return 1;
        case 'ArrowLeft':
            return 2;
        case 'ArrowRight':
            return 3;
    }
}



function userMove(e, pacman, grid) {
    flag = true;
    switch (getUserChoose(e)) {
        case 0:
            if (pacman.indexY + 1 < grid.length && !grid[pacman.indexY + 1][pacman.indexX].classList.contains('wall')) { // шаг вниз
                delPacman(pacman, grid);
                pacman.indexY++;
                printCountPoint(pacman, grid);
                addPacman(pacman, grid);
            }
            break;
        case 1:
            if (pacman.indexY > 0 && !grid[pacman.indexY - 1][pacman.indexX].classList.contains('wall')) { // шаг вверх
                delPacman(pacman, grid);
                pacman.indexY--;
                printCountPoint(pacman, grid);
                addPacman(pacman, grid);
            }
            break;
        case 2:
            if (pacman.indexX - 1 >= 0 && !grid[pacman.indexY][pacman.indexX - 1].classList.contains('wall')) { // шаг влелво
                delPacman(pacman, grid);
                pacman.indexX--;
                printCountPoint(pacman, grid);
                addPacman(pacman, grid);
            }
            break;
        case 3:
            if ((pacman.indexX + 1) <= (grid[0].length - 1) && !grid[pacman.indexY][pacman.indexX + 1].classList.contains('wall')) { // шаг вправо
                delPacman(pacman, grid);
                pacman.indexX++;
                printCountPoint(pacman, grid);
                addPacman(pacman, grid);
            }
            break;
    }
}