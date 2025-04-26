// components/CardStack.tsx
import React from "react";
import PlayingCard from "./playing-card";

type PlayingCardData = {
  value: string;
  suit: string;
};

type PlayingCardStackProps = {
  cards: PlayingCardData[];
};

const CardStack: React.FC<PlayingCardStackProps> = ({ cards }) => {
  return (
    <div className="flex space-x-2">
      {cards.map((card, idx) => (
        <PlayingCard key={idx} value={card.value} suit={card.suit} />
      ))}
    </div>
  );
};

export default CardStack;
