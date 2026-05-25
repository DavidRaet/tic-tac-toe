interface GameStatusProps {
  message: string;
}

export default function GameStatus({ message }: GameStatusProps) {
  return <p className="text-gray-500 text-lg min-h-7">{message}</p>;
}
