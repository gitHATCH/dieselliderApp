import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';


const TurboParts = ({ navigation }) => {
  const [group, setGroup] = useState('A');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [part, setPart] = useState('');
  // TODO: Traer grupos
  // TODO: Ningun grupo por defecto, mostrar placeholder
  const [groups, setGroups] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']);


  const [focusedInput, setFocusedInput] = useState(null);
  const [errorText, setErrorText] = useState('');
 
  const searchResult = () => {
    //If "group" is "" or at least "code", "description" or "part" is not "", then search
    if ((group !== "") && (code !== "" || description !== "" || part !== "")) {
      setErrorText('');
    } else {
      setErrorText("Debe completar grupo, subgrupo y algún otro campo de búsqueda");
      return
    }
    //search
    setGroup("A");
    setCode("")
    setDescription("")
    setPart("")
  }

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
      <Header nav={navigation} title={"Catálogo"}/>
      <SubHeader title={"Partes de Turbos"}/>

      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker' ? 'blue' : 'gray', width: '80%', marginBottom: 10, marginTop: 10 }}>
            <Picker
              selectedValue={group}
              onValueChange={(itemValue) => setGroup(itemValue)}
              style={{ height: 50, width: '100%', padding: 10 }}
              onFocus={() => setFocusedInput('picker')}
              onBlur={() => setFocusedInput(null)}
              >
                {groups.map((item, index) => {
                  return (<Picker.Item label={item} value={item} key={index} />)
                })}
            </Picker>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'code' ? 'blue' : 'gray', width: '80%' }}>
          <TextInput
            placeholder="Código DL"
            value={code}
            onChangeText={(text) => setCode(text)}
            onFocus={() => setFocusedInput('code')}
            onBlur={() => setFocusedInput(null)}
            style={{ padding: 10,width: '80%' }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'descr' ? 'blue' : 'gray', width: '80%' }}>
          <TextInput
            placeholder="Descripción DL"
            value={description}
            onChangeText={(text) => setDescription(text)}
            onFocus={() => setFocusedInput('descr')}
            onBlur={() => setFocusedInput(null)}
            style={{ padding: 10,width: '80%' }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'part' ? 'blue' : 'gray', width: '80%' }}>
          <TextInput
            placeholder="Número de parte original"
            value={part}
            onChangeText={(text) => setPart(text)}
            onFocus={() => setFocusedInput('part')}
            onBlur={() => setFocusedInput(null)}
            style={{ padding: 10,width: '80%' }}
          />
        </View>
        {/* Mostrar mensaje de error y línea si existe */}
        {errorText ? (
          <>
            <Text style={{ color: 'red', marginTop: 10 }}>{errorText}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, width: '80%' }} />
          </>
        ) : null}
        <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }} onPress={searchResult}>
          <Text style={{ color: 'white' }}>Buscar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TurboParts