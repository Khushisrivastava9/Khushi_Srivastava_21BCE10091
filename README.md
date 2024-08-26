# 5x5 Advanced Chess Game

Welcome to the 5x5 Advanced Chess Game! This project is a turn-based, chess-inspired game featuring a server-client architecture, real-time communication via WebSockets, and a web-based user interface. The game is designed to be engaging and visually appealing, with several additional challenges and features to enhance the user experience.

## Table of Contents

- [Overview](#overview)
- [Workflow and Screenshots](#workflow-and-screenshots)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [Technical Requirements](#technical-requirements)
- [Bonus Challenges](#bonus-challenges)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

The 5x5 Advanced Chess Game is a strategic, turn-based game with a server-client architecture. It features real-time communication using WebSockets and a web-based user interface. The primary focus is on implementing accurate game logic, efficient network communication, and proper move validation on both client and server sides.

## Workflow and Screenshots

### Workflow

1. **Game Initialization**: Players enter their names and set up their teams.
2. **Gameplay**: Players take turns making moves, with the game state updating in real-time.
3. **Move Validation**: The server validates each move and updates the game state accordingly.
4. **Game Conclusion**: The game ends when one player eliminates all of the opponent's pieces, and the winner is announced.

### Screenshots

![Game Board](path/to/screenshot1.png)
*Description: The main game board showing the 5x5 grid and player pieces.*

![Move History](path/to/screenshot2.png)
*Description: The move history log showing all moves made during the game.*

![Game Over](path/to/screenshot3.png)
*Description: The game over screen showing the winner and options to start a new game.*

## Features

### Core Game Logic

- Accurate implementation of 5x5 advanced chess game rules
- Real-time synchronization of game state between server and all connected clients

### WebSocket Server

- Event Handling: For game initialization, player moves, and game state updates.
- Real-time Synchronization: Ensures game state is synchronized between server and all connected clients.

### Web Interface

- Display of a 5x5 game board
- WebSocket communication with the server
- Client-side move validation
- Display of valid moves for selected characters
- Sending move commands to the server and handling responses
- Event handling for game initialization, player moves, and game state updates

### Edge Cases Handled

- Simultaneous move attempts by multiple clients.
- Disconnection and reconnection of clients during an ongoing game.
- Attempts to make moves out of turn.
- Handling of game state when a player quits mid-game.
- Proper game termination when all opponent's pieces are eliminated.

### Additional Features

- Move validation to prevent selection or movement of opponent's pieces
- Validation of moves within the 5x5 grid boundaries
- Validation of moves according to each character type's movement rules
- Prevention of friendly fire
- Handling and communication of invalid move attempts to the user
- Handling of simultaneous move attempts by multiple clients
- Disconnection and reconnection of clients during an ongoing game
- Handling of attempts to make moves out of turn
- Handling of game state when a player quits mid-game
- Proper game termination when all opponent's pieces are eliminated

### Bonus Features Implemented

- **Ranking System**: Tracks player performance across multiple games through a scoreboard.
- **Replay System**: Allows players to review past games move by move.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Khushisrivastava9/Khushi_Srivastava_21BCE10091.git
