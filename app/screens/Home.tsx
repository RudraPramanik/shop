import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

interface Props {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const Home: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const navigateToDetails = (product: Product) => {
    navigation.navigate('Details', { product });
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title.split(' ').slice(0, 4).join(' ')}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    width: 170,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Home;




// // Home.tsx
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import axios from 'axios';

// const Home = ({ navigation }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('https://fakestoreapi.com/products')
//       .then(response => {
//         setProducts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching products:', error);
//       });
//   }, []);

//   const navigateToDetails = (product) => {
//     navigation.navigate('Details', { product });
//   };
//   console.log(products)

//   const renderProductItem = ({ item }) => (
    
//     <TouchableOpacity onPress={() => navigateToDetails(item)}>
//     <View style={styles.card}>
//       <Image source={{ uri: item.image }} style={styles.image} />
//       <View style={styles.detailsContainer}>
//         <Text style={styles.title}>{item.title.split(' ').slice(0, 4).join(' ')}</Text>
//         <Text style={styles.price}>${item.price}</Text>
//       </View>
//     </View>
//   </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={products}
//         renderItem={renderProductItem}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     paddingVertical: 20,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     margin: 10,
//     width: 150,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   image: {
//     width: '100%',
//     height: 100,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   detailsContainer: {
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   price: {
//     fontSize: 14,
//     color: 'gray',
//   },
// });

// export default Home;
