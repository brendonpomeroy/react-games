// components/BlackjackGame.tsx
import React, { useEffect, useState } from 'react';
import PlayingCardStack from './playing-card-stack';
import { Button } from './button';

const suits = ['♠', '♣', '♥', '♦'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

type Card = {
  suit: string;
  value: string;
};

function getCardValue(value: string): number {
  if (['K', 'Q', 'J'].includes(value)) return 10;
  if (value === 'A') return 11;
  return parseInt(value);
}

function calculateTotal(hand: Card[]): number {
  let total = 0;
  let aces = 0;

  for (const card of hand) {
    const val = getCardValue(card.value);
    total += val;
    if (card.value === 'A') aces += 1;
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }

  return total;
}

function getNewDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
}

const BlackjackGame: React.FC = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newDeck = getNewDeck();
    const player = [newDeck.pop()!, newDeck.pop()!];
    const dealer = [newDeck.pop()!, newDeck.pop()!];
    setDeck(newDeck);
    setPlayerHand(player);
    setDealerHand(dealer);
    setGameOver(false);
    setMessage('');
  };

  const hit = () => {
    if (gameOver) return;
    const newCard = deck.pop()!;
    const newHand = [...playerHand, newCard];
    setDeck(deck);
    setPlayerHand(newHand);

    if (calculateTotal(newHand) > 21) {
      setMessage('Bust! Dealer wins.');
      setGameOver(true);
    }
  };

  const stand = () => {
    const dealer = [...dealerHand];
    while (calculateTotal(dealer) < 17) {
      dealer.push(deck.pop()!);
    }

    const playerTotal = calculateTotal(playerHand);
    const dealerTotal = calculateTotal(dealer);

    let result = '';
    if (dealerTotal > 21 || playerTotal > dealerTotal) {
      result = 'You win!';
    } else if (playerTotal < dealerTotal) {
      result = 'Dealer wins.';
    } else {
      result = 'Push.';
    }

    setDealerHand(dealer);
    setMessage(result);
    setGameOver(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0b3d2e]">
    <div className="p-4 max-w-xl mx-4 bg-[#14532d] text-white rounded-xl shadow-lg w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">♠ Blackjack ♠</h1>

      <div className="mb-4">
        <p className="font-semibold">Your Hand ({calculateTotal(playerHand)}):</p>
        <PlayingCardStack cards={playerHand} />
      </div>

      <div className="mb-4">
        <p className="font-semibold">Dealer's Hand ({gameOver ? calculateTotal(dealerHand) : '??'}):</p>
        <PlayingCardStack cards={dealerHand} />
      </div>

      {!gameOver && (
        <div className="space-x-3 mt-4">
          <Button variant='gold' onClick={hit}>
            Hit
          </Button>
          <Button variant='red' onClick={stand}>
            Stand
          </Button>
        </div>
      )}

      {message && <p className="mt-4 text-lg">{message}</p>}

      {gameOver && (<Button variant='blue' onClick={startNewGame}>
        New Game
      </Button>)}
    </div>
    </div>
  );
};

export default BlackjackGame;
