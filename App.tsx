import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/navigation';
import HomeScreen from './src/screens/HomeScreen';
import BookListScreen from './src/screens/BookListScreen';
import CameraScreen from './src/screens/CameraScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent', // transparent or '#fff' for white
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
            borderBottomWidth: 0, // Remove border
          },
          headerTintColor: '#222', // subtle dark color
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
            color: '#222',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookList"
          component={BookListScreen}
          options={{ title: 'My Books' }}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{ title: 'Capture Note', headerStyle: { backgroundColor: '#000' }, headerTintColor: '#fff' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
