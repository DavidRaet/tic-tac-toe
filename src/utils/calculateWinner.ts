import type { CellValue, WinnerResult } from '../types/game';

const WINNING_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
] as const;

export default function calculateWinner(board: CellValue[]): WinnerResult {
    for (const [firstIndex, secondIndex, thirdIndex] of WINNING_LINES) {
        const firstValue = board[firstIndex];

        if (
            firstValue !== null &&
            firstValue === board[secondIndex] &&
            firstValue === board[thirdIndex]
        ) {
            return [firstValue, [firstIndex, secondIndex, thirdIndex]];
        }
    }

    return null;
}