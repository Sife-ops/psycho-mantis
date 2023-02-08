import { useGame } from "./game-hook";

export default function Game() {
  const game = useGame();

  return (
    <div>
      <div>{JSON.stringify(game.lobbyQueryRes.data)}</div>
    </div>
  );
}
