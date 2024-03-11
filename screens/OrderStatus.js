import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Header from '../components/Header';

const OrderStatus = ({ navigation }) => {
  const [advanced, setAdvanced] = useState(false);
  const [type, setType] = useState('Pedidos en todos los estados');
  const [period, setPeriod] = useState('Todo el periodo');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  // TODO: Traer tipos
  // TODO: Ningun tipo por defecto, mostrar placeholder
  const [types, setTypes] = useState(['Pedidos en todos los estados', 'Pedidos para autorizar', 'Pedidos autorizados', 'Pedidos en proceso', 'Pedidos facturados', 'Pedidos cancelados']);
  const [periods, setPeriods] = useState(['Todo el periodo', 'Movimientos del día', 'Últimos 7 días', 'Últimos 15 días', 'Últimos 30 días', 'Últimos 60 días', 'Últimos 90 días']);
  const [focusedInput, setFocusedInput] = useState(null);
  const [actualDate, setActualDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  
  const showDatePicker = (picker) => {
    setDatePickerVisibility(true);
    setActualDate(picker);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setActualDate("");
  };

  const handleConfirm = (date) => {
    if (actualDate === "fromDate") setFromDate(formatDate(date)) 
    else setToDate(formatDate(date));
  
    hideDatePicker();
    setActualDate("");
  };


  const searchResult = () => {
    
  }

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        <Header nav={navigation} title={"Estado de Pedidos"}/>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker' ? 'blue' : 'gray', width: '80%', marginTop: 10 }}>
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
          {advanced ? (
            <View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'fromDate' ? 'blue' : 'gray', width: '80%' }}>
                  <TextInput
                    placeholder="Fecha desde"
                    onPressIn={() => showDatePicker("fromDate")}
                    value={fromDate}
                    onChange={(text) => setFromDate(text)}
                    onFocus={() => setFocusedInput('fromDate')}
                    onBlur={() => setFocusedInput(null)}
                    style={{ padding: 10,width: '100%' }}
                  />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'toDate' ? 'blue' : 'gray', width: '80%' }}>
                <TextInput
                  placeholder="Fecha hasta"
                  onPressIn={() => showDatePicker("toDate")}
                  value={toDate}
                  onChange={(text) => setToDate(text)}
                  onFocus={() => setFocusedInput('toDate')}
                  onBlur={() => setFocusedInput(null)}
                  style={{ padding: 10,width: '100%' }}
                />
              </View>


              <View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  locale="en_AR"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>

              
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'fromAmount' ? 'blue' : 'gray', width: '80%' }}>
                <TextInput
                  placeholder="Importe total desde"
                  value={fromAmount}
                  keyboardType="numeric"
                  onChangeText={(text) => setFromAmount(text)}
                  onFocus={() => setFocusedInput('fromAmount')}
                  onBlur={() => setFocusedInput(null)}
                  style={{ padding: 10,width: '100%' }}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'toAmount' ? 'blue' : 'gray', width: '80%', marginBottom:10 }}>
                <TextInput
                  placeholder="Importe total hasta"
                  value={toAmount}
                  keyboardType="numeric"
                  onChangeText={(text) => setToAmount(text)}
                  onFocus={() => setFocusedInput('toAmount')}
                  onBlur={() => setFocusedInput(null)}
                  style={{ padding: 10,width: '100%' }}
                />
              </View>
            </View>
          ) : (
            <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker2' ? 'blue' : 'gray', width: '80%', marginBottom: 10}}>
              <Picker
                selectedValue={period}
                onValueChange={(itemValue) => setPeriod(itemValue)}
                style={{ height: 50, width: '100%', padding: 10 }}
                onFocus={() => setFocusedInput('picker2')}
                onBlur={() => setFocusedInput(null)}
                >
                  {periods.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={index} />)
                  })}
              </Picker>
          </View>
          )}
          

      
        <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }} onPress={searchResult}>
          <Text style={{ color: 'white' }}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAdvanced(!advanced)} style={{ backgroundColor: '#f9f9f9', padding: 10, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }}>
          <Text>Búsqueda {advanced ? "básica" : "avanzada"}</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default OrderStatus