import type { Card } from '@/types/cards';

export class MemoryGameController {
  private cards: Card[] = [];
  private flippedCards: Card[] = [];
  private moves = 0;
  private matches = 0;

  constructor(private numPairs: number) {
    this.initializeGame();
  }

  // Initialize the game with a shuffled deck
  private initializeGame(): void {
    const values = this.generateCardValues(this.numPairs);
    this.cards = this.shuffleDeck(values);
    this.moves = 0;
    this.matches = 0;
    this.flippedCards = [];
  }

  // Generate card values for pairs (e.g., ["A", "B", "C", "A", "B", "C"])
  private generateCardValues(numPairs: number): Card[] {
    const values: string[] = Array.from(
      { length: numPairs },
      (_, i) => String.fromCharCode(65 + i), // A, B, C...
    );
    return [...values, ...values].map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
  }

  // Shuffle the deck using Fisher-Yates algorithm
  private shuffleDeck(cards: Card[]): Card[] {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Flip a card and handle the game logic
  public flipCard(cardId: number): void {
    const card = this.cards.find((c) => c.id === cardId);

    if (!card || card.isFlipped || card.isMatched) {
      console.warn('Invalid move: Card is already flipped or matched');
      return;
    }

    card.isFlipped = true;
    this.flippedCards.push(card);

    // Check for matches if two cards are flipped
    if (this.flippedCards.length === 2) {
      this.moves++;
      this.checkForMatch();
    }
  }

  // Check if the two flipped cards match
  private checkForMatch(): void {
    const [card1, card2] = this.flippedCards;

    if (card1.value === card2.value) {
      console.log('Match found!');
      card1.isMatched = true;
      card2.isMatched = true;
      this.matches++;

      // Check if the game is won
      if (this.matches === this.numPairs) {
        console.log(`You won the game in ${this.moves} moves!`);
      }
    } else {
      console.log('No match. Flipping cards back...');
      setTimeout(() => {
        card1.isFlipped = false;
        card2.isFlipped = false;
      }, 1000); // Delay to show the cards
    }

    // Reset flipped cards
    this.flippedCards = [];
  }

  // Get the current state of the cards
  public getCards(): Card[] {
    return this.cards;
  }

  // Get the current number of moves
  public getMoves(): number {
    return this.moves;
  }

  // Restart the game
  public restartGame(): void {
    this.initializeGame();
    console.log('Game restarted!');
  }
}
