import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import Header from '../components/Header';

const MyOrder = ({ navigation }) => {
  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        <Header nav={navigation} title={"Pedido Actual"}/>
        <View style={{ flex: 1, padding: 10 }}>
            <Text>Contenido de la pantalla Home</Text>
        </View>
    </View>
  )
}

export default MyOrder