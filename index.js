class FindNumberGame {
    constructor() {
        this.timeDisplay = document.getElementById('time');
        this.levelDisplay = document.getElementById('level');
        this.scoreDisplay = document.getElementById('score');
        this.bonusDisplay = document.getElementById('bonus');
        this.tableNumbers = document.getElementById('numbers');
        this.resultPopUp = document.getElementById('popupResult');
        this.buttonRestart = document.getElementById('buttonRestart');
        this.result = document.getElementById('result');
        this.numbers = [];
        this.targetNumber = document.getElementById('target-number');
    }

    generateNumbers(count) {
        this.targetNumber.textContent = Math.floor(Math.random() * 999) + 1;
        for(let i = 0; i<count; i++) {
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

    createGrid(row, col) {
        const color = ['red', 'orange', 'gold', 'blue', 'yellowgreen','green', 'purple', 'deeppink', 'darkgreen'];
        this.tableNumbers.innerHTML = '';
        this.tableNumbers.style.gridTemplateRows = `repeat(${row}, 120px)`;
        this.tableNumbers.style.gridTemplateColumns = `repeat(${col}, auto)`;
        this.numbers.forEach(num => {
             const cellDiv = document.createElement('div');
             const cellP = document.createElement('p');
             cellP.textContent = num;
             cellDiv.className = 'numberBox';
             if(parseInt(this.levelDisplay.textContent) > 4) {
                const randomBool = Math.random() < 0.75;
                if(randomBool) {
                    cellDiv.style.animation = 'tilt-shake 0.3s linear infinite';
                }
             }
             if(parseInt(this.levelDisplay.textContent) > 7) {
                const randomBool = Math.random() < 0.75;
                if(randomBool) {
                    cellP.style.animation = 'tilt-shake 0.3s linear infinite';
                }
             }
             cellDiv.style.backgroundColor = `${color[Math.floor(Math.random() * 9)]}`;
             cellDiv.addEventListener('click', () => this.checkNumber(num));
             cellDiv.appendChild(cellP);
             this.tableNumbers.appendChild(cellDiv);
        });
    }

    checkNumber(clickedNum) {
        if(clickedNum === this.targetNumber.textContent) {
            if(parseInt(this.levelDisplay.textContent) < 9)
                this.levelDisplay.textContent = parseInt(this.levelDisplay.textContent) + 1;
            if(parseInt(this.bonusDisplay.textContent) < 4)
                this.bonusDisplay.textContent = parseInt(this.bonusDisplay.textContent) + 1;
            this.scoreDisplay.textContent = parseInt(this.scoreDisplay.textContent) +  (15 * parseInt(this.bonusDisplay.textContent));
            this.nextLevel(); 
        } else {
            if(parseInt(this.levelDisplay.textContent) <= 9)
                this.levelDisplay.textContent = parseInt(this.levelDisplay.textContent) + 1;
            if(parseInt(this.bonusDisplay.textContent) > 1)
                this.bonusDisplay.textContent = parseInt(this.bonusDisplay.textContent) - 1;
            this.nextLevel();
        }
    }
    
    nextLevel() {
        if(parseInt(this.levelDisplay.textContent) < 9) {
            this.numbers = [];
            if(parseInt(this.levelDisplay.textContent) >= 1 && parseInt(this.levelDisplay.textContent) <= 4) {
                this.generateNumbers(8);
                this.createGrid(3, 3);
            }
            if(parseInt(this.levelDisplay.textContent) >= 5 && parseInt(this.levelDisplay.textContent) <= 6) {
                this.generateNumbers(11);
                this.createGrid(3 , 4);
            }
            if(parseInt(this.levelDisplay.textContent) >= 7 && parseInt(this.levelDisplay.textContent) <= 9) {
                this.generateNumbers(14);
                this.createGrid(3, 5);
            }
        } else {
            this.resultPopUp.style.display = 'flex';
            this.result.textContent = parseInt(this.scoreDisplay.textContent);
            this.buttonRestart.addEventListener('click', () => this.restartGame());
            clearInterval(this.timeInterval);
        }
    }

    updateTimer() {
        let hhTimer = new Date(newGame.startTime * 1000).toISOString().slice(14, 19);
        newGame.timeDisplay.textContent = hhTimer;
        if(newGame.startTime === 0) {
            newGame.resultPopUp.style.display = 'flex';
            newGame.result.textContent = parseInt(newGame.scoreDisplay.textContent);
            newGame.buttonRestart.addEventListener('click', () => newGame.restartGame());
            clearInterval(newGame.timeInterval);
        }
        newGame.startTime--;
    }

    startGame() {
        this.levelDisplay.textContent = 1;
        this.bonusDisplay.textContent = 1;
        this.scoreDisplay.textContent = 0;
        this.generateNumbers(8);
        this.createGrid(3, 3);
        this.timeInterval = setInterval(this.updateTimer, 1000);
    }
    restartGame() {
        clearInterval(this.timeInterval);
        this.resultPopUp.style.display = 'none';
        this.numbers = [];
        this.levelDisplay.textContent = 1;
        this.bonusDisplay.textContent = 1;
        this.scoreDisplay.textContent = 0;
        this.startTime = 59;
        this.generateNumbers(8);
        this.createGrid(3, 3);
        this.timeInterval = setInterval(this.updateTimer, 1000);
    }
}

const newGame = new FindNumberGame();
window.addEventListener('load', () => {
    newGame.startGame();
});
