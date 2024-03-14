import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';

const OtherProducts = ({ navigation }) => {
  const [type, setType] = useState('A');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
 

  // TODO: Traer tipos
  // TODO: Ningun tipo por defecto, mostrar placeholder
  const [types, setTypes] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']);

  const [focusedInput, setFocusedInput] = useState(null);
  const [errorText, setErrorText] = useState('');

  const searchResult = () => {
    //If "group" is "" or at least "code", "description" is not "", then search
    if ((type !== "") && (code !== "" || description !== "")) {
      setErrorText('');
    } else {
      setErrorText("Debe completar tipo y algún otro campo de búsqueda");
      return
    }
    //search
    setType("A");
    setCode("")
    setDescription("")
  }

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        <Header nav={navigation} title={"Catálogo"}/>
        <SubHeader title={"Otros Productos"}/>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding:20}}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker' ? 'blue' : 'gray', width: '100%', marginBottom: 10, marginTop: 0 }}>
              <Picker
                selectedValue={type}
                onValueChange={(itemValue) => setType(itemValue)}
                style={{ height: 50, width: '100%', padding: 10 }}
                onFocus={() => setFocusedInput('picker')}
                onBlur={() => setFocusedInput(null)}
                >
                  {types.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={index} />)
                  })}
              </Picker>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'code' ? 'blue' : 'gray', width: '100%' }}>
            <TextInput
              placeholder="Código DL"
              value={code}
              onChangeText={(text) => setCode(text)}
              onFocus={() => setFocusedInput('code')}
              onBlur={() => setFocusedInput(null)}
              style={{ padding: 10,width: '100%' }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'descr' ? 'blue' : 'gray', width: '100%' }}>
            <TextInput
              placeholder="Descripción DL"
              value={description}
              onChangeText={(text) => setDescription(text)}
              onFocus={() => setFocusedInput('descr')}
              onBlur={() => setFocusedInput(null)}
              style={{ padding: 10,width: '100%' }}
            />
          </View>
        {/* Mostrar mensaje de error y línea si existe */}
        {errorText ? (
          <>
            <Text style={{ color: 'red', marginTop: 10 }}>{errorText}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, width: '100%' }} />
          </>
        ) : null}
        <TouchableOpacity style={{marginTop:20, backgroundColor: 'blue', padding: 10, marginVertical: 10, width: '100%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }} onPress={searchResult}>
          <Text style={{ color: 'white' }}>Buscar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OtherProducts