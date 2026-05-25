import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

function getCells() {
  return screen.getAllByRole('button').filter(
    btn => btn.textContent !== 'Play Again'
  );
}

function clickCell(index: number) {
  fireEvent.click(getCells()[index]);
}

function getPlayAgainButton() {
  return screen.getByRole('button', { name: /play again/i });
}

describe('Initial State', () => {
  test('renders 9 empty cells', () => {
    render(<App />);
    const cells = getCells();
    expect(cells).toHaveLength(9);
    cells.forEach(cell => expect(cell).toHaveTextContent(''));
  });

  test("shows X's turn initially", () => {
    render(<App />);
    expect(screen.getByText("X's turn")).toBeInTheDocument();
  });
});

describe('Turn Taking', () => {
  test("clicking an empty cell places X on the first move", () => {
    render(<App />);
    clickCell(0);
    expect(getCells()[0]).toHaveTextContent('X');
  });

  test('turn switches to O after X plays', () => {
    render(<App />);
    clickCell(0);
    expect(screen.getByText("O's turn")).toBeInTheDocument();
  });

  test('turn switches back to X after O plays', () => {
    render(<App />);
    clickCell(0); // X
    clickCell(1); // O
    expect(screen.getByText("X's turn")).toBeInTheDocument();
  });
});

describe('Cell Click Guards', () => {
  test('clicking an occupied cell does not change its value', () => {
    render(<App />);
    clickCell(0); // X plays at 0
    clickCell(0); // attempt again at 0
    expect(getCells()[0]).toHaveTextContent('X');
  });

  test("clicking an occupied cell does not advance the turn", () => {
    render(<App />);
    clickCell(0); // X plays
    clickCell(0); // invalid — still O's turn
    expect(screen.getByText("O's turn")).toBeInTheDocument();
  });

  test('clicking a cell after the game is won does nothing', () => {
    render(<App />);
    // X wins row 0
    clickCell(0); 
    clickCell(3);
    clickCell(1); 
    clickCell(4);
    clickCell(2); // X wins
    clickCell(5); // attempt after win
    expect(getCells()[5]).toBeEmptyDOMElement();
  });
});

describe('Win Detection', () => {
  test('X wins on row 0 (cells 0, 1, 2)', () => {
    render(<App />);
    clickCell(0); clickCell(3);
    clickCell(1); clickCell(4);
    clickCell(2);
    expect(screen.getByText('X wins!')).toBeInTheDocument();
  });

  test('X wins on row 1 (cells 3, 4, 5)', () => {
    render(<App />);
    clickCell(3); clickCell(0);
    clickCell(4); clickCell(1);
    clickCell(5);
    expect(screen.getByText('X wins!')).toBeInTheDocument();
  });

  test('X wins on row 2 (cells 6, 7, 8)', () => {
    render(<App />);
    clickCell(6); clickCell(0);
    clickCell(7); clickCell(1);
    clickCell(8);
    expect(screen.getByText('X wins!')).toBeInTheDocument();
  });

  test('X wins on column 0 (cells 0, 3, 6)', () => {
    render(<App />);
    clickCell(0); clickCell(1);
    clickCell(3); clickCell(2);
    clickCell(6);
    expect(screen.getByText('X wins!')).toBeInTheDocument();
  });

  test('X wins on column 1 (cells 1, 4, 7)', () => {
    render(<App />);
    clickCell(1); clickCell(0);
    clickCell(4); clickCell(2);
    clickCell(7);
    expect(screen.getByText('X wins!')).toBeInTheDocument();
  });

  test('X wins on column 2 (cells 2, 5, 8)', () => {
    render(<App />);
    clickCell(2); clickCell(0);
    clickCell(5); clickCell(1);
    clickCell(8);
    expect(screen.getByText('X wins!')).toBeInTheDocument();
  });

  test('X wins on diagonal (cells 0, 4, 8)', () => {
    render(<App />);
    clickCell(0); clickCell(1);
    clickCell(4); clickCell(2);
    clickCell(8);
    expect(screen.getByText('X wins!')).toBeInTheDocument();
  });

  test('X wins on anti-diagonal (cells 2, 4, 6)', () => {
    render(<App />);
    clickCell(2); clickCell(0);
    clickCell(4); clickCell(1);
    clickCell(6);
    expect(screen.getByText('X wins!')).toBeInTheDocument();
  });

  test('O wins', () => {
    render(<App />);
    // O wins row 0 (cells 0, 1, 2) — X fills 3, 4, 6 without winning
    clickCell(3); clickCell(0);
    clickCell(4); clickCell(1);
    clickCell(6); clickCell(2);
    expect(screen.getByText('O wins!')).toBeInTheDocument();
  });
});

describe('Draw Detection', () => {
  test("shows \"It's a draw!\" when the board is full with no winner", () => {
    render(<App />);
    // Board result: X O X / X X O / O X O — no winning line
    clickCell(0); // X
    clickCell(1); // O
    clickCell(2); // X
    clickCell(5); // O
    clickCell(3); // X
    clickCell(6); // O
    clickCell(4); // X
    clickCell(8); // O
    clickCell(7); // X
    expect(screen.getByText("It's a draw!")).toBeInTheDocument();
  });

  test('no moves can be made after a draw', () => {
    render(<App />);
    clickCell(0); clickCell(1);
    clickCell(2); clickCell(5);
    clickCell(3); clickCell(6);
    clickCell(4); clickCell(8);
    clickCell(7); // draw
    // All cells are filled — nothing changes if we try clicking any
    const cellsBefore = getCells().map(c => c.textContent);
    clickCell(0); // already filled, but also game is over
    const cellsAfter = getCells().map(c => c.textContent);
    expect(cellsAfter).toEqual(cellsBefore);
  });
});

describe('Winning Cell Highlighting', () => {
  test('the 3 winning cells are highlighted', () => {
    render(<App />);
    // X wins row 0 (cells 0, 1, 2)
    clickCell(0); clickCell(3);
    clickCell(1); clickCell(4);
    clickCell(2);
    const cells = getCells();
    expect(cells[0]).toHaveClass('bg-yellow-100');
    expect(cells[1]).toHaveClass('bg-yellow-100');
    expect(cells[2]).toHaveClass('bg-yellow-100');
  });

  test('non-winning cells are not highlighted after a win', () => {
    render(<App />);
    clickCell(0); clickCell(3);
    clickCell(1); clickCell(4);
    clickCell(2);
    const cells = getCells();
    expect(cells[3]).not.toHaveClass('bg-yellow-100');
    expect(cells[4]).not.toHaveClass('bg-yellow-100');
    expect(cells[5]).not.toHaveClass('bg-yellow-100');
  });
});

describe('Reset', () => {
  test('Play Again clears the board', () => {
    render(<App />);
    clickCell(0); clickCell(1); clickCell(2);
    fireEvent.click(getPlayAgainButton());
    getCells().forEach(cell => expect(cell).toHaveTextContent(''));
  });

  test("Play Again resets the status to X's turn", () => {
    render(<App />);
    clickCell(0);
    fireEvent.click(getPlayAgainButton());
    expect(screen.getByText("X's turn")).toBeInTheDocument();
  });

  test('moves work normally after reset', () => {
    render(<App />);
    // Play a full game then reset
    clickCell(0); clickCell(3);
    clickCell(1); clickCell(4);
    clickCell(2); // X wins
    fireEvent.click(getPlayAgainButton());
    clickCell(4);
    expect(getCells()[4]).toHaveTextContent('X');
  });
});
