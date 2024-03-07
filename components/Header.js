// Header.js
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
//TODO: Si esta logeado mostrar carrito, hacer dinamico el texto del header
const Header = () => {
  return (
    <View style={{ backgroundColor: '#001f36', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Izquierda: Icono de menú */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="menu" size={22} color="white" />
        <Text style={{ fontSize: 20, fontWeight: '600', color: 'white', marginLeft: 10, alignSelf: 'center' }}>Catálogo</Text>
      </View>

      {/* Derecha: Otro icono (puedes cambiar el nombre y tamaño según tus necesidades) */}
      <Icon name="search" size={22} color="white" />
    </View>
  );
};

export default Header;
