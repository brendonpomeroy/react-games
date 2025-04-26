// src/games/blackjack/components/Stats.tsx
import { ReactNode } from "react";
import { useScores } from "@/services/scores/scores-hook";
import { BlackJackScores, blackjackTransformer } from "./blackjack-scores";
import { BLACKJACK_SCORES_KEY } from "@/constants";

export const BlackjackStats: () => ReactNode = () => {
  const scores = useScores();
  const { wins, losses, draws } = scores.get<BlackJackScores>(
    BLACKJACK_SCORES_KEY,
    blackjackTransformer,
  );

  return (
    <div className="bg-green-950/70 text-gold border border-green-950 rounded-xl px-4 py-2 w-full max-w-sm mx-auto mt-4 shadow-lg">
      <div className="space-y-1 text-lg text-center font-mono flex flex-row justify-between items-center">
        <div>
          <span className="text-green-300">Wins:</span> {wins}
        </div>
        <div>
          <span className="text-red-400">Losses:</span> {losses}
        </div>
        <div>
          <span className="text-yellow-300">Draws:</span> {draws}
        </div>
      </div>
    </div>
  );
};
