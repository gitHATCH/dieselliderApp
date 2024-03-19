// SubHeader.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const SubHeader = ({title, setActual, actual, notTitle, searching}) => {

  const handleAddPress = (content) => {
    setActual(content)
  }

  return (
    <View style={{ backgroundColor: '#1c5560', padding: 10, paddingBottom: (title === "Turbos y Conjuntos" || title === "Cuenta Corriente" || title === "Mis Datos") ? 0 : 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          {!notTitle && <Text style={{ color: 'white', fontSize: 22, fontWeight: 500 }}>{title}</Text>}
        </View>
        {title === "Turbos y Conjuntos" && (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            {searching && (
              <Icon name="tag" size={25} color="white" />
            )}
            {searching && (
              <Icon name="filter" size={25} color="white" />
            )}
            
            
            <Icon name="refresh" size={25} color="white" />
          </View>
        )}
      </View>
      {title === "Turbos y Conjuntos" && (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => handleAddPress("Códigos DL")}>
            <Text style={{ fontSize: 15, color: "white", textAlign: "center", fontWeight:actual === "Códigos DL" ? 700 : 400 }}>Códigos DL</Text>
            <View style={{ borderBottomWidth: 6, borderBottomColor: actual === "Códigos DL" ? "green" : "transparent", marginTop: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => handleAddPress("Números de parte")}>
            <Text style={{ fontSize: 15, color: "white", textAlign: "center", fontWeight:actual === "Números de parte" ? 700 : 400 }}>Números de parte</Text>
            <View style={{ borderBottomWidth: 6, borderBottomColor: actual === "Números de parte" ? "green" : "transparent", marginTop: 5 }} />
          </TouchableOpacity>
        </View>
      )}
      {title === "Cuenta Corriente" && (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
          <TouchableOpacity style={{ flex: 1/4 }} onPress={() => handleAddPress("Estado")}>
            <Text style={{ fontSize: 15, color: "white", textAlign: "center", fontWeight:actual === "Estado" ? 700 : 400 }}>Estado</Text>
            <View style={{ borderBottomWidth: 6, borderBottomColor: actual === "Estado" ? "green" : "transparent", marginTop: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1/3 }} onPress={() => handleAddPress("Comprobantes")}>
            <Text style={{ fontSize: 15, color: "white", textAlign: "center", fontWeight:actual === "Comprobantes" ? 700 : 400 }}>Comprobantes</Text>
            <View style={{ borderBottomWidth: 6, borderBottomColor: actual === "Comprobantes" ? "green" : "transparent", marginTop: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1/3 }} onPress={() => handleAddPress("Informar un pago")}>
            <Text style={{ fontSize: 15, color: "white", textAlign: "center", fontWeight:actual === "Informar un pago" ? 700 : 400 }}>Informar un pago</Text>
            <View style={{ borderBottomWidth: 6, borderBottomColor: actual === "Informar un pago" ? "green" : "transparent", marginTop: 5 }} />
          </TouchableOpacity>
        </View>
      )}
      {title === "Mis Datos" && (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
          <TouchableOpacity style={{ flex: 1/3 }} onPress={() => handleAddPress("Datos generales")}>
            <Text style={{ fontSize: 15, color: "white", textAlign: "center", fontWeight:actual === "Datos generales" ? 700 : 400 }}>Datos generales</Text>
            <View style={{ borderBottomWidth: 6, borderBottomColor: actual === "Datos generales" ? "green" : "transparent", marginTop: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1/3 }} onPress={() => handleAddPress("Datos de envío")}>
            <Text style={{ fontSize: 15, color: "white", textAlign: "center", fontWeight:actual === "Datos de envío" ? 700 : 400 }}>Datos de envío</Text>
            <View style={{ borderBottomWidth: 6, borderBottomColor: actual === "Datos de envío" ? "green" : "transparent", marginTop: 5 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1/3 }} onPress={() => handleAddPress("Datos impositivos")}>
            <Text style={{ fontSize: 15, color: "white", textAlign: "center", fontWeight:actual === "Datos impositivos" ? 700 : 400 }}>Datos impositivos</Text>
            <View style={{ borderBottomWidth: 6, borderBottomColor: actual === "Datos Impositivos" ? "green" : "transparent", marginTop: 5 }} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SubHeader;
