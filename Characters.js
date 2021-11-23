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

class CharactersGhost extends Characters {
    constructor(indexX, indexY, last, classG) {
        super(indexX, indexY);
        this.lastX = indexX;
        this.lastY = indexY;
        this.last = last;
        this.class = classG;
    }
    hasAroundPac(pacman, ) {
        return Math.abs(this.indexX - pacman.indexX) <= 5 && Math.abs(this.indexY - pacman.indexY) <= 5;
    }
}