interface ResetButtonProps {
  onClick: () => void;
}

export default function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 cursor-pointer"
    >
      Play Again
    </button>
  );
}
