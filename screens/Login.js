// screens/Login.js
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedType, setSelectedType] = useState('C.U.IT.'); // Estado para la selección del tipo
  const [focusedInput, setFocusedInput] = useState(null); // Nuevo estado para rastrear el elemento enfocado

  const handleLogin = () => {
    // Aquí deberías verificar el usuario y contraseña usando tu hook correspondiente.
    // Después, descargar el catálogo con otro método del hook.
    // Luego, navegar a la siguiente vista.
  };

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 50 }}>
      <Image source={require('../assets/images/diesel_logo_transparent.png')} style={{ width: 150, height: 150, borderRadius: 25, resizeMode: 'stretch' }} />

      {/* Agregar el selector de tipo */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker' ? 'blue' : 'gray', width: '80%', marginBottom: 10 }}>
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue) => setSelectedType(itemValue)}
          style={{ height: 50, width: '100%', padding: 10 }}
          onFocus={() => setFocusedInput('picker')}
          onBlur={() => setFocusedInput(null)}
        >
          <Picker.Item label="C.U.IT." value="C.U.IT." />
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
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ backgroundColor: '#f9f9f9', padding: 10, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }}>
        <Text>Continuar sin Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
