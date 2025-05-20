import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  Image, 
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type CameraScreenRouteProp = RouteProp<RootStackParamList, 'CameraScreen'>;
type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CameraScreen'>;

const CameraScreen: React.FC = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const route = useRoute<CameraScreenRouteProp>();
  const bookId = route.params?.bookId;

  useEffect(() => {
    (async () => {
      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== 'granted' || mediaStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Camera and media library permissions are required to use this feature.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
    })();
  }, [navigation]);

  const takePicture = async () => {    
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCapturedImage(result.assets[0].uri);
        await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to capture image');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  const processImage = async () => {
    if (!capturedImage) return;
    
    setIsProcessing(true);
    try {
      // Here we would normally call the Google Gemini API for OCR
      // For now, we'll simulate the process with a timeout
      setTimeout(() => {
        setIsProcessing(false);
        // Navigate to a screen where the user can review the extracted text
        // In a real implementation, we'd pass the extracted text and related data
        Alert.alert(
          'Processing Complete',
          'Text extraction simulation complete. In the full implementation, this would extract text from your image using the Google Gemini API.',
          [
            {
              text: 'Save Note', 
              onPress: () => {
                if (bookId) {
                  // If a bookId was provided, go back to the note list for that book
                  navigation.navigate('NoteList', { bookId, bookTitle: 'Book Title' });
                } else {
                  // Otherwise go back to the book list
                  navigation.navigate('BookList');
                }
              }
            }
          ]
        );
      }, 2000);
    } catch (error) {
      setIsProcessing(false);
      console.error('Error processing image:', error);
      Alert.alert('Error', 'Failed to process image');
    }
  };

  const resetCamera = () => {
    setCapturedImage(null);
  };

  // Loading state is not needed with this implementation

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {capturedImage ? (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: capturedImage }}
            style={styles.previewImage}
          />
          
          <View style={styles.buttonContainer}>
            {isProcessing ? (
              <View style={styles.processingContainer}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.processingText}>Processing image...</Text>
              </View>
            ) : (
              <>
                <TouchableOpacity 
                  style={[styles.button, styles.processButton]} 
                  onPress={processImage}
                >
                  <Text style={styles.buttonText}>Extract Text</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, styles.retakeButton]} 
                  onPress={resetCamera}
                >
                  <Text style={styles.buttonText}>Retake</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      ) : (
        <>
          <View style={styles.cameraPlaceholder}>
            <Text style={styles.placeholderText}>Camera Preview Placeholder</Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.captureButton]} 
              onPress={takePicture}
            >
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.galleryButton]} 
              onPress={pickImage}
            >
              <Text style={styles.buttonText}>Select from Gallery</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#000',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  captureButton: {
    backgroundColor: '#007AFF',
  },
  galleryButton: {
    backgroundColor: '#555',
  },
  processButton: {
    backgroundColor: '#34C759',
  },
  retakeButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  processingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  processingText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
});

export default CameraScreen;
