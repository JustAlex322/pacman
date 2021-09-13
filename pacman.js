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

    voice() {
        alert('voice')
    }

}

let pacman = new Characters(0);

console.log(pacman);

function addPacman(pacman) {
    grid[pacman.index].classList.remove('point');
    grid[pacman.index].classList.add('empty');
    grid[pacman.index].insertAdjacentElement(
        'afterbegin',
        pacman.name,
    )
}

function delPacman(pacman) {
    grid[pacman.index].classList.remove('pacman');
}

function autoMovePacman(pacman) {
    if (level[pacman.index + 1] != 0 && (pacman.index + 1) % (step) != 0) {
        delPacman(pacman);
        pacman.index++;
        printCountPoint(pacman);
        addPacman(pacman);
    }
}

function movePacman(pacman) {
    if (!flag3) {
        autoMovePacman(pacman);
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



function userMove(e, pacman) {
    flag3 = true;
    switch (getUserChoose(e)) {
        case 0:
            if (!grid[pacman.index + step].classList.contains('wall') && pacman.index + step < grid.length) { // шаг вниз
                delPacman(pacman);
                pacman.index += step;
                printCountPoint(pacman);
                addPacman(pacman);
            }
            break;
        case 1:
            if (!grid[pacman.index - step].classList.contains('wall') && pacman.index >= 6) { // шаг вверх
                delPacman(pacman);
                pacman.index -= step;
                printCountPoint(pacman);
                addPacman(pacman);
            }
            break;
        case 2:
            if (!grid[pacman.index - 1].classList.contains('wall') && pacman.index % step != 0) { // шаг влелво
                delPacman(pacman);
                pacman.index--;
                printCountPoint(pacman);
                addPacman(pacman);
            }
            break;
        case 3:
            if (!grid[pacman.index + 1].classList.contains('wall') && (pacman.index + 1) % (step) != 0) { // шаг вправо
                delPacman(pacman);
                pacman.index++;
                printCountPoint(pacman);
                addPacman(pacman);
            }
            break;
    }
}