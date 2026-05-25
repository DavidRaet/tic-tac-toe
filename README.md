# Tic-Tac-Toe

A simple Tic-Tac-Toe game built with React, TypeScript, and Vite. The app keeps the game logic separated from the UI so the board state, win detection, and game status are easy to follow.

## Features

- 3x3 Tic-Tac-Toe board
- Alternating X and O turns
- Win detection for all 8 winning lines
- Winning cells highlighted in the UI
- Reset button to start a new game
- Draw detection when the board is full

## Tech Stack

- React
- TypeScript
- Vite
- ESLint

## Setup / Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

## How to Run

Start the development server:

```bash
npm run dev
```

Open the app in your browser at the local Vite URL shown in the terminal.

To build the project:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Demo

<div>
    <a href="https://www.loom.com/share/4aa41525cc2c4fba9693f4f7b87b1384">
      <p>Tic-Tac-Toe Demo - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/4aa41525cc2c4fba9693f4f7b87b1384">
      <img style="max-width:900px;" src="https://cdn.loom.com/sessions/thumbnails/4aa41525cc2c4fba9693f4f7b87b1384-8d80f1e4fbe8af93-full-play.gif#t=0.1">
    </a>
  </div>



## What I Learned

- How to structure a React project with TypeScript and Vite
- Refreshing my knowledge of managing state in a React application
- TypeScript with React for smaller projects can be seen as having compilation and setup overhead. Additionally, spending more time on type work: unions, interfaces, etc. 
  - However, making that tradeoff is necessary since the goal is to continue building disciplined habits as a developer and impose self-documentation for my sanity


## Future Improvements

- Add an AI opponent for the user to fight against 
- Keep a score tally for each player's win 
- Add backend and persistence for auth 
- Add a different game mode like tic-tac-toe on a bigger grid

## License

Copyright © 2026 David Raet.

This project is MIT licensed.