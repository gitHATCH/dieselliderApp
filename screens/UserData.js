import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { View, Text, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import Header from '../components/Header';
import SubHeader from '../components/SubHeader';


const UserData = ({ navigation }) => {
    const [actualView, setActualView] = useState("Datos generales")
    const [modalVisible, setModalVisible] = useState(false);
    const [detailVisible, setDetailVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addresses, setAddresses] = useState([
      { addressee: "CONSUMIDOR FINAL", address: "AV. JUAN B. JUSTO 2224 (CASO1)", town: "PUEYRREDON", city: "CORDOBA (CASO1)", province: "CORDOBA", postalCode: 5001, country: "ARGENTINA", transport: "SENDBOX(1)", type:"ENVIO", paymentType: "DESTINO"},
      { addressee: "CONSUMIDOR FINAL", address: "AV. JUAN B. JUSTO 2224 (CASO2)", town: "PUEYRREDON", city: "CORDOBA (CASO2)", province: "CORDOBA", postalCode: 5001, country: "ARGENTINA", transport: "SENDBOX(2)", type:"ENVIO", paymentType: "ORIGEN"},
      { addressee: "CONSUMIDOR FINAL", address: "AV. JUAN B. JUSTO 2224 (CASO3)", town: "PUEYRREDON", city: "CORDOBA (CASO3)", province: "CORDOBA", postalCode: 5001, country: "ARGENTINA", transport: "SENDBOX(3)", type:"ENVIO", paymentType: "DESTINO"},
      { addressee: "CONSUMIDOR FINAL", address: "AV. JUAN B. JUSTO 2224 (CASO4)", town: "PUEYRREDON", city: "CORDOBA (CASO4)", province: "CORDOBA", postalCode: 5001, country: "ARGENTINA", transport: "SENDBOX(4)", type:"ENVIO", paymentType: "ORIGEN"},
      { addressee: "CONSUMIDOR FINAL", address: "AV. JUAN B. JUSTO 2224 (CASO5)", town: "PUEYRREDON", city: "CORDOBA (CASO5)", province: "CORDOBA", postalCode: 5001, country: "ARGENTINA", transport: "SENDBOX(5)", type:"ENVIO", paymentType: "DESTINO"},
      { addressee: "CONSUMIDOR FINAL", address: "AV. JUAN B. JUSTO 2224 (CASO6)", town: "PUEYRREDON", city: "CORDOBA (CASO6)", province: "CORDOBA", postalCode: 5001, country: "ARGENTINA", transport: "SENDBOX(6)", type:"ENVIO", paymentType: "ORIGEN"},
    ])

    const handleActualView = (title) => {
      setActualView(title);
    }

    const handleModalOpen = (item) => {
      setSelectedAddress(item);
      setModalVisible(true);
    };
  
    const handleModalClose = () => {
      setModalVisible(false);
    };

    const handleDetailOpen = () => {
      setModalVisible(false);
      setDetailVisible(true);
    }

    const handleDetailClose = () => {
      setDetailVisible(false);
    }

    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity onPress={() => handleModalOpen(item)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text numberOfLines={4} ellipsizeMode="tail" style={{ width: '90%' }}>
            {`${item.address}, ${item.town}, ${item.postalCode}, ${item.city}, ${item.province}, ${item.country}, TRANSP.: ${item.transport}, FLETE: ${item.paymentType}`}
          </Text>
          <Icon name="right" size={25} color="black" />
        </TouchableOpacity>
      );
    };
  
    const renderSeparator = () => {
      return <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginVertical: 10 }} />;
    };
  

  return (
    <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        <Header funcBack={handleDetailClose} nav={navigation} title={detailVisible ? "Domicilio de envío" : "Mis datos"}/>
        {!detailVisible && <SubHeader title={"Mis Datos"} notTitle={true} setActual={handleActualView} actual={actualView}/>
}
        <View style={{ flex: 1, padding: 20 }}>
            {actualView === "Datos generales" && (
              <View style={{ }}>
                <Text style={{fontWeight:400, }}>Razón social</Text>
                <Text style={{fontWeight:500}}>CONSUMIDOR FINAL</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Domicilio</Text>
                <Text style={{fontWeight:500}}>Sin datos</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Teléfono</Text>
                <Text style={{fontWeight:500}}>Sin datos</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Teléfono</Text>
                <Text style={{fontWeight:500}}>Sin datos</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Móvil</Text>
                <Text style={{fontWeight:500}}>-</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Persona de contacto</Text>
                <Text style={{fontWeight:500}}>Sin datos</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
              </View>
            )}
            {actualView === "Datos impositivos" && (
              <View style={{ }}>
                <Text style={{fontWeight:400, }}>Identificador fiscal</Text>
                <Text style={{fontWeight:500}}>CUIT 1234</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Condición frente al IVA</Text>
                <Text style={{fontWeight:500}}>MONOTRIBUTO</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Ingresos Brutos</Text>
                <Text style={{fontWeight:500}}>00</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Tipo de convenio</Text>
                <Text style={{fontWeight:500}}>CONVENIO LOCAL</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Alícuota de Percepción de IIBB</Text>
                <Text style={{fontWeight:500}}>0%</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
              </View>
            )}
            {actualView === "Datos de envío" && !detailVisible && (
              <View style={{ }}>
                <FlatList
                  data={addresses}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={renderSeparator}
                />
               
              </View>
            )}
            {actualView === "Datos de envío" && detailVisible && (
              <View style={{ }}>
                <Text style={{fontWeight:400, }}>Destinatario</Text>
                <Text style={{fontWeight:500}}>{selectedAddress.addressee}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Domicilio</Text>
                <Text style={{fontWeight:500}}>{selectedAddress.address}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Barrio</Text>
                <Text style={{fontWeight:500}}>{selectedAddress.town}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Localidad</Text>
                <Text style={{fontWeight:500}}>{selectedAddress.city}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Código postal</Text>
                <Text style={{fontWeight:500}}>{selectedAddress.postalCode}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Provincia</Text>
                <Text style={{fontWeight:500}}>{selectedAddress.province}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>País</Text>
                <Text style={{fontWeight:500}}>{selectedAddress.country}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Transporte</Text>
                <Text style={{fontWeight:500}}>{selectedAddress.transport}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Tipo</Text>
                <Text style={{fontWeight:500}}>{selectedAddress.type}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
                <Text style={{fontWeight:400, }}>Cobro</Text>
                <Text style={{fontWeight:500}}>{selectedAddress.paymentType}</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', marginTop: 10, marginBottom:10,width: '100%' }} />
              </View>
            )}
        </View>
        <View>

          <Modal onBackdropPress={handleModalClose} isVisible={modalVisible} animationIn="slideInUp" animationOut="slideOutDown">
            <View style={{ flex: 1, justifyContent: 'flex-end'}}>
              <View style={{ backgroundColor: 'white', padding: 20,borderRadius:10 }}>
                <View style={{ }}>
                  <TouchableOpacity style={{width:"100%",alignItems:"center", flexDirection:"row", gap:20}} onPress={handleDetailOpen}>
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
    </View>
  )
}

export default UserData