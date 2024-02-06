import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  id: number;
  title: string;
  price: number;
}

const Favorite: React.FC = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // Retrieve favorites from AsyncStorage
        const favoritesString = await AsyncStorage.getItem('favorites');
        if (favoritesString) {
          setFavorites(JSON.parse(favoritesString));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  const removeFromFavorites = async (productId: number) => {
    try {
      // Filter out the product with the given id
      const updatedFavorites = favorites.filter((fav) => fav.id !== productId);
      // Update AsyncStorage with the updated favorites list
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      // Update state to reflect the changes
      setFavorites(updatedFavorites);
      alert('Product removed from favorites!');
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Favorite Screen</Text>
      {favorites.map((fav) => (
        <View key={fav.id} style={styles.item}>
          <Text>{fav.title}</Text>
          <Text>${fav.price}</Text>
          <Button title="Remove" onPress={() => removeFromFavorites(fav.id)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginBottom: 10,
  },
});

export default Favorite;


