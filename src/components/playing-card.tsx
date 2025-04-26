// components/Card.tsx
import React from 'react';

type PlayingCardProps = {
  value: string;
  suit: string;
};

const Card: React.FC<PlayingCardProps> = ({ value, suit }) => {
  const isRed = suit === '♥' || suit === '♦';
  return (
    <div
      className={`w-12 h-16 flex items-center justify-center border rounded-md shadow bg-white text-xl font-bold ${
        isRed ? 'text-red-600' : 'text-black'
      }`}
    >
      {value}
      {suit}
    </div>
  );
};

export default Card;
