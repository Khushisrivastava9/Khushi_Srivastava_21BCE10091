const ws = new WebSocket('ws://localhost:8080');
const gameBoard = document.getElementById('game-board');
const playerAControls = document.getElementById('player-a-controls');
const playerBControls = document.getElementById('player-b-controls');
const gameStatus = document.getElementById('game-status');
const currentTurnDisplay = document.getElementById('current-turn');
const timerDisplay = document.getElementById('timer');
const playerAScoreDisplay = document.getElementById('player-a-score');
const playerBScoreDisplay = document.getElementById('player-b-score');

let timer;
let timeLeft = 15;
let gameState = null;
let playerAScore = 0;
let playerBScore = 0;
let playerAName = "Player A";
let playerBName = "Player B";

// Load sound files
const clickSound = new Audio('sounds/click.wav'); // Assuming you have a .wav file for click sound
const scoreSound = new Audio('sounds/score.wav'); // Assuming you have a .wav file for score sound

// Function to play click sound
const playClickSound = () => {
    clickSound.play();
};

// Function to play score sound
const playScoreSound = () => {
    scoreSound.play();
};

// Function to play remove sound
const playRemoveSound = () => {
    removeSound.play();
};

// Initialize the game board
const initializeBoard = (state) => {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            if (state.grid[i][j]) {
                cell.textContent = state.grid[i][j];
                const player = state.grid[i][j].split('-')[0];
                cell.classList.add(player === 'A' ? 'player-a' : 'player-b');
            }
            gameBoard.appendChild(cell);
        }
    }
    updateGameStatus(state);
    updateCurrentTurn(state.turn);
    resetTimer();
};

// Handle incoming messages from the server
ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'state') {
        initializeBoard(message.state);
        togglePlayerControls(message.state.turn);
    } else if (message.type === 'error') {
        displayError(message.message);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const initialPositions = [
        { id: 'piece1', position: [0, 0] },
        { id: 'piece2', position: [0, 1] },
        // Add all initial positions here
    ];

    function updateScores(winner) {
        if (winner === 'A') {
            playerAScore++;
        } else if (winner === 'B') {
            playerBScore++;
        }
        playerAScoreDisplay.querySelector('span').textContent = playerAScore;
        playerBScoreDisplay.querySelector('span').textContent = playerBScore;
        playScoreSound(); // Play score sound when score is updated
    }

    function askPlayerNames() {
        playerAName = prompt("Enter the name of Player A:", "Player A");
        playerBName = prompt("Enter the name of Player B:", "Player B");

        playerAScoreDisplay.textContent = `${playerAName}: ${playerAScore}`;
        playerBScoreDisplay.textContent = `${playerBName}: ${playerBScore}`;
        currentTurnDisplay.textContent = `Current Turn: ${playerAName}`;
    }

    function updateMoveHistory(playerName, move) {
        const moveHistory = document.getElementById('move-history');
        const moveEntry = document.createElement('div');
        moveEntry.textContent = `${playerName}: ${move}`;
        moveHistory.appendChild(moveEntry);
        playClickSound(); // Play click sound when move history is updated
    }

    // Ask for player names on page load
    askPlayerNames();

    // Initialize the game board on page load
    // You can add your game initialization logic here if needed

    // Send the move command to the server
    const sendMove = (command) => {
        const player = playerAControls.style.display === 'block' ? 'A' : 'B';
        const playerName = player === 'A' ? playerAName : playerBName;
        ws.send(JSON.stringify({ type: 'move', player, character: command.split(':')[0], direction: command.split(':')[1] }));
        currentTurnDisplay.textContent = `Current Turn: ${playerName}`;
        updateMoveHistory(playerName, command);
        resetTimer(); // Reset the timer after a move
    };

    document.addEventListener('DOMContentLoaded', () => {
        resetTimer();
    });

    // Event listener for move buttons
    document.querySelectorAll('.move-btn').forEach(button => {
        button.addEventListener('click', () => {
            const command = button.getAttribute('data-move');
            const [character, direction] = command.split(':');
            const moveDescription = `${playerAControls.style.display === 'block' ? playerAName : playerBName} moved ${character} ${getMoveDescription(direction)}`;
            sendMove(command);

            // Add the move to the move history
            const historyDiv = document.getElementById('move-history');
            const moveParagraph = document.createElement('p');
            moveParagraph.textContent = moveDescription;
            historyDiv.appendChild(moveParagraph);

            resetTimer(); // Reset the timer after a move
        });
    });
});

// Toggle the controls for the current player
const togglePlayerControls = (currentTurn) => {
    if (currentTurn === 'A') {
        playerAControls.style.display = 'block';
        playerBControls.style.display = 'none';
        currentTurnDisplay.textContent = `Current Turn: ${playerAName}`;
    } else {
        playerAControls.style.display = 'none';
        playerBControls.style.display = 'block';
        currentTurnDisplay.textContent = `Current Turn: ${playerBName}`;
    }
};

// Update the game status display


// Function to display the current time
const displayCurrentTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    const currentTimeDisplay = document.getElementById('current-time');
    currentTimeDisplay.textContent = `Game ended at: ${currentTime}`;
};

// Function to hide the current turn and timer bar
// Function to hide the current turn and timer capsule
const hideCurrentTurnAndTimer = () => {
    const currentTurnDisplay = document.getElementById('current-turn');
    const timerCapsule = document.getElementById('timer');
    if (currentTurnDisplay) {
        currentTurnDisplay.style.display = 'none';
    }
    if (timerCapsule) {
        timerCapsule.style.display = 'none';
    }
};
// Update the game status display
const updateGameStatus = (state) => {
    let statusText = `Current Turn: Player ${state.turn}`;
    if (state.winner) {
        statusText = `Game Over! Player ${state.winner} wins!`;
        updateCurrentTurn(`Player ${state.winner} wins!`);
        clearInterval(timer); // Stop the timer when the game is over
        updateScores(state.winner);
        displayCurrentTime(); // Display the current time when the game ends
        hideCurrentTurnAndTimer(); // Hide the current turn and timer capsule
    }
    gameStatus.textContent = statusText;
};

// Update the current turn display
const updateCurrentTurn = (turn) => {
    const playerName = turn === 'A' ? playerAName : playerBName;
    currentTurnDisplay.textContent = `Current Turn: ${playerName}`;
};

// Display error messages to the user

// Display error messages to the user
const displayError = (message) => {
    gameStatus.textContent = `Error: ${message}`;
};

// Convert direction codes to descriptive text
const getMoveDescription = (direction) => {
    switch (direction) {
        case 'F': return 'forward';
        case 'B': return 'backward';
        case 'L': return 'left';
        case 'R': return 'right';
        case 'FL': return 'forward-left';
        case 'FR': return 'forward-right';
        case 'BL': return 'backward-left';
        case 'BR': return 'backward-right';
        default: return 'unknown direction';
    }
};

// Reset the timer for the current turn
const resetTimer = () => {
    clearInterval(timer);
    timeLeft = 30;
    timerDisplay.innerHTML = '<div id="timer-bar"></div>'; // Reset the timer bar
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            switchTurn(); // Switch turn when timer reaches zero
        }
    }, 1000);
};

// Switch the turn to the other player
const switchTurn = () => {
    const currentTurn = playerAControls.style.display === 'block' ? 'A' : 'B';
    const nextTurn = currentTurn === 'A' ? 'B' : 'A';
    togglePlayerControls(nextTurn);
    updateCurrentTurn(nextTurn);
    resetTimer();
};

// Update the scores based on the winner
const updateScores = (winner) => {
    if (winner === 'A') {
        playerAScore++;
        playerAScoreDisplay.textContent = `${playerAName}: ${playerAScore}`;
    } else if (winner === 'B') {
        playerBScore++;
        playerBScoreDisplay.textContent = `${playerBName}: ${playerBScore}`;
    }
    playScoreSound(); // Play score sound when score is updated
};
document.getElementById('toggle-rules').addEventListener('click', () => {
    const rules = document.getElementById('rules');
    const toggleButton = document.getElementById('toggle-rules');
    
    if (rules.style.display === 'none' || rules.style.display === '') {
        rules.style.display = 'block';
        toggleButton.textContent = 'Hide Rules';
    } else {
        rules.style.display = 'none';
        toggleButton.textContent = 'Show Rules';
    }
});