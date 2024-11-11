import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, Keyboard } from 'react-native';
import uuid from 'react-native-uuid'; // Correcting the import for UUID generation

// Define the type for a dish
interface Dish {
  id: string;
  name: string;
  description: string;
  courseType: string;
  price: number;
}

const App: React.FC = () => {
  const [mealName, setMealName] = useState('');
  const [description, setDescription] = useState('');
  const [courseType, setCourseType] = useState('');
  const [price, setPrice] = useState('');
  const [dishes, setDishes] = useState<Dish[]>([]); // Specify the state type

  // Function to add a new dish
  const addDish = () => {
    const parsedPrice = parseFloat(price); // Parse price to float
    if (mealName && description && courseType && !isNaN(parsedPrice)) {
      setDishes([...dishes, { id: uuid.v4() as string, name: mealName, description, courseType, price: parsedPrice }]);
      setMealName('');
      setDescription('');
      setCourseType('');
      setPrice('');
      Keyboard.dismiss(); // Dismiss the keyboard after adding a dish
    } else {
      Alert.alert('Error', 'Please fill in all fields with valid data'); // Improved error handling
    }
  };

  // Function to delete a dish by ID
  const deleteDish = (id: string) => { // Specify the type for id
    setDishes(dishes.filter(dish => dish.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MenuMaster</Text>

      {/* Input fields for meal details */}
      <TextInput
        style={styles.input}
        placeholder="Meal Name"
        value={mealName}
        onChangeText={setMealName}
        accessible={true} // Accessibility improvements
        accessibilityLabel="Meal Name"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        accessible={true}
        accessibilityLabel="Description"
      />
      <TextInput
        style={styles.input}
        placeholder="Course Type"
        value={courseType}
        onChangeText={setCourseType}
        accessible={true}
        accessibilityLabel="Course Type"
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        accessible={true}
        accessibilityLabel="Price"
      />

      <Button title="Add Dish" onPress={addDish} />

      {/* List of dishes */}
      <FlatList
        data={dishes}
        renderItem={({ item }) => (
          <View style={styles.dishItem}>
            <Text style={styles.dishText}>{item.name} - ${item.price.toFixed(2)}</Text>
            <Text style={styles.dishText}>{item.description}</Text>
            <Text style={styles.dishText}>{item.courseType}</Text>
            <TouchableOpacity onPress={() => deleteDish(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No dishes added yet.</Text>} // Empty state handling
      />
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  dishItem: {
    marginVertical: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  dishText: {
    fontSize: 18,
  },
  deleteText: {
    color: 'red',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default App;

    
