let ghost = new Characters(24);



function addGhost(ghost, grid) {
    grid[ghost.index].insertAdjacentElement(
        'afterbegin',
        ghost.name,
    )
}

function delGhost(ghost, grid) {
    document.querySelector('.last').classList.remove('last');
    grid[ghost.index].querySelector('.ghost').remove();
    grid[ghost.index].classList.add('last');
}

function ghostMove(ghost, grid) {
    let path = [0, 1, 2, 3, ];
    let delEl = [];
    getOptimalPath(ghost, grid, path, delEl);
    switch (getRandomInt(path)) {
        case 0:
            // saveIndex1(-step);
            delGhost(ghost, grid);
            ghost.index += step;
            addGhost(ghost, grid);
            break;
        case 1:
            // saveIndex2(step)
            delGhost(ghost, grid);
            ghost.index -= step;
            addGhost(ghost, grid);
            break;
        case 2:
            // saveIndex3(1)
            delGhost(ghost, grid);
            ghost.index--;
            addGhost(ghost, grid);
            break;
        case 3:
            // saveIndex4(-1)
            delGhost(ghost, grid);
            ghost.index++;
            addGhost(ghost, grid);
            break;
    }
    for (let i = 0; i < delEl.length; i++) {
        path.splice(delEl[i], 0, delEl[i])
    }
    delEl.splice(0, delEl.length);
}