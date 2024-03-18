import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from 'react-native-modal';
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
  //TODO: Debe permitir acceder al detalle de cada producto de cada orden
  const [types, setTypes] = useState(['Pedidos en todos los estados', 'Pedidos para autorizar', 'Pedidos autorizados', 'Pedidos en proceso', 'Pedidos facturados', 'Pedidos cancelados']);
  const [periods, setPeriods] = useState(['Todo el periodo', 'Movimientos del día', 'Últimos 7 días', 'Últimos 15 días', 'Últimos 30 días', 'Últimos 60 días', 'Últimos 90 días']);
  const [focusedInput, setFocusedInput] = useState(null);
  const [actualDate, setActualDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [searching, setSearching] = useState(false);
  const [order, setOrder] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const [orders, setOrders] = useState([
    { num: "123456", date: "2021-08-01", status: "cancelado", paymentDate: "2021-08-01", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23,
      products: [{name: "Rueda turbina S300 Fundicion K418 (167479) (OFA)", brand: "OFF FACTORY", code:"16-81 K[1]", price: 2539.2, quantity:1}]
    },
    { num: "123457", date: "2021-08-01", status: "cancelado", paymentDate: "2021-08-01", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23,
      products: [{name: "Rueda turbina S300 Fundicion K418 (167479) (OFA)", brand: "OFF FACTORY", code:"16-81 K[1]", price: 2539.2, quantity:1}]
    },
    { num: "123458", date: "2021-08-01", status: "cancelado", paymentDate: "2021-08-01", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23,
      products: [{name: "Rueda turbina S300 Fundicion K418 (167479) (OFA)", brand: "OFF FACTORY", code:"16-81 K[1]", price: 2539.2, quantity:1}]
    },
    { num: "123459", date: "2021-08-01", status: "cancelado", paymentDate: "2021-08-01", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23,
      products: [{name: "Rueda turbina S300 Fundicion K418 (167479) (OFA)", brand: "OFF FACTORY", code:"16-81 K[1]", price: 2539.2, quantity:1}]
    },
    { num: "123460", date: "2021-08-01", status: "cancelado", paymentDate: "2021-08-01", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23,
      products: [{name: "Rueda turbina S300 Fundicion K418 (167479) (OFA)", brand: "OFF FACTORY", code:"16-81 K[1]", price: 2539.2, quantity:1}]
    },
  ])

  const formatPrice = (price) => {
    const priceString = price.toString();
    const [integerPart, decimalPart] = priceString.split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${formattedIntegerPart},${decimalPart}`;
  };

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
    setSearching(true);
  }

  const handleModalOpen = (item) => {
    setOrder(item);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setOrder("")
    setModalVisible(false);
  };

  const handleDetailOpen = () => {
    setModalVisible(false);
    setDetailVisible(true);
  }

  const handleDetailClose = () => {
    setDetailVisible(false);
    setOrder("");
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleModalOpen(item)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{flexDirection: "column", width:"90%"}}>
          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <Text style={{}}>
              {`Pedido N° ${item.num}`}
            </Text>
            <Text>
              {`Fecha ${item.date}`}
            </Text>
          </View>
          <Text style={{fontWeight:400, fontSize:12}}>{`${item.products.length} ${item.products.length > 1 ? "Artículos" : "Artículo"}. Pedido ${item.status}`}</Text>
          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <Text style={{fontWeight:400, fontSize:12}}>{`Importe total`}</Text>
            <Text style={{fontWeight:400, fontSize:12}}>{`ARS ${formatPrice(item.products.reduce((accumulator, currentProduct) => {
                return accumulator + currentProduct.price;
            }, 0))}`}</Text>
 
          </View>

          
        </View>
        <Icon name="right" size={25} color="black" />
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => {
    return <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginVertical: 10 }} />;
  };

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        <Header nav={navigation} title={"Estado de Pedidos"}/>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding:20}}>
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
            <View>
              
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

              
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'fromAmount' ? 'blue' : 'gray', width: '100%' }}>
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
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'toAmount' ? 'blue' : 'gray', width: '100%', marginBottom:10 }}>
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
          

      
        <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, marginVertical: 10, width: '100%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }} onPress={searchResult}>
          <Text style={{ color: 'white' }}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAdvanced(!advanced)} style={{ backgroundColor: '#f9f9f9', padding: 10, marginVertical: 10, width: '100%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }}>
          <Text>Búsqueda {advanced ? "básica" : "avanzada"}</Text>
        </TouchableOpacity>
        {searching && (
            <View style={{marginTop:20}}>
              <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeparator}
              />
              <Modal onBackdropPress={handleModalClose} isVisible={modalVisible} animationIn="slideInUp" animationOut="slideOutDown">
                <View style={{ flex: 1, justifyContent: 'flex-end'}}>
                  <View style={{ backgroundColor: 'white', padding: 20,borderRadius:10 }}>
                    <View style={{ }}>
                      <TouchableOpacity onPress={handleDetailOpen} style={{width:"100%",alignItems:"center", flexDirection:"row", gap:20}} >
                        <Icon name="filetext1" size={22} color="black" />
                        <Text style={{fontSize:18, fontWeight:400}}>Detalles</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{width:"100%",alignItems:"center", flexDirection:"row", gap:20, marginTop:10}} onPress={handleModalClose}>
                        <Icon name="close" size={22} color="black" />
                        <Text style={{fontSize:18, fontWeight:400}}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            
        )}
      </View>
    </View>
  )
}

export default OrderStatus