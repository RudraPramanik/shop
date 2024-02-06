// Favorite.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

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

  const removeFromFavorites = async (productId) => {
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
      {/* Display the list of favorite items */}
      {favorites.map((fav) => (
        <View key={fav.id} style={styles.item}>
          <Text>{fav.title}</Text>
          <Text>${fav.price}</Text>
          {/* Add a button to remove the item from favorites */}
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




// // Favorite.tsx
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Favorite = () => {
//   const [favorites, setFavorites] = useState([]);

//   useEffect(() => {
//     const loadFavorites = async () => {
//       try {
//         // Retrieve favorites from AsyncStorage
//         const favoritesString = await AsyncStorage.getItem('favorites');
//         if (favoritesString) {
//           setFavorites(JSON.parse(favoritesString));
//         }
//       } catch (error) {
//         console.error('Error loading favorites:', error);
//       }
//     };

//     loadFavorites();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>Favorite Screen</Text>
//       {/* Display the list of favorite items */}
//       {favorites.map((fav) => (
//         <View key={fav.id}>
//           <Text>{fav.title}</Text>
//           <Text>${fav.price}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Favorite;



