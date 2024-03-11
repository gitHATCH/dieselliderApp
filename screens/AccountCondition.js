import React, { useState } from 'react';
import { View, Text,TextInput, TouchableOpacity, StatusBar  } from 'react-native';
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
    const [vouchers, setVouchers] = useState(['Todos','Factura', 'Notas de crédito', 'Notas de débito', 'Recibos']);
    const [typeVouchers, setTypeVouchers] = useState(['Todos','Débito', 'Crédito']);
    // TODO: Traer tipos
    // TODO: Ningun tipo por defecto, mostrar placeholder
    const [focusedInput, setFocusedInput] = useState(null);
    const [actualDate, setActualDate] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
      else setToDate(formatDate(date));
    
      hideDatePicker();
      setActualDate("");
    };

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        <Header nav={navigation} title={"Cuenta Corriente"}/>
        <SubHeader title={"Cuenta Corriente"} notTitle={true} setActual={handleActualView} actual={actualView}/>
        <View style={{ flex: 1, padding: 10 }}>
            {actualView === "Estado" && (
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:300, fontSize:12}}>Estado de Cuenta</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:300, fontSize:12}}>Condición de pago</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: '50%' }}>
                      <Text>HAB. CONDICIONADO ADM</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text>0 DIAS DE FACTURA</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:10 }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:300, fontSize:12}}>Moneda</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', gap:10}}>
                    <CountryFlag isoCode="ar" size={20} />
                    <Text>ARS (Pesos Argentinos)</Text>
                  </View>
                  <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 20, width: '100%' }} />

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:20, alignItems:"center" }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:300, fontSize:12}}>Total vencido:</Text>
                    </View>
                    <View style={{ width: '50%', flexDirection: 'row', gap:5, alignItems:"baseline" }}>
                      <Text style={{fontWeight:300, fontSize:12}}>ARS</Text>
                      <Text style={{}}>0,00</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:10, alignItems:"center" }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:300, fontSize:12}}>Total a vencer:</Text>
                    </View>
                    <View style={{ width: '50%', flexDirection: 'row', gap:5, alignItems:"baseline" }}>
                      <Text style={{fontWeight:300, fontSize:12}}>ARS</Text>
                      <Text style={{}}>0,00</Text>
                    </View>
                  </View>
                  <View style={{ borderBottomWidth: 2, borderBottomColor: 'gray', marginTop: 10, width: '100%' }} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:10, alignItems:"center" }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:700}}>Total deuda:</Text>
                    </View>
                    <View style={{ width: '50%', flexDirection: 'row', gap:5, alignItems:"baseline" }}>
                      <Text style={{fontWeight:700, fontSize:12}}>ARS</Text>
                      <Text style={{fontWeight:700}}>0,00</Text>
                    </View>
                  </View>
                  <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 20, width: '100%' }} />

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:300, fontSize:12}}>Límite de crédito</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{fontWeight:300, fontSize:12}}>Disponible</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ width: '50%', flexDirection: 'row', gap:5, alignItems:"baseline" }}>
                        <Text style={{fontSize:12}}>ARS</Text>
                        <Text style={{}}>5.341.00,00</Text>
                    </View>
                    <View style={{ width: '50%', flexDirection: 'row', gap:5, alignItems:"baseline" }}>
                        <Text style={{fontSize:12}}>ARS</Text>
                        <Text style={{}}>5.341.00,00</Text>
                    </View>
                  </View>

                </View>
            )}
            {actualView === "Comprobantes" && (
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                  <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker' ? 'blue' : 'gray', width: '80%', marginTop: 0 }}>
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

                      <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker3' ? 'blue' : 'gray', width: '80%', marginBottom: 10}}>
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
                      <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker4' ? 'blue' : 'gray', width: '80%', marginBottom: 10}}>
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
            )}
        </View>
    </View>
  )
}

export default AccountCondition