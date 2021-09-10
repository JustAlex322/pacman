function createBoard(level) {
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