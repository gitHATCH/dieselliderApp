// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, FlatList, TouchableOpacity, Image, Dimensions, ScrollView, LogBox  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

import Image1 from '../assets/images/turbo1.jpg';
import Image2 from '../assets/images/turbo2.jpg';
import Image3 from '../assets/images/turbo3.jpg';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import { useUserContext } from '../hooks/UserContext';
import ToastManager, { Toast } from 'toastify-react-native'
import Carousel from '../components/Carousel';

//TODO: Mostrar los productos buscados, sino nada un cartel o la busqueda anterior
//TODO: Ver filtro y Precios
//TODO: Hacer lo de relaciones


const HomeScreen = ({ navigation }) => {
  const {  
    isInProducts,
    addProduct,
    removeProduct,
    clearProducts,
  } = useUserContext();
  const [actualView, setActualView] = useState("Códigos DL")
  const [product, setProduct] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);
  const [relationsVisible, setRelationsVisible] = useState(false);
 
  const [picker, setPicker] = useState("1 Unidad");
  //TODO: Arreglar modal al elegir producto en relaciones
  const [products, setProducts] = useState([
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[1]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
    { state: "Disponible", name: "Turbo TB2535", code:"465445-0002", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[2]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
    { state: "No Disponible", name: "Turbo TB2535", code:"465445-0003", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[3]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
    { state: "Disponible", name: "Turbo TB2535", code:"465445-0004", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[4]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
    { state: "No Disponible", name: "Turbo TB2535", code:"465445-0005", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[5]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
    { state: "Disponible", name: "Turbo TB2535", code:"465445-0006", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[6]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
    { state: "Disponible", name: "Turbo TB2535", code:"465445-0007", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[7]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
    { state: "No Disponible", name: "Turbo TB2535", code:"465445-0008", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", group:"TURBOS NUEVOS", subgroup:"TURBOS NUEVOS",partNum:"105-212[1]",unity:"Unidad",listPrice:262744.04,disc:0,stock:"alto",mark:"Inhabilitado",notes:"Turbo 805058-01 CO MP2-APL986 Ford Ranger"},
  ])
  const [visible, setIsVisible] = useState(false);
  
  const { width: screenWidth } = Dimensions.get('window');

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.']);
  }, [])

  const handleActualView = (title) => {
    setActualView(title);
  }

  const handleSearchValue = (value) => {
    setSearch(value);
  }
  const handleSearching = (value) => {
    setSearching(value);
  }

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
    setActualView("Códigos DL")
    setRelationsVisible(false);
  }

  const handleDetailOpen = () => {
    setModalVisible(false);
    setDetailVisible(true);
  }

  const handleDetailClose = () => {
    setDetailVisible(false);
    setProduct("");
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

  const handleModalOpen = (item) => {
    setProduct(item);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setProduct("")
    setModalVisible(false);
  };

  const addToOrder = () => {
    addProduct({...product, quantity:1});
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

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
      <Header searchValue={search} changeSearchValue={handleSearchValue} searching={searching} changeSearching={handleSearching} funcBack={relationsVisible ? handleRelationsClose : notesVisible ? handleNotesClose : featuresVisible ? handleFeaturesClose : handleDetailClose} nav={navigation} title={relationsVisible ? "Relaciones" : notesVisible ? "Notas" : featuresVisible ? "Características" : detailVisible ? "Producto" : "Catálogo"} search={(!detailVisible && !relationsVisible) && true}/>
      {(!detailVisible || relationsVisible) && <SubHeader searching={searching} relation={relationsVisible ? product : null} title={relationsVisible ? "Relaciones" : "Turbos y Conjuntos"} setActual={handleActualView} actual={actualView}/>}
      <ToastManager width={300} />
      <View style={{ flex: 1}}>
        {relationsVisible ? (
          <View style={{ padding:10 }}>
          <FlatList
              data={products}
              renderItem={renderItem}
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
                <TouchableOpacity onPress={handleRelationsOpen} style={{ backgroundColor: '#f9f9f9', padding: 10, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5, marginTop:20 }}>
                  <Text style={{  }}>Relaciones</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        ) : (
          <View style={{padding:10}}>
            <FlatList
              data={products}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={renderSeparator}
            />
          </View>
        )}
        
        <Modal onBackdropPress={handleModalClose} isVisible={modalVisible} animationIn="slideInUp" animationOut="slideOutDown">
            <View style={{ flex: 1, justifyContent: 'flex-end'}}>
              <View style={{ backgroundColor: 'white', padding: 20,borderRadius:10 }}>
                <View style={{ }}>
                  <TouchableOpacity onPress={handleDetailOpen} style={{width:"100%",alignItems:"center", flexDirection:"row", gap:20}} >
                    <Icon name="filetext1" size={22} color="black" />
                    <Text style={{fontSize:18, fontWeight:400}}>Detalles</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleRelationsOpen} style={{width:"100%",alignItems:"center", flexDirection:"row", gap:20, marginTop:10}} >
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
    </View>
  );
};

export default HomeScreen;
