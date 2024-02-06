import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Product {
  id: number;
  title: string;
  price: number;
}

type DetailsRouteProp = RouteProp<{ Details: { product: Product } }, 'Details'>;

type DetailsNavigationProp = StackNavigationProp<{}>;

type Props = {
  route: DetailsRouteProp;
  navigation: DetailsNavigationProp;
};

const Details: React.FC<Props> = ({ route, navigation }) => {
  const { product } = route.params;

  const addToFavorites = async () => {
    try {
      // Retrieve existing favorites from AsyncStorage or initialize an empty array
      const favoritesString = await AsyncStorage.getItem('favorites');
      const favorites: Product[] = favoritesString ? JSON.parse(favoritesString) : [];

      // Check if the product is already in favorites
      if (!favorites.some((fav) => fav.id === product.id)) {
        // Add the product to favorites
        favorites.push(product);
        // Update AsyncStorage with the new favorites list
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Product added to favorites!');
      } else {
        alert('Product is already in favorites!');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{product.title}</Text>
      <Text>${product.price}</Text>
      {/* Add a button to add the product to favorites */}
      <Button title="Add to Favorites" onPress={addToFavorites} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Details;




// // Details.tsx
// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Details = ({ route }) => {
//   const { product } = route.params;

//   const addToFavorites = async () => {
//     try {
//       // Retrieve existing favorites from AsyncStorage or initialize an empty array
//       const favoritesString = await AsyncStorage.getItem('favorites');
//       const favorites = favoritesString ? JSON.parse(favoritesString) : [];

//       // Check if the product is already in favorites
//       if (!favorites.some((fav) => fav.id === product.id)) {
//         // Add the product to favorites
//         favorites.push(product);
//         // Update AsyncStorage with the new favorites list
//         await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
//         alert('Product added to favorites!');
//       } else {
//         alert('Product is already in favorites!');
//       }
//     } catch (error) {
//       console.error('Error adding to favorites:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>{product.title}</Text>
//       <Text>${product.price}</Text>
//       {/* Add a button to add the product to favorites */}
//       <Button title="Add to Favorites" onPress={addToFavorites} />
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

// export default Details;




