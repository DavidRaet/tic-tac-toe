export type Player = 'X' | 'O';
export type CellValue = Player | null;

export type WinnerResult = [Player, number[]] | null;