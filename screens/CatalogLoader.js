// screens/CatalogLoader.js
import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { useCatalogContext } from '../hooks/CatalogContext';

//TODO: Agregar state catalog en el hook
//TODO: Si existe catalog redireccionar automaticamente a Login

const CatalogLoader = ({ navigation }) => {
  const { loadCatalog } = useCatalogContext();

  useEffect(() => {
    const loadInitialData = async () => {
      await loadCatalog();
      setTimeout(() => {
        console.log('Catálogo cargado');
        navigation.navigate('Login');
      }, 2000);
    };

    loadInitialData();
  }, [loadCatalog, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../assets/images/diesel_logo_transparent.png')} />
      <ActivityIndicator size="large" />
    </View>
  );
};

export default CatalogLoader;
