class CharactersGhost extends Characters {
    constructor(indexX, indexY, last, classG) {
        super(indexX, indexY);
        this.lastX = indexX;
        this.lastY = indexY;
        this.last = last;
        this.class = classG;
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


function getMin(arr) {
    let min = 1000;
    let minIndex = 5;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== undefined) {
            if (min > Math.floor(arr[i])) {
                min = Math.floor(arr[i]);
                minIndex = i
            }
        }
    }
    return minIndex;
}

function getOptimalPath(ghost, grid, pacman) {
    let distance = new Array(4);

    if (ghost.indexY + 1 < grid.length && !grid[ghost.indexY + 1][ghost.indexX].classList.contains('wall') && !grid[ghost.indexY + 1][ghost.indexX].classList.contains(`${ghost.last}`)) { //вниз
        distance[MOVE_BOTT] = (Math.abs(ghost.indexX - pacman.indexX) + Math.abs(ghost.indexY + 1 - pacman.indexY))
    }
    if (ghost.indexY - 1 >= 0 && !grid[ghost.indexY - 1][ghost.indexX].classList.contains('wall') && !grid[ghost.indexY - 1][ghost.indexX].classList.contains(`${ghost.last}`)) { // вверх
        distance[MOVE_UP] = (Math.abs(ghost.indexX - pacman.indexX) + Math.abs(ghost.indexY - 1 - pacman.indexY))
    }
    if (ghost.indexX - 1 >= 0 && !grid[ghost.indexY][ghost.indexX - 1].classList.contains('wall') && !grid[ghost.indexY][ghost.indexX - 1].classList.contains(`${ghost.last}`)) { //влево
        distance[MOVE_LEFT] = (Math.abs(ghost.indexX - 1 - pacman.indexX) + Math.abs(ghost.indexY - pacman.indexY))
    }
    if (ghost.indexX + 1 < grid.length && !grid[ghost.indexY][ghost.indexX + 1].classList.contains('wall') && !grid[ghost.indexY][ghost.indexX + 1].classList.contains(`${ghost.last}`)) { // вправо
        distance[MOVE_RIGHT] = (Math.abs(ghost.indexX + 1 - pacman.indexX) + Math.abs(ghost.indexY - pacman.indexY))
    }
    return getMin(distance)

}

function ghostMove(ghost, grid, pacman) {

    switch (getOptimalPath(ghost, grid, pacman)) {
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