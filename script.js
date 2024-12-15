// DOM Elements
const gameContainer = document.getElementById('gameContainer');
const circle = document.getElementById('circle');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('resetButton');
const gameOverMessage = document.getElementById('gameOverMessage');
const finalScore = document.getElementById('finalScore');

// Variables
let score = 0;
let timeLeft = 30; // Timer starts at 30 seconds
let gameInterval;
let timerInterval;
let highScore = localStorage.getItem('highScore') || 0;

// Start the game
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    gameOverMessage.style.display = 'none';

    moveCircle();
    startTimer();
}

// Move the circle to a random position
function moveCircle() {
    const containerRect = gameContainer.getBoundingClientRect();
    const circleSize = 20; // Circle size

    // Calculate random positions
    const x = Math.random() * (containerRect.width - circleSize);
    const y = Math.random() * (containerRect.height - circleSize);

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}

// Timer countdown
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Handle circle click
circle.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;

    // Move the circle again
    moveCircle();
});

// End the game
function endGame() {
    clearInterval(gameInterval);
    finalScore.textContent = score;
    gameOverMessage.style.display = 'block';

    // Save high score to local storage
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        alert(`New High Score: ${highScore}`);
    }
}

// Reset the game
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    startGame();
});

// Initialize the game on load
startGame();
