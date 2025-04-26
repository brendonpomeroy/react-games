// src/games/blackjack/types.ts

export type BlackJackScores = {
  wins: number;
  losses: number;
  draws: number;
};

function isBlackJackScoreCandidate(
  data: unknown,
): data is Partial<Record<keyof BlackJackScores, unknown>> {
  return typeof data === "object" && data !== null;
}

export const blackjackTransformer = (data: unknown): BlackJackScores => {
  if (!isBlackJackScoreCandidate(data)) {
    return { wins: 0, losses: 0, draws: 0 };
  }

  return {
    wins: typeof data.wins === "number" ? data.wins : 0,
    losses: typeof data.losses === "number" ? data.losses : 0,
    draws: typeof data.draws === "number" ? data.draws : 0,
  };
};
