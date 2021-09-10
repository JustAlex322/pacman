let indexPacman = 0;

function addPacman() {
    grid[indexPacman].classList.remove('point');
    grid[indexPacman].classList.add('empty');
    grid[indexPacman].insertAdjacentElement(
        'afterbegin',
        pacMan,
    )
}

function delPacman() {
    grid[indexPacman].classList.remove('pacman');
}

function autoMovePacman() {
    if (level[indexPacman + 1] != 0 && (indexPacman + 1) % (step) != 0) {
        delPacman();
        indexPacman++;
        printCountPoint();
        addPacman();
    }
}

function movePacman() {
    if (!flag3) {
        autoMovePacman();
    }
    flag3 = false;
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



function userMove(e) {
    flag3 = true;
    switch (getUserChoose(e)) {
        case 0:
            if (!grid[indexPacman + step].classList.contains('wall') && indexPacman + step < grid.length) { // шаг вниз
                delPacman();
                indexPacman += step;
                printCountPoint();
                addPacman();
            }
            break;
        case 1:
            if (!grid[indexPacman - step].classList.contains('wall') && indexPacman >= 6) { // шаг вверх
                delPacman();
                indexPacman -= step;
                printCountPoint();
                addPacman();
            }
            break;
        case 2:
            if (!grid[indexPacman - 1].classList.contains('wall') && indexPacman % step != 0) { // шаг влелво
                delPacman();
                indexPacman--;
                printCountPoint();
                addPacman();
            }
            break;
        case 3:
            if (!grid[indexPacman + 1].classList.contains('wall') && (indexPacman + 1) % (step) != 0) { // шаг вправо
                delPacman();
                indexPacman++;
                printCountPoint();
                addPacman();
            }
            break;
    }
}