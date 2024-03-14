import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';

import Header from '../components/Header';

const MyOrder = ({ navigation }) => {
  //TODO: En los picker de fechas, si se borra, que se reemplace el state por "" directamente. Ademas, comprobar fechas en pasado y esas cosas.
  //TODO: En el picker mostrar el texto completo, no solo el address
  const [focusedInput, setFocusedInput] = useState(null);
  const [paymentDate, setPaymentDate] = useState('');
  const [actualDate, setActualDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [preferMorning, setPreferMorning] = useState(false);
 
  const [addresses, setAddresses] = useState([
    { addressee: "CONSUMIDOR FINAL", address: "AV. JUAN B. JUSTO 2224 (CASO1)", town: "PUEYRREDON", city: "CORDOBA (CASO1)", province: "CORDOBA", postalCode: 5001, country: "ARGENTINA", transport: "SENDBOX(1)", type:"ENVIO", paymentType: "DESTINO"},
    { addressee: "CONSUMIDOR FINAL", address: "AV. JUAN B. JUSTO 2224 (CASO2)", town: "PUEYRREDON", city: "CORDOBA (CASO2)", province: "CORDOBA", postalCode: 5001, country: "ARGENTINA", transport: "SENDBOX(2)", type:"ENVIO", paymentType: "ORIGEN"},
    { addressee: "CONSUMIDOR FINAL", address: "AV. JUAN B. JUSTO 2224 (CASO3)", town: "PUEYRREDON", city: "CORDOBA (CASO3)", province: "CORDOBA", postalCode: 5001, country: "ARGENTINA", transport: "SENDBOX(3)", type:"ENVIO", paymentType: "DESTINO"},
    { addressee: "CONSUMIDOR FINAL", address: "AV. JUAN B. JUSTO 2224 (CASO4)", town: "PUEYRREDON", city: "CORDOBA (CASO4)", province: "CORDOBA", postalCode: 5001, country: "ARGENTINA", transport: "SENDBOX(4)", type:"ENVIO", paymentType: "ORIGEN"},
    { addressee: "CONSUMIDOR FINAL", address: "AV. JUAN B. JUSTO 2224 (CASO5)", town: "PUEYRREDON", city: "CORDOBA (CASO5)", province: "CORDOBA", postalCode: 5001, country: "ARGENTINA", transport: "SENDBOX(5)", type:"ENVIO", paymentType: "DESTINO"},
    { addressee: "CONSUMIDOR FINAL", address: "AV. JUAN B. JUSTO 2224 (CASO6)", town: "PUEYRREDON", city: "CORDOBA (CASO6)", province: "CORDOBA", postalCode: 5001, country: "ARGENTINA", transport: "SENDBOX(6)", type:"ENVIO", paymentType: "ORIGEN"},
  ])
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAddress(addresses[0])
  }, [])
  

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
    setPaymentDate(formatDate(date));
    hideDatePicker();
    setActualDate("");
  };

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        <Header nav={navigation} title={"Pedido Actual"}/>
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{textAlign:"center"}}>El pedido se encuentra vacío</Text>
            
            <View style={{ backgroundColor: '#e0e0e0', padding: 10, marginTop: 20, width: '100%', borderRadius: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Subtotal neto:</Text>
                    <Text>ARS 0,00</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text>IVA:</Text>
                    <Text>ARS 0,00</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text>Otros impuestos:</Text>
                    <Text>ARS 0,00</Text>
                </View>
                <View style={{ borderBottomWidth: 2, borderBottomColor: 'gray', marginTop: 10, width: '100%' }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <Text style={{fontWeight:800}}>Total del pedido (0):</Text>
                    <Text style={{fontWeight:800}}>ARS 0,00</Text>
                </View>
            </View>

            

            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'paymentDate' ? 'blue' : 'gray', width: '100%' }}>
              <TextInput
                placeholder="Fecha de pago"
                onPressIn={() => showDatePicker("paymentDate")}
                value={paymentDate}
                onChange={(text) => setPaymentDate(text)}
                onFocus={() => setFocusedInput('paymentDate')}
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
            {paymentDate !== "" && (
              <Text style={{marginTop:10, color:"red"}}>El pedido se facturará el próximo día hábil</Text>
            )}
            <View style={{marginTop: 20 }}>
              <Text style={{ fontWeight:400 }}>Horario de envío:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap:20, marginTop:5 }}>
                <Checkbox value={preferMorning} onValueChange={setPreferMorning}/>
                <Text style={{fontWeight:500}}>Preferiblemente por la mañana</Text>
              </View>
            </View>
            
            <View style={{marginTop: 20 }}>
              <Text style={{  fontWeight:400}}>Enviar pedido a:</Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker' ? 'blue' : 'gray', width: '100%', marginBottom: 10}}>
                <Picker
                  selectedValue={address?.address}
                  onValueChange={(itemValue) => setAddress(itemValue)}
                  style={{ height: 50, width: '100%', padding: 10 }}
                  onFocus={() => setFocusedInput('picker')}
                  onBlur={() => setFocusedInput(null)}
                  >
                    {addresses.map((item, index) => {
                      return (<Picker.Item label={`${item.address}`} value={item} key={index} />)
                    })}
                </Picker>
              </View>
            </View>

            
            <View style={{marginTop: 20 }}>
              <Text style={{  fontWeight:400}}>Transporte:</Text>
              <Text style={{ fontWeight:500 }}>{address.transport}</Text>
            </View>
            <View style={{marginTop: 20 }}>
              <Text style={{  fontWeight:400}}>Pago de transporte:</Text>
              <Text style={{ fontWeight:500 }}>{address.paymentType}</Text>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 20, width: '100%' }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20, marginTop:20 }}>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:400, }}>Total vencido</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:400, }}>Total a vencer</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20 }}>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:500}}>ARS</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text  style={{fontWeight:500}}>ARS</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20, marginTop:20 }}>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:400, }}>Total deuda</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:400, }}>Disponible</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20 }}>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:500}}>ARS</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text  style={{fontWeight:500}}>ARS</Text>
              </View>
            </View>

        </View>
    </View>
  )
}

export default MyOrder;
