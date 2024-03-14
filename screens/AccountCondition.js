import React, { useState } from 'react';
import { View, Text,TextInput, TouchableOpacity, StatusBar, Platform, useWindowDimensions, ScrollView  } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import CountryFlag from "react-native-country-flag";
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';


const AccountCondition = ({ navigation }) => {
    const [actualView, setActualView] = useState("Estado")
    const [advanced, setAdvanced] = useState(false);
    const [type, setType] = useState('Comprobantes con saldo');
    const [period, setPeriod] = useState('Todo el periodo');
    const [types, setTypes] = useState(['Comprobantes con saldo', 'Comprobantes con y sin saldo']);
    const [periods, setPeriods] = useState(['Todo el periodo', 'Movimientos del día', 'Últimos 7 días', 'Últimos 15 días', 'Últimos 30 días', 'Últimos 60 días', 'Últimos 90 días']);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [voucher, setVoucher] = useState('Todos');
    const [typeVoucher, setTypeVoucher] = useState('Todos');
    const [fromHab, setFromHab] = useState('');
    const [toHab, setToHab] = useState('');
    const [fromSal, setFromSal] = useState('');
    const [toSal, setToSal] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [vouchers, setVouchers] = useState(['Todos','Factura', 'Notas de crédito', 'Notas de débito', 'Recibos']);
    const [typeVouchers, setTypeVouchers] = useState(['Todos','Débito', 'Crédito']);
    // TODO: Traer tipos
    // TODO: Ningun tipo por defecto, mostrar placeholder
    const [focusedInput, setFocusedInput] = useState(null);
    const [actualDate, setActualDate] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const windowHeight = useWindowDimensions().height;

    const searchResult = () => {
    
    }

    const handleActualView = (title) => {
      setActualView(title);
    }

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
      else if (actualDate === "toDate") setToDate(formatDate(date));
      else setPaymentDate(formatDate(date));
    
      hideDatePicker();
      setActualDate("");
    };

  return (

    <ScrollView  style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 , minHeight: Math.round(windowHeight) }}>
        <Header nav={navigation} title={"Cuenta Corriente"}/>
        <SubHeader title={"Cuenta Corriente"} notTitle={true} setActual={handleActualView} actual={actualView}/>
        
        <View style={{ flex: 1, padding: 20 }}>
            {actualView === "Estado" && (
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20 }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:400, }}>Estado de Cuenta</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:400, }}>Condición de pago</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20 }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:500}}>HAB. CONDICIONADO ADM</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text  style={{fontWeight:500}}>0 DIAS DE FACTURA</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:10 }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:400, }}>Moneda</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', gap:10}}>
                    <CountryFlag isoCode="ar" size={20} />
                    <Text  style={{fontWeight:500}}>ARS (Pesos Argentinos)</Text>
                  </View>
                  <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 20, width: '100%' }} />


                  <View style={{ backgroundColor: '#e0e0e0', padding: 10, marginTop: 20, width: '100%', borderRadius: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Total vencido:</Text>
                        <Text>ARS 0,00</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <Text>Total a vencer:</Text>
                        <Text>ARS 0,00</Text>
                    </View>
                    <View style={{ borderBottomWidth: 2, borderBottomColor: 'gray', marginTop: 10, width: '100%' }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <Text style={{fontWeight:800}}>Total deuda:</Text>
                        <Text style={{fontWeight:800}}>ARS 0,00</Text>
                    </View>
                  </View>

                  <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 20, width: '100%' }} />

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between',gap:20, marginTop: 20 }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:400, }}>Límite de crédito</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:400, }}>Disponible</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between',gap:20}}>
                    <View style={{ width: '50%', flexDirection: 'row', gap:5, alignItems:"baseline" }}>
                        <Text  style={{fontWeight:500}}>ARS</Text>
                        <Text  style={{fontWeight:500}}>5.341.00,00</Text>
                    </View>
                    <View style={{ width: '50%', flexDirection: 'row', gap:5, alignItems:"baseline" }}>
                        <Text  style={{fontWeight:500}}>ARS</Text>
                        <Text  style={{fontWeight:500}}>5.341.00,00</Text>
                    </View>
                  </View>

                </View>
            )}
            {actualView === "Comprobantes" && (
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                  <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker' ? 'blue' : 'gray', width: '100%', marginTop: 0 }}>
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
                    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center',width: '100%'}}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'fromHab' ? 'blue' : 'gray', width: '100%' }}>
                        <TextInput
                          placeholder="Debe/haber desde"
                          value={fromHab}
                          keyboardType="numeric"
                          onChange={(text) => setFromHab(text)}
                          onFocus={() => setFocusedInput('fromHab')}
                          onBlur={() => setFocusedInput(null)}
                          style={{ padding: 10,width: '100%' }}
                        />
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'toHab' ? 'blue' : 'gray', width: '100%' }}>
                        <TextInput
                          placeholder="Debe/haber hasta"
                          keyboardType="numeric"
                          value={toHab}
                          onChange={(text) => setToHab(text)}
                          onFocus={() => setFocusedInput('toHab')}
                          onBlur={() => setFocusedInput(null)}
                          style={{ padding: 10,width: '100%' }}
                        />
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'fromSal' ? 'blue' : 'gray', width: '100%' }}>
                        <TextInput
                          placeholder="Saldo desde"
                          keyboardType="numeric"
                          value={fromSal}
                          onChange={(text) => setFromSal(text)}
                          onFocus={() => setFocusedInput('fromSal')}
                          onBlur={() => setFocusedInput(null)}
                          style={{ padding: 10,width: '100%' }}
                        />
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'toSal' ? 'blue' : 'gray', width: '100%' }}>
                        <TextInput
                          placeholder="Saldo hasta"
                          keyboardType="numeric"
                          value={toSal}
                          onChange={(text) => setToSal(text)}
                          onFocus={() => setFocusedInput('toSal')}
                          onBlur={() => setFocusedInput(null)}
                          style={{ padding: 10,width: '100%' }}
                        />
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'fromDate' ? 'blue' : 'gray', width: '100%' }}>
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
                      <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'toDate' ? 'blue' : 'gray', width: '100%' }}>
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

                      <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker3' ? 'blue' : 'gray', width: '100%', marginBottom: 10}}>
                        <Picker
                          selectedValue={voucher}
                          onValueChange={(itemValue) => setVoucher(itemValue)}
                          style={{ height: 50, width: '100%', padding: 10 }}
                          onFocus={() => setFocusedInput('picker3')}
                          onBlur={() => setFocusedInput(null)}
                          >
                            {vouchers.map((item, index) => {
                              return (<Picker.Item label={item} value={item} key={index} />)
                            })}
                        </Picker>
                      </View>
                      <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker4' ? 'blue' : 'gray', width: '100%', marginBottom: 10}}>
                        <Picker
                          selectedValue={typeVoucher}
                          onValueChange={(itemValue) => setTypeVoucher(itemValue)}
                          style={{ height: 50, width: '100%', padding: 10 }}
                          onFocus={() => setFocusedInput('picker4')}
                          onBlur={() => setFocusedInput(null)}
                          >
                            {typeVouchers.map((item, index) => {
                              return (<Picker.Item label={item} value={item} key={index} />)
                            })}
                        </Picker>
                      </View>
                      
                      
                    </View>
                  ) : (
                    <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker2' ? 'blue' : 'gray', width: '100%', marginBottom: 10}}>
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

                  <TouchableOpacity style={{ marginTop:40,backgroundColor: 'blue', padding: 10, marginVertical: 10, width: '100%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }} onPress={searchResult}>
                    <Text style={{ color: 'white' }}>Buscar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setAdvanced(!advanced)} style={{ backgroundColor: '#f9f9f9', padding: 10, marginVertical: 10, width: '100%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }}>
                    <Text>Búsqueda {advanced ? "básica" : "avanzada"}</Text>
                  </TouchableOpacity>
      

              </View>
            )}
            {actualView === "Informar un pago" && (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  
                <View style={{ backgroundColor: '#e0e0e0', padding: 10, marginTop: 0, width: '100%', borderRadius: 5 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>Total vencido:</Text>
                      <Text>ARS 0,00</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                      <Text>Total a vencer:</Text>
                      <Text>ARS 0,00</Text>
                  </View>
                  <View style={{ borderBottomWidth: 2, borderBottomColor: 'gray', marginTop: 10, width: '100%' }} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                      <Text style={{fontWeight:800}}>Total deuda:</Text>
                      <Text style={{fontWeight:800}}>ARS 0,00</Text>
                  </View>
                </View>

                  <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 20, width: '100%' }} />
                  <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center',width: '100%'}}>

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
                      <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'paymentAmount' ? 'blue' : 'gray', width: '100%' }}>
                        <TextInput
                          placeholder="Importe de pago (ARS)"
                          keyboardType="numeric"
                          value={paymentAmount}
                          onChange={(text) => setPaymentAmount(text)}
                          onFocus={() => setFocusedInput('paymentAmount')}
                          onBlur={() => setFocusedInput(null)}
                          style={{ padding: 10,width: '100%' }}
                        />
                      </View>
                      <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 20, width: '100%' }} />
                      {/*Agregar input para tomar foto*/}
                      {/*Agregar text area*/}

                  </View>

                </View>
            )}
        </View>
    </ScrollView>
  )
}

export default AccountCondition