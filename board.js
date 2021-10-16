function createBoard(level, grid) {
    let tempArr = [];
    for (let i = 0; i < level.length; i++) {
        tempArr = [];
        for (let j = 0; j < level[i].length; j++) {
            let block = document.createElement('div');
            switch (level[i][j]) {
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
            tempArr.push(block); //пригодится что бы дальше реализовать движение пакмена
        }
        grid.push(Array.from(tempArr));
    }
}