import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type BookListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BookList'>;

// This is a placeholder until we implement the database
type Book = {
  id: number;
  title: string;
};

const BookListScreen: React.FC = () => {
  const navigation = useNavigation<BookListScreenNavigationProp>();
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'Sample Book 1' },
    { id: 2, title: 'Sample Book 2' },
  ]);
  const [newBookTitle, setNewBookTitle] = useState('');

  const handleAddBook = () => {
    if (newBookTitle.trim() === '') {
      Alert.alert('Error', 'Book title cannot be empty');
      return;
    }

    // In the real implementation, this would add to the database
    const newBook: Book = {
      id: books.length + 1,
      title: newBookTitle.trim(),
    };

    setBooks([...books, newBook]);
    setNewBookTitle('');
  };

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigation.navigate('NoteList', { bookId: item.id, bookTitle: item.title })}
    >
      <Text style={styles.bookTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Books</Text>
      
      <View style={styles.addBookContainer}>
        <TextInput
          style={styles.input}
          value={newBookTitle}
          onChangeText={setNewBookTitle}
          placeholder="Enter book title"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddBook}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
      
      <TouchableOpacity 
        style={styles.captureButton}
        onPress={() => navigation.navigate('CameraScreen', {})}
      >
        <Text style={styles.captureButtonText}>Capture New Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  bookItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  addBookContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  captureButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  captureButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookListScreen;
