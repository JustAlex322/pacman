class Characters {
    constructor(index) {
        this.index = index;
        this.name = document.createElement('img');
    }

    createCharacter(src, classN, grid) {
        this.name.src = `${src}`;
        this.name.classList.add(`${classN}`);
        grid[this.index].insertAdjacentElement(
            'afterbegin',
            this.name,
        )
    }


}

let pacman = new Characters(0);

function addPacman(pacman, grid) {
    grid[pacman.index].classList.remove('point');
    grid[pacman.index].classList.add('empty');
    grid[pacman.index].insertAdjacentElement(
        'afterbegin',
        pacman.name,
    )
}

function delPacman(pacman, grid) {
    grid[pacman.index].classList.remove('pacman');
}

function autoMovePacman(pacman, level, grid) {
    if (level[pacman.index + 1] != 0 && (pacman.index + 1) % (step) != 0) {
        delPacman(pacman, grid);
        pacman.index++;
        printCountPoint(pacman, grid);
        addPacman(pacman, grid);
    }
}

function movePacman(pacman, level, grid) {
    if (!flag) {
        autoMovePacman(pacman, level, grid);
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
            if (!grid[pacman.index + step].classList.contains('wall') && pacman.index + step < grid.length) { // шаг вниз
                delPacman(pacman, grid);
                pacman.index += step;
                printCountPoint(pacman, grid);
                addPacman(pacman, grid);
            }
            break;
        case 1:
            if (!grid[pacman.index - step].classList.contains('wall') && pacman.index >= 6) { // шаг вверх
                delPacman(pacman, grid);
                pacman.index -= step;
                printCountPoint(pacman, grid);
                addPacman(pacman, grid);
            }
            break;
        case 2:
            if (!grid[pacman.index - 1].classList.contains('wall') && pacman.index % step != 0) { // шаг влелво
                delPacman(pacman, grid);
                pacman.index--;
                printCountPoint(pacman, grid);
                addPacman(pacman, grid);
            }
            break;
        case 3:
            if (!grid[pacman.index + 1].classList.contains('wall') && (pacman.index + 1) % (step) != 0) { // шаг вправо
                delPacman(pacman, grid);
                pacman.index++;
                printCountPoint(pacman, grid);
                addPacman(pacman, grid);
            }
            break;
    }
}