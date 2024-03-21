import React, { useEffect, useState } from 'react';
import {View, Text, StatusBar, FlatList, TouchableOpacity, Image, Dimensions, ScrollView, TextInput, LogBox } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import { useUserContext } from '../hooks/UserContext';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import Carousel from '../components/Carousel';

const MyOrder = ({ navigation }) => {
  //TODO: En los picker de fechas, si se borra, que se reemplace el state por "" directamente. Ademas, comprobar fechas en pasado y esas cosas.
  //TODO: En el picker mostrar el texto completo, no solo el address
  const {  
    isInProducts,
    addProduct,
    removeProduct,
    clearProducts,
    products
  } = useUserContext();
  const [focusedInput, setFocusedInput] = useState(null);
  const [paymentDate, setPaymentDate] = useState('');
  const [actualDate, setActualDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [preferMorning, setPreferMorning] = useState(false);

  const [product, setProduct] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [picker, setPicker] = useState("1 Unidad");
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

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.']);
  }, [])
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const formatPrice = (price) => {
    const priceString = price.toString();
    const [integerPart, decimalPart] = priceString.split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${formattedIntegerPart},${decimalPart}`;
  };

  const handleModalOpen = (item) => {
    setProduct(item);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setProduct("")
    setModalVisible(false);
  };

  const handleFeaturesClose = () => {
    setFeaturesVisible(false);
  }

  const handleFeaturesOpen = () => {
    setFeaturesVisible(true);
  }

  const handleNotesClose = () => {
    setNotesVisible(false);
  }

  const handleNotesOpen = () => {
    setNotesVisible(true);
  }

  const handleDetailOpen = () => {
    setModalVisible(false);
    setDetailVisible(true);
  }

  const handleDetailClose = () => {
    setDetailVisible(false);
    setProduct("");
  }
  
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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleModalProdOpen(item)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{flexDirection: "column", width:"90%"}}>
            <Text numberOfLines={4} ellipsizeMode="tail" style={{width:"90%" }}>
              {`${item.name} - ${item.brand}`}
            </Text>

          <View style={{flexDirection:"row", alignItems:"center", gap:10}}>
            <Text style={{fontWeight:400, fontSize:12}}>{item.code}</Text>
            
          </View>

          <View style={{justifyContent:"space-between", flexDirection: "row"}}>
            <Text style={{fontWeight:500, fontSize:12}}>{item.quantity} {item.quantity > 1 ? "Unidades" : "Unidad"}</Text>
            <Text style={{fontWeight:500, fontSize:12}}>ARS {formatPrice(item.neto)}</Text>
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
        <Header nav={navigation} title={notesVisible ? "Notas" : featuresVisible ? "Características" : detailVisible ? "Producto" : "Pedido Actual"} funcBack={notesVisible ? handleNotesClose : featuresVisible ? handleFeaturesClose : handleDetailClose}/>
        <View style={{ flex: 1}}>
        {notesVisible ? (
          <ScrollView style={{padding:10}}>
            <Text numberOfLines={20} ellipsizeMode="tail" style={{fontWeight:500}}>{product.notes}</Text>
          </ScrollView>
        ) :
        featuresVisible ? (
          <ScrollView style={{padding:10}}>
            <Text style={{fontWeight:400, }}>Código DL</Text>
            <Text style={{fontWeight:500}}>{product.code}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
            <Text  style={{fontWeight:400, }}>Descripción</Text>
            <Text numberOfLines={4} ellipsizeMode="tail" style={{fontWeight:500}}>{product.name}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
            <Text style={{fontWeight:400, }}>Marca</Text>
            <Text style={{fontWeight:500}}>{product.brand}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
            <Text style={{fontWeight:400, }}>Tipo de producto</Text>
            <Text style={{fontWeight:500}}>{product.type}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
            <Text style={{fontWeight:400, }}>Sección</Text>
            <Text style={{fontWeight:500}}>{product.section}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
            <Text style={{fontWeight:400, }}>Grupo</Text>
            <Text style={{fontWeight:500}}>{product.group}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
            <Text style={{fontWeight:400, }}>Subgrupo</Text>
            <Text style={{fontWeight:500}}>{product.subgroup}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
            <Text style={{fontWeight:400, }}>N° de parte</Text>
            <Text style={{fontWeight:500}}>{product.partNum}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
            <Text style={{fontWeight:400, }}>Unidad de medida</Text>
            <Text style={{fontWeight:500}}>{product.unity}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
            <Text style={{fontWeight:400, }}>Precio de lista</Text>
            <Text style={{fontWeight:500}}>ARS {formatPrice(product.listPrice.toFixed(2))}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
            <Text style={{fontWeight:400, }}>Descuento</Text>
            <Text style={{fontWeight:500}}>{product.disc}%</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
            <Text style={{fontWeight:400, }}>Pecio neto</Text>
            <Text style={{fontWeight:500}}>ARS {formatPrice(product.neto.toFixed(2))}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
            <Text style={{fontWeight:400, }}>Stock</Text>
            <Text style={{width:"20%", textAlign:"center",fontWeight:500,backgroundColor:product.stock === "alto" ? "green" : "red", padding: 4, borderRadius: 10, fontSize:12, color:"white"}}>Stock {product.stock}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
          </ScrollView>
        ) : detailVisible ? (
          <ScrollView>
            <Carousel/>
            <View style={{padding:10}}>
              
            
              <Text numberOfLines={4} ellipsizeMode="tail" style={{width:"90%" }}>
                {`${product.name}`}
              </Text>
              <Text style={{fontWeight:700}}>{product.brand}</Text>
              <View style={{flexDirection:"row", alignItems:"center", gap:10}}>
                <Text style={{fontWeight:400, fontSize:12}}>{product.code}</Text>
                {product.state === "Disponible" ?
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'green', marginRight: 10 }} />
                : <Text style={{backgroundColor:"red", padding: 4, borderRadius: 10, fontSize:12, color:"white"}}>Inhabilitado</Text> }
              </View>

              <View style={{justifyContent:"space-between", flexDirection: "row"}}>
                <Text style={{fontWeight:500, fontSize:12}}>Precio neto</Text>
                <Text style={{fontWeight:500, fontSize:12}}>ARS {formatPrice(product.neto)}</Text>
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 20, marginBottom:10,width: '100%' }} />
              <View style={{marginTop:0, justifyContent:"space-between", flexDirection:"row", alignItems:"center"}}>
                <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker' ? 'blue' : 'gray', width: '50%', marginTop: 0 }}>
                  <Picker
                    selectedValue={picker}
                    onValueChange={(itemValue) => setPicker(itemValue)}
                    style={{ height: 50, width: '100%', padding: 10 }}
                    onFocus={() => setFocusedInput('picker')}
                    onBlur={() => setFocusedInput(null)}
                    >
                      <Picker.Item label={"1 Unidad"} value={"1 Unidad"} key={1} />
                  </Picker>
                </View>
                <Text style={{fontWeight:500, fontSize:16}}>ARS {formatPrice(product.neto)}</Text>
              </View>

              <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:0,width: '100%' }} />

              <TouchableOpacity onPress={handleFeaturesOpen} style={{ marginTop:10,flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{fontSize:20}}>Características</Text>
                  <Icon name="right" size={25} color="black" />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20, marginTop:10 }}>
                <View style={{ width: '50%' }}>
                  <Text style={{fontWeight:400, }}>Marca</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{fontWeight:400, }}>Tipo de produto</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20 }}>
                <View style={{ width: '50%' }}>
                  <Text style={{fontWeight:500}}>{product.brand}</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text  style={{fontWeight:500}}>{product.type}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20, marginTop:10 }}>
                <View style={{ width: '50%' }}>
                  <Text style={{fontWeight:400, }}>Sección</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{fontWeight:400, }}>Grupo</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20 }}>
                <View style={{ width: '50%' }}>
                  <Text style={{fontWeight:500}}>{product.section}</Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text  style={{fontWeight:500}}>{product.group}</Text>
                </View>
              </View>
              <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:0,width: '100%' }} />
              <TouchableOpacity onPress={handleNotesOpen} style={{ marginTop:10,flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{fontSize:20}}>Notas</Text>
                  <Icon name="right" size={25} color="black" />
              </TouchableOpacity>
              <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:0,width: '100%' }} />

              <View style={{alignItems:"center", marginTop:0}}>
                <TouchableOpacity style={{ backgroundColor: '#f9f9f9', padding: 10, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5, marginTop:20 }}>
                  <Text style={{  }}>Relaciones</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        ) : (
        <ScrollView style={{padding:10}}>
           {products.length > 0 ? (
            <View>
              <Text style={{fontWeight:600, fontSize:18, textAlign:"center", marginBottom:10}}>Productos</Text>
              <FlatList
                data={products}
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
           ) : (
            <Text style={{textAlign:"center", marginTop:20}}>El pedido se encuentra vacío</Text>
           )} 
           <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 40, marginBottom:0,width: '100%' }} />
        
           <View style={{ backgroundColor: '#e0e0e0', padding: 10, marginTop: 20, width: '100%', borderRadius: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>Subtotal neto:</Text>
                  <Text>ARS {formatPrice(products.reduce((accumulator, currentProduct) => {
                return accumulator + currentProduct.neto;
            }, 0).toFixed(2))}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <Text>IVA:</Text>
                  <Text>ARS {(0).toFixed(2)}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <Text>Otros impuestos:</Text>
                  <Text>ARS {(0).toFixed(2)}</Text>
              </View>
              <View style={{ borderBottomWidth: 2, borderBottomColor: 'gray', marginTop: 10, width: '100%' }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                  <Text style={{fontWeight:800}}>Total del pedido:</Text>
                  <Text style={{fontWeight:800}}>ARS {formatPrice(products.reduce((accumulator, currentProduct) => {
                     return accumulator + currentProduct.neto;
                  }, 0).toFixed(2))}</Text>
              </View>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 20, marginBottom:20,width: '100%' }} />
        
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20, marginTop:20}}>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:400, }}>Total deuda</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:400, }}>Disponible</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap:20, marginBottom:60  }}>
              <View style={{ width: '50%' }}>
                <Text style={{fontWeight:500}}>ARS</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text  style={{fontWeight:500}}>ARS</Text>
              </View>
            </View>

        </ScrollView>
        )}

        </View>
    </View>
  )
}

export default MyOrder;
