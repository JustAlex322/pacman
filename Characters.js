class Characters {
    constructor(indexX, indexY) {
        this.indexY = indexY;
        this.indexX = indexX;
        this.name = document.createElement('img');
        this.whatChange = null;
        this.life = 3;
    }

    createCharacter(src, classN, ) {
        this.name.src = `${src}`;
        this.name.classList.add(`${classN}`);
    }

    addCharacterInGame(grid) {
        grid[this.indexY][this.indexX].insertAdjacentElement(
            'afterbegin',
            this.name,
        )
    }
}