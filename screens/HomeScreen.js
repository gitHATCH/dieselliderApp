// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';

//TODO: Mostrar los productos buscados, sino nada un cartel o la busqueda anterior

const HomeScreen = ({ navigation }) => {
  const [actualView, setActualView] = useState("Códigos DL")

  const handleActualView = (title) => {
    setActualView(title);
  }

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
      <Header nav={navigation} title={"Catálogo"} search={true}/>
      <SubHeader title={"Turbos y Conjuntos"} setActual={handleActualView} actual={actualView}/>
      <View style={{ flex: 1, padding: 10 }}>
        <Text>Contenido de la pantalla Home</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
