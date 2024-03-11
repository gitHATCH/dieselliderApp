import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';


const UserData = ({ navigation }) => {
    const [actualView, setActualView] = useState("Datos generales")

    const handleActualView = (title) => {
      setActualView(title);
    }

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        <Header nav={navigation} title={"Mis Datos"}/>
        <SubHeader title={"Mis Datos"} notTitle={true} setActual={handleActualView} actual={actualView}/>
        <View style={{ flex: 1, padding: 10 }}>
            <Text>Contenido de la pantalla Home</Text>
        </View>
    </View>
  )
}

export default UserData