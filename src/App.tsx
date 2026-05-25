import { useState } from 'react';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import ResetButton from './components/ResetButton';
import calculateWinner from './utils/calculateWinner';
import deriveGameStatus from './utils/getGameStatus';
import type { CellValue, Player } from './types/game';

export default function App() {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const result = calculateWinner(board);
  const winningCells: number[] = result ? result[1] : [];

  function handleCellClick(index: number): void {
    if (result) {
      return;
    }

    setBoard(prevBoard => {
      const nextBoard = [...prevBoard];

      if (nextBoard[index]) {
        return prevBoard;
      }

      nextBoard[index] = currentPlayer;

      if (calculateWinner(nextBoard) || nextBoard.every(cell => cell !== null)) {
        return nextBoard;
      }

      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

      return nextBoard;
    });
  }

  function getGameStatus(): string {
    return deriveGameStatus({ board, currentPlayer, result });
  }

  function resetGame(): void {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-gray-800">Tic-Tac-Toe</h1>
        <GameStatus message={getGameStatus()} />
        <Board board={board} winningCells={winningCells} onCellClick={handleCellClick} />
        <ResetButton onClick={resetGame} />
      </div>
    </div>
  );
}