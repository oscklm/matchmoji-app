export type Card = {
  id: number; // Unique identifier for each card
  value: string; // Value to match (e.g., "A", "B", "C")
  isFlipped: boolean; // Whether the card is currently flipped
  isMatched: boolean; // Whether the card has been matched
};
