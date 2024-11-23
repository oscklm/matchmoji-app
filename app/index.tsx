import { useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import { MemoryGameController } from '@/lib/GameController';
import type { Card } from '@/types/cards';

const App = () => {
  const [controller] = useState(new MemoryGameController(6)); // 6 pairs of cards
  const [cards, setCards] = useState<Card[]>(controller.getCards());
  const [moves, setMoves] = useState(0);

  const handleCardPress = (cardId: number) => {
    controller.flipCard(cardId);
    setCards([...controller.getCards()]); // Update the card state
    setMoves(controller.getMoves());
  };

  const restartGame = () => {
    controller.restartGame();
    setCards([...controller.getCards()]);
    setMoves(0);
  };

  const renderCard = ({ item }: { item: Card }) => {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          item.isFlipped || item.isMatched ? styles.cardFlipped : null,
        ]}
        onPress={() => handleCardPress(item.id)}
        disabled={item.isFlipped || item.isMatched}
      >
        <Text style={styles.cardText}>
          {item.isFlipped || item.isMatched ? item.value : '?'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Game</Text>
      <Text style={styles.status}>Moves: {moves}</Text>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
      <TouchableOpacity style={styles.button} onPress={restartGame}>
        <Text style={styles.buttonText}>Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
  },
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 80,
    height: 120,
    margin: 5,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  cardFlipped: {
    backgroundColor: '#4caf50',
  },
  cardText: {
    fontSize: 32,
    color: '#fff',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
