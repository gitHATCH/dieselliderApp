// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import Image1 from '../assets/images/turbo1.jpg';
import Image2 from '../assets/images/turbo2.jpg';
import Image3 from '../assets/images/turbo3.jpg';

import Header from '../components/Header';
import SubHeader from '../components/SubHeader';

//TODO: Mostrar los productos buscados, sino nada un cartel o la busqueda anterior

const HomeScreen = ({ navigation }) => {
  const [actualView, setActualView] = useState("Códigos DL")
  const [product, setProduct] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const images = [Image1, Image2, Image3];
  const [picker, setPicker] = useState("1 Unidad");
  
  const [products, setProducts] = useState([
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[1]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo TB2535", code:"465445-0002", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[2]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
    { state: "Inhabilitado", name: "Turbo TB2535", code:"465445-0003", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[3]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo TB2535", code:"465445-0004", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[4]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
    { state: "Inhabilitado", name: "Turbo TB2535", code:"465445-0005", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[5]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo TB2535", code:"465445-0006", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[6]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo TB2535", code:"465445-0007", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
    { state: "Disponible", name: "Turbo 805058-01 CO MP2-APL986 Ford Ranger", code:"105-212[7]", neto: 262744.04, brand: "Master Power", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
    { state: "Inhabilitado", name: "Turbo TB2535", code:"465445-0008", neto: 262744.04, brand: "Garret", type: "Turbo", section:"B", grupo:"TURBOS NUEVOS"},
  ])

  const handleActualView = (title) => {
    setActualView(title);
  }

  const formatPrice = (price) => {
    const priceString = price.toString();
    const [integerPart, decimalPart] = priceString.split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${formattedIntegerPart},${decimalPart}`;
  };

  const renderCarr = ({ item, index }) => {
    return (
      <View>
        <Image source={item} style={{ width: 200, height: 200 }} />
      </View>
    );
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
    console.log("Agregado al pedido");
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
      <Header funcBack={handleDetailClose} nav={navigation} title={product && detailVisible ? "Producto" : "Catálogo"} search={!detailVisible && true}/>
      {!detailVisible && <SubHeader title={"Turbos y Conjuntos"} setActual={handleActualView} actual={actualView}/>}
      <View style={{ flex: 1, padding: 10 }}>
        {product && detailVisible ? (
          <View>
            <View style={{alignItems:"center"}}>
              {/* Imagen - Estado/Nombre-Marca - Codigo - PrecioNeto - hr - Unidades/Total - Agregar - Caracteristicas - Marca/Tipo de Producto - Seccion/Grupo */}
              <Carousel
                data={images}
                renderItem={renderCarr}
                sliderWidth={300}
                itemWidth={200}
                layout={"default"}
              />
            </View>
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

          <View style={{}}>
            <TouchableOpacity style={{ backgroundColor: 'orange', padding: 10, marginVertical: 10, width: '80%', alignItems: 'center', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 5, marginTop:20 }}>
              <Text style={{ color: 'white' }}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>


          </View>
        ) : (
          <View>
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
    </View>
  );
};

export default HomeScreen;
