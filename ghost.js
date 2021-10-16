let ghost = new Characters(0, 4);



// function addGhost(ghost, grid) {
//     grid[ghost.index].insertAdjacentElement(
//         'afterbegin',
//         ghost.name,
//     )
// }

function delGhost(ghost, grid) {
    document.querySelector('.last').classList.remove('last');
    grid[ghost.indexY][ghost.indexX].querySelector('.ghost').remove();
    grid[ghost.indexY][ghost.indexX].classList.add('last');
}

function ghostMove(ghost, grid) {
    let path = [0, 1, 2, 3, ];
    let delEl = [];
    getOptimalPath(ghost, grid, path, delEl);
    switch (getRandomInt(path)) {
        case 0:
            // saveindexY(-step);
            delGhost(ghost, grid);
            ghost.indexY++;
            ghost.addCharacterInGame(grid);
            break;
        case 1:
            // saveIndex2(step)
            delGhost(ghost, grid);
            ghost.indexY--;
            ghost.addCharacterInGame(grid);
            break;
        case 2:
            // saveIndex3(1)
            delGhost(ghost, grid);
            ghost.indexX--;
            ghost.addCharacterInGame(grid);
            break;
        case 3:
            // saveIndex4(-1)
            delGhost(ghost, grid);
            ghost.indexX++;
            ghost.addCharacterInGame(grid);
            break;
    }
    path.splice(0);
    delEl.splice(0);
}