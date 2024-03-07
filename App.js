// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CatalogProvider } from './hooks/CatalogContext';
import CatalogLoader from './screens/CatalogLoader';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <CatalogProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CatalogLoader" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="CatalogLoader" component={CatalogLoader} />
          <Stack.Screen name="Login" component={Login} />
          {/* Agrega más pantallas según tus necesidades */}
        </Stack.Navigator>
      </NavigationContainer>
    </CatalogProvider>
  );
};

export default App;
