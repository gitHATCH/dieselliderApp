import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { BackHandler } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import { useUserContext } from '../hooks/UserContext';

const Login = ({ navigation }) => {
  const { login, user } = useUserContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedType, setSelectedType] = useState('C.U.I.T.');
  const [focusedInput, setFocusedInput] = useState(null);
  const [errorText, setErrorText] = useState('');
  const [isExitModalVisible, setExitModalVisible] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setExitModalVisible(true);
      return true; // Evita el comportamiento predeterminado de retroceso
    });

    return () => backHandler.remove();
  }, []);

  const handleLogin = () => {
    if (!username || !password) {
      setErrorText('Por favor, completa todos los campos');
      return;
    } else {
      setErrorText('');
    }
    login(username, password, selectedType);
  };

  const handleExitCancel = () => {
    setExitModalVisible(false);
  };

  const handleContinueWithoutLogin = () => {
    navigation.navigate('HomeScreen'); 
  };

  const handleExitConfirm = () => {
    setExitModalVisible(false);
    BackHandler.exitApp(); // Cierra la aplicación
  };

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: StatusBar.currentHeight || 0}}>
      <Image source={require('../assets/images/diesel_logo_transparent.png')} style={{ width: 150, height: 150, borderRadius: 25, resizeMode: 'stretch' }} />

      {/* Agregar el selector de tipo */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker' ? 'blue' : 'gray', width: '80%', marginBottom: 10, marginTop: 10 }}>
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue) => setSelectedType(itemValue)}
          style={{ height: 50, width: '100%', padding: 10 }}
          onFocus={() => setFocusedInput('picker')}
          onBlur={() => setFocusedInput(null)}
        >
          <Picker.Item label="C.U.I.T." value="C.U.I.T." />
          <Picker.Item label="C.N.P.J." value="C.N.P.J." />
          <Picker.Item label="R.F.C." value="R.F.C." />
          <Picker.Item label="R.U.T." value="R.U.T." />
        </Picker>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'username' ? 'blue' : 'gray', width: '80%' }}>
        <TextInput
          placeholder="Usuario"
          value={username}
          onChangeText={(text) => setUsername(text)}
          onFocus={() => setFocusedInput('username')}
          onBlur={() => setFocusedInput(null)}
          style={{ padding: 10, width: '80%' }}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'password' ? 'blue' : 'gray', width: '80%', marginTop: 10 }}>
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(null)}
          style={{ padding: 10, width: '80%' }}
        />
      </View>

      {/* Botón Olvidaste tu Contraseña */}
      <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')} style={{ alignSelf: 'flex-start', marginLeft: '10%', marginBottom: 10, marginTop: 5 }}>
        <Text>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Botón Iniciar Sesión */}
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: 'orange', padding: 10, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }}>
        <Text style={{ color: 'white' }}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Botón Continuar sin Iniciar Sesión */}
      <TouchableOpacity onPress={handleContinueWithoutLogin} style={{ backgroundColor: '#f9f9f9', padding: 10, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }}>
        <Text>Continuar sin Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* Mostrar mensaje de error y línea si existe */}
      {errorText ? (
        <>
          <Text style={{ color: 'red', marginTop: 10 }}>{errorText}</Text>
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, width: '80%' }} />
        </>
      ) : null}

      {/* Modal de confirmación de salida */}
      <Modal isVisible={isExitModalVisible}>
        <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 20, width: '80%' }}>
          <Text style={{ marginBottom: 10 }}>¿Seguro que desea salir de la aplicación?</Text>
          <TouchableOpacity onPress={handleExitCancel} style={{ backgroundColor: 'orange', padding: 10, marginVertical: 10, width: '100%', alignItems: 'center', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }}>
            <Text style={{ color: 'white' }}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleExitConfirm} style={{ backgroundColor: '#f9f9f9', padding: 10, marginVertical: 10, width: '100%', alignItems: 'center', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }}>
            <Text>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
};

export default Login;
