// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CatalogProvider } from './hooks/CatalogContext';
import { UserProvider } from './hooks/UserContext';

import CatalogLoader from './screens/CatalogLoader';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import TurboParts from './screens/TurboParts';
import OtherProducts from './screens/OtherProducts';
import OrderStatus from './screens/OrderStatus';
import AccountCondition from './screens/AccountCondition';
import UserData from './screens/UserData';
import MyOrder from './screens/MyOrder';

const Stack = createNativeStackNavigator();
//TODO: Agregar FlatList de productos en cada pedido
//TODO: Agregar Despiece de productos
//TODO: Agregar lo de relaciones
//TODO: Agregar lo de pedidos
//TODO: Preguntar por lo de la camara en CC Informar un pago y que hay en siguiente, preguntar lo de desacrgar comprobante, preguntar lo de despiece
//TODO: Averiguar para descargar un xml y guardarlo localmente y luego acceder a este


const App = () => {
  return (
    <CatalogProvider>
      <UserProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CatalogLoader" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CatalogLoader" component={CatalogLoader} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="TurboParts" component={TurboParts} />
            <Stack.Screen name="OtherProducts" component={OtherProducts} />
            <Stack.Screen name="OrderStatus" component={OrderStatus} />
            <Stack.Screen name="AccountCondition" component={AccountCondition} />
            <Stack.Screen name="UserData" component={UserData} />
            <Stack.Screen name="MyOrder" component={MyOrder} />
         
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </CatalogProvider>
  );
};

export default App;
