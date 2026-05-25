import type { CellValue } from '../types/game';
import Cell from './Cell';

interface BoardProps {
  board: CellValue[];
  winningCells: number[];
  onCellClick: (index: number) => void;
}

export default function Board({ board, winningCells, onCellClick }: BoardProps) {
  return (
    <div className="grid grid-cols-3">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          isWinning={winningCells.includes(index)}
        />
      ))}
    </div>
  );
}
