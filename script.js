    const board = document.querySelector('#game-board');
    const score = document.querySelector('#score');

    let flag = false;
    let step = 6;

    const level = [
        2, 1, 1, 1, 1, 0,
        1, 1, 0, 1, 1, 0,
        1, 1, 0, 1, 1, 0,
        1, 1, 0, 1, 1, 0,
        1, 1, 0, 1, 1, 0,
    ];

    let grid = [];


    function createBoard() {
        for (let i = 0; i < level.length; i++) {
            let block = document.createElement('div');
            switch (level[i]) {
                case 0:
                    block.classList.add('wall');
                    break;
                case 1:
                    block.classList.add('point');
                    break;
            }
            board.insertAdjacentElement(
                'beforeend',
                block,
            )
            grid.push(block); //пригодится что бы дальше реализовать движение пакмена
        }
    }
    createBoard();

    function getCountPoint() {
        let count = 0;
        for (let i = 0; i < level.length; i++) {
            count += level[i] == 1;
        }
        return count;
    }

    let countPoint = getCountPoint();



    let indexPacman = 0;
    let pacMan = document.createElement('img');
    pacMan.src = "pacman2.jpg";
    pacMan.classList.add('pacman');
    grid[indexPacman].insertAdjacentElement(
        'afterbegin',
        pacMan,
    )

    let point = 0;


    function delPacman() {
        grid[indexPacman].querySelector('.pacman').remove();
    }


    function printCountPoint() {
        point += grid[indexPacman].classList.contains('point');
        score.textContent = point;
    }

    function addPacman() {
        grid[indexPacman].className = 'empty';
        grid[indexPacman].insertAdjacentElement(
            'afterbegin',
            pacMan,
        )

    }

    function avtoMovePacman() {
        if (level[indexPacman + 1] != 0 && (indexPacman + 1) % (step) != 0) {
            delPacman();
            indexPacman++;
            printCountPoint();
            addPacman();
        }
    }

    function movePacman() {
        let flag = false;
        document.addEventListener('keydown', userMove);
        if (!flag) {
            avtoMovePacman();
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



    function userMove(e) {
        flag = true;
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
    // призраки

    let indexGhost = 24;
    let Ghost = document.createElement('img');
    Ghost.src = "ghost1.jpg";
    Ghost.classList.add('ghost');
    grid[indexGhost].insertAdjacentElement(
        'afterbegin',
        Ghost,
    )

    function delGhost() {
        grid[indexGhost].querySelector('.ghost').remove();
    }

    function getRandomInt(path) {
        return path[Math.floor(Math.random() * path.length)] //Максимум не включается, минимум включается
    }

    function addGhost() {
        grid[indexGhost].insertAdjacentElement(
            'afterbegin',
            Ghost,
        )
    }

    function getOptimalPath(path, delEl) {
        let countDel = 0;
        if (indexGhost + step >= grid.length || grid[indexGhost + step].classList.contains('wall')) { //вниз
            delEl.push(Number(path.splice(countDel, 1)));
            countDel++;
        }
        if (indexGhost - step < 0 || grid[indexGhost - step].classList.contains('wall')) { // вверх
            delEl.push(Number(path.splice(1 - countDel, 1)));
            countDel++;
        }
        if (indexGhost % step == 0 || grid[indexGhost - 1].classList.contains('wall')) { //влево
            delEl.push(Number(path.splice(2 - countDel, 1)));
            countDel++;
        }
        if ((indexGhost + 1) % (step) == 0 || grid[indexGhost + 1].classList.contains('wall')) { // вправо
            delEl.push(Number(path.splice(3 - countDel, 1)));
            countDel++;
        }
    }


    function ghostMove() {
        let path = [0, 1, 2, 3, ];
        let delEl = [];
        getOptimalPath(path, delEl);
        switch (getRandomInt(path)) {
            case 0:
                delGhost();
                indexGhost += step;
                addGhost();
                break;
            case 1:
                delGhost();
                indexGhost -= step;
                addGhost();
                break;
            case 2:
                delGhost();
                indexGhost--;
                addGhost();
                break;
            case 3:
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



    function checkLose() {
        if (point == countPoint) {
            alert('Победа за тобой...А Я ... ОБРЕТУ ПОКОЙ!');
            return 0;
        } else if (indexPacman == indexGhost) {
            alert('ТЫ ЖАЛОК!!!!');
            return 1;
        }
        return 2;
    }

    function game() {
        let f;
        let timerId = setTimeout(function tick() {
            movePacman();
            timerId = setTimeout(tick, 800); // (*)
        }, 800);
        let timerId2 = setTimeout(function tick2() {
            ghostMove();
            timerId2 = setTimeout(tick2, 800); // (*)
        }, 800);
        let timerId3 = setTimeout(function tick3() {
            f = checkLose();
            if (f == 0 || f == 1) {
                clearTimeout(timerId);
                clearTimeout(timerId2);
                clearTimeout(timerId3);
                return;
            }
            timerId3 = setTimeout(tick3, 0); // (*)
        }, 50);
    }

    game();