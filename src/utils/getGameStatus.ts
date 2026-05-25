import type { CellValue, Player, WinnerResult } from '../types/game';

interface GetGameStatusParams {
    board: CellValue[];
    currentPlayer: Player;
    result: WinnerResult;
}

export default function getGameStatus({ board, currentPlayer, result }: GetGameStatusParams): string {
    if (result) {
        return `${currentPlayer} wins!`;
    }

    if (board.every(cell => cell !== null)) {
        return "It's a draw!";
    }

    return `${currentPlayer}'s turn`;
}