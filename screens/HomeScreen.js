// HomeScreen.js
import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
      <Header/>
      <SubHeader/>
      <View style={{ flex: 1, padding: 10 }}>
        <Text>Contenido de la pantalla Home</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
