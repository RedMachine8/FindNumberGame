class FindNumberGame {
    timeInterval = 0;
    constructor() {
        this.timeDisplay = document.getElementById('time');
        this.levelDisplay = document.getElementById('level');
        this.scoreDisplay = document.getElementById('score');
        this.bonusDisplay = document.getElementById('bonus');
        this.tableNumbers = document.getElementById('numbers');
        this.numbers = [];
        this.targetNumber = document.getElementById('target-number');
        this.startTime = 59;
    }

    generateNumbers() {
        this.targetNumber.textContent = Math.floor(Math.random() * 999) + 1;
        let number = 0;
        for(let i = 0; i<8; i++) {
            this.numbers.push(Math.floor(Math.random() * 999) + 1);
        }
        this.numbers.push(this.targetNumber.textContent);
        this.numbers = this.shuffleArray(this.numbers);
    }

    shuffleArray(array) {
        for(let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    createGrid() {
        const color = ['red', 'orange', 'gold', 'blue', 'yellowgreen','green', 'purple', 'deeppink', 'darkgreen'];
        this.tableNumbers.innerHTML = '';
        this.numbers.forEach(num => {
             const cell = document.createElement('div');
             cell.textContent = num;
             cell.className = 'number';
             cell.style.backgroundColor = `${color[Math.floor(Math.random() * 9)]}`;
             cell.addEventListener('click', () => this.checkNumber(num));
             this.tableNumbers.appendChild(cell);
        });
    }

    checkNumber(clickedNum) {
        if(clickedNum === this.targetNumber.textContent) {
            this.levelDisplay.textContent = parseInt(this.levelDisplay.textContent) + 1;
            this.bonusDisplay.textContent = parseInt(this.bonusDisplay.textContent) + 1;
            this.scoreDisplay.textContent = parseInt(this.scoreDisplay.textContent) +  (15 * parseInt(this.bonusDisplay.textContent));
            this.nextLevel(); 
        } else {
            this.levelDisplay.textContent = parseInt(this.levelDisplay.textContent) + 1;
            this.bonusDisplay.textContent = parseInt(this.bonusDisplay.textContent) - 1;
            this.scoreDisplay.textContent = parseInt(this.scoreDisplay.textContent) - 15;
            this.nextLevel();
        }
    }
    
    nextLevel() {
        this.numbers = [];
        this.generateNumbers();
        this.createGrid();
    }

    updateTimer() {
        const timer = parseInt(this.timeDisplay.textContent); 
        const hhTimer = new Date(timer * 1000).toISOString().slice(14, 19);
        this.timeDisplay.textContent = hhTimer;
        this.startTime--;
    }

    startGame() {
        this.levelDisplay.textContent = 1;
        this.bonusDisplay.textContent = 1;
        this.scoreDisplay.textContent = 0;
        this.generateNumbers();
        this.createGrid();
        this.timeInterval = setInterval(this.updateTimer, 1000);
    }
}

const newGame = new FindNumberGame();
window.addEventListener('load', () => {
    newGame.startGame();
});