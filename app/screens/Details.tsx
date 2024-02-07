import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
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
       <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.detailsContainer} >
      <Text style={styles.title} >{product.title}</Text>
      <Text style={styles.price} >${product.price}</Text>
      <Text style={styles.description} >${product.description}</Text>
      <TouchableOpacity onPress={addToFavorites} style={styles.button}>
            <Text style={styles.buttonText}>Add To Favourite</Text>
          </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '40%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    marginBottom: 20,
  },
  description:{
    fontSize: 14,
    marginBottom: 20,
    marginHorizontal:10,
  },
  backButton: {
    marginTop:20,
    fontSize: 16,
    color: 'blue',
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  button: {
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    borderColor:"#591091",
    borderWidth:2,
    elevation: 0,
  },
  buttonText: {
    color:  "#591091",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Details;








