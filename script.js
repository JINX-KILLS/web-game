const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');
const resultModal = document.getElementById('resultModal');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameBtn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = Array.from(board.children).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== "" || !gameActive) return;

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('taken', currentPlayer); // Add 'taken' and 'X' or 'O' class

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        resultMessage.textContent = `Player ${currentPlayer} wins!`;
        resultModal.style.display = 'flex'; // Show modal
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        resultMessage.textContent = "It's a draw!";
        resultModal.style.display = 'flex'; // Show modal
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
    gameActive = true;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Rotate starting player
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

    Array.from(board.children).forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('taken', 'X', 'O');
    });
    resultModal.style.display = 'none'; // Hide the result modal when starting a new game
}

function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

createBoard();
restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', restartGame);  // Button for new game after a result
