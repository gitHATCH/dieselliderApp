import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, FlatList, ScrollView,useWindowDimensions, LogBox } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from 'react-native-modal';
import Header from '../components/Header';
import ToastManager, { Toast } from 'toastify-react-native'
import Carousel from '../components/Carousel';
import { useUserContext } from '../hooks/UserContext';
import SubHeader from '../components/SubHeader';


const OrderStatus = ({ navigation }) => {
  const [advanced, setAdvanced] = useState(false);
  const [type, setType] = useState('Pedidos en todos los estados');
  const [period, setPeriod] = useState('Todo el periodo');
  const {  
    isInProducts,
    addProduct,
    removeProduct,
    clearProducts,
  } = useUserContext();
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
  const [picker, setPicker] = useState("1 Unidad");
  const [modalProdVisible, setModalProdVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [searching, setSearching] = useState(false);
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [relationsVisible, setRelationsVisible] = useState(false);
  const [actualView, setActualView] = useState("Reemp. s/mod")


  const windowHeight = useWindowDimensions().height;

  const [orders, setOrders] = useState([
    { num: "123456",currency: "ARS",date: "01/08/2021", status: "cancelado", paymentDate: "01/08/2021", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23, otherTaxes: 0.00,
      products: [
        { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[1]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 1},
        { state: "Disponible", name: "Turbo TB2535", code:"465445-0002", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 1},
        { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[2]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 1},
        { state: "No Disponible", name: "Turbo TB2535", code:"465445-0003", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 3},
        { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[3]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 1},
        { state: "Disponible", name: "Turbo TB2535", code:"465445-0004", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 1},
        { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[4]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 1},
        { state: "No Disponible", name: "Turbo TB2535", code:"465445-0005", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 1},
        { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[5]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 1},
        { state: "Disponible", name: "Turbo TB2535", code:"465445-0006", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 1},
        { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[6]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 1},
        { state: "Disponible", name: "Turbo TB2535", code:"465445-0007", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 2},
        { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[7]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 1},
        { state: "No Disponible", name: "Turbo TB2535", code:"465445-0008", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity: 1},
      ]
    },
    { num: "123457", currency: "ARS", date: "01/08/2021", status: "cancelado", paymentDate: "01/08/2021", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23, otherTaxes: 0.00,
      products: [{ state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[1]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity:5}]
    },
    { num: "123458", currency: "USD", date: "01/08/2021", status: "cancelado", paymentDate: "01/08/2021", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23, otherTaxes: 0.00,
      products: [{ state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[1]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity:1}]
    },
    { num: "123459", currency: "ARS", date: "01/08/2021", status: "cancelado", paymentDate: "01/08/2021", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23, otherTaxes: 0.00,
      products: [{ state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[1]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity:1}]
    },
    { num: "123460", currency: "ARS", date: "01/08/2021", status: "cancelado", paymentDate: "01/08/2021", hour: "Por la tarde", address: "Sin datos", transport: "BUSPACK (C/ ENVIO A DOMICILIO)", paymentType: "DESTINO",  iva:533.23, otherTaxes: 0.00,
      products: [{ state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[1]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger", quantity:1}]
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

  const handleRelationsOpen = () => {
    setModalVisible(false);
    setActualView("Reemp. s/mod")
    setRelationsVisible(true);
  }

  const handleRelationsClose = () => {
    setActualView("Reemp. s/mod")
    setRelationsVisible(false);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const addToOrder = () => {
    addProduct({...product, quantity:1});
    setModalVisible(false);
    Toast.success('Agregado correctamente!')
  }

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

  const handleModalProdOpen = (item) => {
    setProduct(item);
    setModalVisible(true);
    setModalProdVisible(true);
  }


  const handleModalProdClose = () => {
    setProduct("")
    setModalVisible(false);
    setModalProdVisible(false);
  }

  const handleProductVisibleOpen = () => {
    setProductVisible(true);
    setModalVisible(false);
    setModalProdVisible(false);
  }

  const handleProductVisibleClose = () => {
    setProductVisible(false);
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

  const handleActualView = (title) => {
    setActualView(title);
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
          <Text style={{fontWeight:400, fontSize:12}}>{`${item.products.reduce((accumulator, currentProduct) => {
                return accumulator + currentProduct.quantity;
            }, 0)} ${item.products.reduce((accumulator, currentProduct) => {
                return accumulator + currentProduct.quantity;
            }, 0) > 1 ? "Artículos" : "Artículo"}. Pedido ${item.status}`}</Text>
          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <Text style={{fontWeight:400, fontSize:12}}>{`Importe total`}</Text>
            <Text style={{fontWeight:400, fontSize:12}}>{`ARS ${formatPrice(item.products.reduce((accumulator, currentProduct) => {
                return accumulator + currentProduct.neto;
            }, 0))}`}</Text>
 
          </View>

          
        </View>
        <Icon name="right" size={25} color="black" />
      </TouchableOpacity>
    );
  };

  const renderItemProduct = ({ item }) => {
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
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 , minHeight: Math.round(windowHeight)}}>
        <Header funcBack={relationsVisible ? handleRelationsClose : featuresVisible ? handleFeaturesClose : notesVisible ? handleNotesClose : productVisible ? handleProductVisibleClose : handleDetailClose}  nav={navigation} title={notesVisible ? "Notas" : featuresVisible ? "Características" : productVisible ? "Producto" : detailVisible ? "Pedido" : "Estado de Pedidos"}/>
        { relationsVisible && <SubHeader relation={relationsVisible ? product : null} title={"Relaciones"} setActual={handleActualView} actual={actualView}/>}

        <ToastManager width={300} />

        <ScrollView>
        {relationsVisible ? (
          <View style={{ padding:10 }}>
          <FlatList
              data={order.products}
              renderItem={renderItemProduct}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={renderSeparator}
            />
          </View>
        ) : notesVisible ? (
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
        ) : productVisible ? (
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

              <View style={{alignItems:"center"}}>
                <TouchableOpacity onPress={addToOrder} style={{ backgroundColor: 'orange', padding: 10, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5, marginTop:20 }}>
                  <Text style={{ color: 'white' }}>Agregar al pedido</Text>
                </TouchableOpacity>
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
                <TouchableOpacity  onPress={handleRelationsOpen} style={{ backgroundColor: '#f9f9f9', padding: 10, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5, marginTop:20 }}>
                  <Text style={{  }}>Relaciones</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        ) : detailVisible ? (
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
            <View style={{ borderBottomWidth: 1,marginTop:20,marginBottom:20 ,borderBottomColor: 'lightgray', marginVertical: 10 }} />
            <FlatList
              data={order.products}
              renderItem={renderItemProduct}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={renderSeparator}
            />

            <View style={{ backgroundColor: '#e0e0e0', padding: 10, marginTop: 20, width: '100%', borderRadius: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>Subtotal neto:</Text>
                  <Text>ARS {formatPrice(order.products.reduce((accumulator, currentProduct) => {
                return accumulator + currentProduct.neto;
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
                     return accumulator + currentProduct.neto;
                  }, 0) + order.iva + order.otherTaxes)}</Text>
              </View>
            </View>
            
            <View style={{ marginTop:20 }}>
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
              
            </View>
            
        )}
      </View>

        )}
        <Modal onBackdropPress={modalProdVisible ? handleModalProdClose : handleModalClose} isVisible={modalVisible} animationIn="slideInUp" animationOut="slideOutDown">
                <View style={{ flex: 1, justifyContent: 'flex-end'}}>
                  <View style={{ backgroundColor: 'white', padding: 20,borderRadius:10 }}>
                    <View style={{ }}>
                      <TouchableOpacity onPress={modalProdVisible ? handleProductVisibleOpen : handleDetailOpen} style={{width:"100%",alignItems:"center", flexDirection:"row", gap:20}} >
                        <Icon name="filetext1" size={22} color="black" />
                        <Text style={{fontSize:18, fontWeight:400}}>Detalles</Text>
                      </TouchableOpacity>
                      {detailVisible && (
                        <TouchableOpacity onPress={handleRelationsOpen} style={{width:"100%",alignItems:"center", flexDirection:"row", gap:20, marginTop:10}} >
                          <Icon name="fork" size={22} color="black" />
                          <Text style={{fontSize:18, fontWeight:400}}>Relaciones</Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity style={{width:"100%",alignItems:"center", flexDirection:"row", gap:20, marginTop:10}} onPress={modalProdVisible ? handleModalProdClose : handleModalClose}>
                        <Icon name="close" size={22} color="black" />
                        <Text style={{fontSize:18, fontWeight:400}}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
        </ScrollView>
    </View>
  )
}

export default OrderStatus