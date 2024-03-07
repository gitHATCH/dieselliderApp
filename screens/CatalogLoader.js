// screens/CatalogLoader.js
import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StatusBar } from 'react-native';
import { useCatalogContext } from '../hooks/CatalogContext';

//TODO: Agregar state catalog en el hook
//TODO: Si existe catalog redireccionar automaticamente a Login

const CatalogLoader = ({ navigation }) => {
  const { loadCatalog, catalog } = useCatalogContext();
  const [catalogLoaded, setCatalogLoaded] = useState(false);


  useEffect(() => {

    if(catalogLoaded) {
      return
    }

    if(catalog) {
      navigation.navigate('Login');
      setCatalogLoaded(true);
      return
    }

    const loadInitialData = async () => {
      await loadCatalog();
    };

    loadInitialData();
  }, [loadCatalog, catalog]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , marginTop: StatusBar.currentHeight || 0}}>
      <Image source={require('../assets/images/diesel_logo_transparent.png')} />
      <ActivityIndicator size="large" />
    </View>
  );
};

export default CatalogLoader;
