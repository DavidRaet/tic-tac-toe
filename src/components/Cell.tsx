type CellValue = 'X' | 'O' | null;

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinning: boolean;
}

export default function Cell({ value, onClick, isWinning }: CellProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-24 h-24 border border-gray-300 flex items-center justify-center cursor-pointer text-4xl font-bold text-gray-800 ${isWinning ? 'bg-yellow-100' : 'bg-white hover:bg-gray-50'}`}
    >
      {value}
    </button>
  );
}
