import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, FlatList, ScrollView,useWindowDimensions, LogBox } from 'react-native';
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
  //TODO: Hacer FlatList de Productos en un pedido y mostrar screen
  const [types, setTypes] = useState(['Pedidos en todos los estados', 'Pedidos para autorizar', 'Pedidos autorizados', 'Pedidos en proceso', 'Pedidos facturados', 'Pedidos cancelados']);
  const [periods, setPeriods] = useState(['Todo el periodo', 'Movimientos del día', 'Últimos 7 días', 'Últimos 15 días', 'Últimos 30 días', 'Últimos 60 días', 'Últimos 90 días']);
  const [focusedInput, setFocusedInput] = useState(null);
  const [actualDate, setActualDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [searching, setSearching] = useState(false);
  const [order, setOrder] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const windowHeight = useWindowDimensions().height;

  const [orders, setOrders] = useState([
    { num: "123456", currency: "ARS",date: "01/08/2021", status: "cancelado", paymentDate: "01/08/2021", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23, otherTaxes: 0.00,
      products: [{name: "Rueda turbina S300 Fundicion K418 (167479) (OFA)", brand: "OFF FACTORY", code:"16-81 K[1]", price: 2539.2, quantity:1}]
    },
    { num: "123457", currency: "ARS", date: "01/08/2021", status: "cancelado", paymentDate: "01/08/2021", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23, otherTaxes: 0.00,
      products: [{name: "Rueda turbina S300 Fundicion K418 (167479) (OFA)", brand: "OFF FACTORY", code:"16-81 K[1]", price: 2539.2, quantity:1}]
    },
    { num: "123458", currency: "USD", date: "01/08/2021", status: "cancelado", paymentDate: "01/08/2021", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23, otherTaxes: 0.00,
      products: [{name: "Rueda turbina S300 Fundicion K418 (167479) (OFA)", brand: "OFF FACTORY", code:"16-81 K[1]", price: 2539.2, quantity:1}]
    },
    { num: "123459", currency: "ARS", date: "01/08/2021", status: "cancelado", paymentDate: "01/08/2021", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23, otherTaxes: 0.00,
      products: [{name: "Rueda turbina S300 Fundicion K418 (167479) (OFA)", brand: "OFF FACTORY", code:"16-81 K[1]", price: 2539.2, quantity:1}]
    },
    { num: "123460", currency: "ARS", date: "01/08/2021", status: "cancelado", paymentDate: "01/08/2021", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23, otherTaxes: 0.00,
      products: [{name: "Rueda turbina S300 Fundicion K418 (167479) (OFA)", brand: "OFF FACTORY", code:"16-81 K[1]", price: 2539.2, quantity:1}]
    },
  ])

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.']);
    setSearching(false)
  }, [navigation])

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
    <ScrollView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 , minHeight: Math.round(windowHeight)}}>
        <Header funcBack={handleDetailClose}  nav={navigation} title={order && detailVisible ? "Pedido" : "Estado de Pedidos"}/>
        {order && detailVisible ? (
          <View style={{padding:10}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20, marginTop:10 }}>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:400, }}>Pedido N°</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:400, }}>Fecha</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20 }}>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:500}}>{order.num}</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text  style={{fontWeight:500}}>{order.date}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20, marginTop:10 }}>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:400, }}>Moneda</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:400, }}>Estado</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20 }}>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:500}}>{order.currency}</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text  style={{fontWeight:500}}>Pedido {order.status}</Text>
              </View>
            </View>
            {/* FlatList Productos */}
            <View style={{ backgroundColor: '#e0e0e0', padding: 10, marginTop: 20, width: '100%', borderRadius: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>Subtotal neto:</Text>
                  <Text>ARS {formatPrice(order.products.reduce((accumulator, currentProduct) => {
                return accumulator + currentProduct.price;
            }, 0))}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <Text>IVA:</Text>
                  <Text>ARS {formatPrice(order.iva.toFixed(2))}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <Text>Otros impuestos:</Text>
                  <Text>ARS {formatPrice(order.otherTaxes.toFixed(2))}</Text>
              </View>
              <View style={{ borderBottomWidth: 2, borderBottomColor: 'gray', marginTop: 10, width: '100%' }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <Text style={{fontWeight:800}}>Total del pedido:</Text>
                  <Text style={{fontWeight:800}}>ARS {formatPrice(order.products.reduce((accumulator, currentProduct) => {
                     return accumulator + currentProduct.price;
                  }, 0) + order.iva + order.otherTaxes)}</Text>
              </View>
            </View>
            <View style={{ marginTop:10 }}>
                <Text style={{fontWeight:400, }}>Facturar el día</Text>
            </View>
            <View style={{}}>
                <Text style={{fontWeight:500}}>{order.paymentDate}</Text>
            </View>
            <View style={{ marginTop:10 }}>
                <Text style={{fontWeight:400, }}>Horario de envío</Text>
            </View>
            <View style={{}}>
                <Text style={{fontWeight:500}}>{order.hour}</Text>
            </View>
            <View style={{ marginTop:10 }}>
                <Text style={{fontWeight:400, }}>Domicilio de envío</Text>
            </View>
            <View style={{}}>
                <Text style={{fontWeight:500}}>{order.address}</Text>
            </View>
            <View style={{ marginTop:10 }}>
                <Text style={{fontWeight:400, }}>Transporte</Text>
            </View>
            <View style={{}}>
                <Text style={{fontWeight:500}}>{order.transport}</Text>
            </View>
            <View style={{ marginTop:10 }}>
                <Text style={{fontWeight:400, }}>Pago de transporte</Text>
            </View>
            <View style={{}}>
                <Text style={{fontWeight:500}}>{order.paymentType}</Text>
            </View>


          </View>
        ) : (
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
            <View style={{marginTop:20, marginBottom:20}}>
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

        )}
    </ScrollView>
  )
}

export default OrderStatus