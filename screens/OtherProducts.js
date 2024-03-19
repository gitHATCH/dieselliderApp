import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar,FlatList,Dimensions, ScrollView, LogBox } from 'react-native';
import ToastManager, { Toast } from 'toastify-react-native'
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Carousel from '../components/Carousel';

const OtherProducts = ({ navigation }) => {
  const [type, setType] = useState('A');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
 

  // TODO: Traer tipos
  // TODO: Ningun tipo por defecto, mostrar placeholder
  const [types, setTypes] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']);

  const [focusedInput, setFocusedInput] = useState(null);
  const [errorText, setErrorText] = useState('');

  const [searching, setSearching] = useState(false);
  const [product, setProduct] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [picker, setPicker] = useState("1 Unidad");

  const [products, setProducts] = useState([
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[1]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo TB2535", code:"465445-0002", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[2]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
    { state: "Inhabilitado", name: "Turbo TB2535", code:"465445-0003", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[3]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo TB2535", code:"465445-0004", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[4]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
    { state: "Inhabilitado", name: "Turbo TB2535", code:"465445-0005", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[5]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo TB2535", code:"465445-0006", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[6]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo TB2535", code:"465445-0007", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[7]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
    { state: "Inhabilitado", name: "Turbo TB2535", code:"465445-0008", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS"},
  ])

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.']);
    setSearching(false)
  }, [navigation])

  const handleSearching = (value) => {
    setSearching(value);
  }
  const formatPrice = (price) => {
    const priceString = price.toString();
    const [integerPart, decimalPart] = priceString.split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${formattedIntegerPart},${decimalPart}`;
  };

  const handleDetailOpen = () => {
    setModalVisible(false);
    setDetailVisible(true);
  }

  const handleDetailClose = () => {
    setDetailVisible(false);
    setProduct("");
  }

  const handleModalOpen = (item) => {
    setProduct(item);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setProduct("")
    setModalVisible(false);
  };

  const addToOrder = () => {
    addProduct(product);
    setModalVisible(false);
    Toast.success('Agregado correctamente!')
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleModalOpen(item)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{flexDirection: "column", width:"90%"}}>
            <Text numberOfLines={4} ellipsizeMode="tail" style={{width:"90%" }}>
              {`${item.name} - ${item.brand}`}
            </Text>

          <View style={{flexDirection:"row", alignItems:"center", gap:10}}>
            <Text style={{fontWeight:400, fontSize:12}}>{item.code}</Text>
            {item.state === "Disponible" ?
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'green', marginRight: 10 }} />
            : <Text style={{backgroundColor:"red", padding: 4, borderRadius: 10, fontSize:12, color:"white"}}>Inhabilitado</Text> }
          </View>

          <View style={{justifyContent:"space-between", flexDirection: "row"}}>
            <Text style={{fontWeight:500, fontSize:12}}>Precio neto</Text>
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

  const searchResult = () => {
    //If "group" is "" or at least "code", "description" is not "", then search
    if ((type !== "") && (code !== "" || description !== "")) {
      setErrorText('');
    } else {
      setErrorText("Debe completar tipo y algún otro campo de búsqueda");
      return
    }
    //search
    setType("A");
    setCode("")
    setDescription("")
    setSearching(true);
  }

  return (
    <ScrollView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        <Header funcBack={handleDetailClose} nav={navigation} title={product && detailVisible ? "Producto" : "Catálogo"}/>
        {!detailVisible && <SubHeader searching={searching} title={"Otros Productos"} />}
        <ToastManager width={300} />
        {product && detailVisible ? (
          <View>
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
              <View style={{marginTop:20,flexDirection:"row",justifyContent:"space-between", alignItems:"center"}}>
                <Text style={{fontSize:20}}>Características</Text>
                <Icon name="right" size={25} color="black" />
              </View>
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
              <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 20, marginBottom:0,width: '100%' }} />

              <View style={{alignItems:"center", marginTop:10}}>
                <TouchableOpacity style={{ backgroundColor: '#f9f9f9', padding: 10, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5, marginTop:20 }}>
                  <Text style={{  }}>Relaciones</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        ) : (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding:20, paddingTop:0}}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker' ? 'blue' : 'gray', width: '100%', marginBottom: 10, marginTop: 0 }}>
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

          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'code' ? 'blue' : 'gray', width: '100%' }}>
            <TextInput
              placeholder="Código DL"
              value={code}
              onChangeText={(text) => setCode(text)}
              onFocus={() => setFocusedInput('code')}
              onBlur={() => setFocusedInput(null)}
              style={{ padding: 10,width: '100%' }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: focusedInput === 'descr' ? 'blue' : 'gray', width: '100%' }}>
            <TextInput
              placeholder="Descripción DL"
              value={description}
              onChangeText={(text) => setDescription(text)}
              onFocus={() => setFocusedInput('descr')}
              onBlur={() => setFocusedInput(null)}
              style={{ padding: 10,width: '100%' }}
            />
          </View>
        {/* Mostrar mensaje de error y línea si existe */}
        {errorText ? (
          <>
            <Text style={{ color: 'red', marginTop: 10 }}>{errorText}</Text>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, width: '100%' }} />
          </>
        ) : null}
        <TouchableOpacity style={{marginTop:20, backgroundColor: 'blue', padding: 10, marginVertical: 10, width: '100%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5 }} onPress={searchResult}>
          <Text style={{ color: 'white' }}>Buscar</Text>
        </TouchableOpacity>
        {searching && (
            <View style={{}}>
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
                  <TouchableOpacity style={{width:"100%",alignItems:"center", flexDirection:"row", gap:20, marginTop:10}} >
                    <Icon name="fork" size={22} color="black" />
                    <Text style={{fontSize:18, fontWeight:400}}>Relaciones</Text>
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

export default OtherProducts