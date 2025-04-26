class FindNumberGame {
    constructor() {
        this.gameField = document.querySelector('.game-field');
        this.startBtn = document.querySelector('.start-btn');
        this.scoreElement = document.querySelector('.score');
        this.score = 0;

        this.init();
    }

    init() {
        this.startBtn.onclick = () => {
            this.startGame();
        }
    }

    startGame() {
        this.score = 0;
        this.scoreElement.textContent = `Счёт: ${this.score}`;
    }
}