let indexGhost = 24;

function createGhost(src) {
    let ghost = document.createElement('img');
    ghost.src = `${src}`;
    ghost.classList.add('ghost');
    grid[indexGhost].insertAdjacentElement(
        'afterbegin',
        ghost,
    );
    return ghost;
}

function addGhost() {
    grid[indexGhost].insertAdjacentElement(
        'afterbegin',
        ghost,
    )
}

function delGhost() {
    document.querySelector('.last').classList.remove('last');
    grid[indexGhost].querySelector('.ghost').remove();
    grid[indexGhost].classList.add('last');
}

function ghostMove() {
    let path = [0, 1, 2, 3, ];
    let delEl = [];
    getOptimalPath(path, delEl);
    switch (getRandomInt(path)) {
        case 0:
            // saveIndex1(-step);
            delGhost();
            indexGhost += step;
            addGhost();
            break;
        case 1:
            // saveIndex2(step)
            delGhost();
            indexGhost -= step;
            addGhost();
            break;
        case 2:
            // saveIndex3(1)
            delGhost();
            indexGhost--;
            addGhost();
            break;
        case 3:
            // saveIndex4(-1)
            delGhost();
            indexGhost++;
            addGhost();
            break;
    }
    for (let i = 0; i < delEl.length; i++) {
        path.splice(delEl[i], 0, delEl[i])
    }
    delEl.splice(0, delEl.length);
}