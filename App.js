// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CatalogProvider } from './hooks/CatalogContext';
import { UserProvider } from './hooks/UserContext';

import CatalogLoader from './screens/CatalogLoader';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <CatalogProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="CatalogLoader" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CatalogLoader" component={CatalogLoader} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            {/* Agrega más pantallas según tus necesidades */}
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </CatalogProvider>
  );
};

export default App;
