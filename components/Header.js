// Header.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, Easing, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useUserContext } from '../hooks/UserContext';

const Header = ({nav, title, search}) => {
  const { user, logout } = useUserContext();
  const [isMenuVisible, setMenuVisible] = useState(false);


  const logoutSesion = () => {
    logout();
    nav.navigate('Login');
  }


  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    animateMenu(false, () => {
      setMenuVisible(false);
    });
  };

  const handleOutsidePress = () => {
    if (isMenuVisible) {
      handleMenuClose();
    }
  };

  const { height: windowHeight } = Dimensions.get('window');

  const menuTranslateX = new Animated.Value(-300);
  const animateMenu = (open, callback) => {
    Animated.timing(menuTranslateX, {
      toValue: open ? 0 : -300,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(callback);
  };

  useEffect(() => {
    animateMenu(isMenuVisible);
  }, [isMenuVisible]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={{ backgroundColor: '#001f36', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            <TouchableOpacity onPress={handleMenuPress}>
              <Icon name="menu" size={25} color="white" />
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize:22, fontWeight:500 }}>{title}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
            {search && <Icon name="search" size={25} color="white" />}
            {user && title !== "Pedido Actual" && (
              <TouchableOpacity onPress={() => nav.navigate("MyOrder")} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
                <Icon name="shopping-cart" size={22} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Modal
        transparent
        visible={isMenuVisible}
        onRequestClose={handleMenuClose}
      >
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Animated.View
              style={{
                height: windowHeight,
                flexDirection: 'row',
                transform: [{ translateX: menuTranslateX }],
              }}
            >
              <View style={{ width: 300, backgroundColor: 'white' }}>
                <View style={{ backgroundColor: '#001f36', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Agregar Logo azul, Info: CONSUMIDOR FINAL, CUIT -123-4, Cliente 600 */}
                  <Image source={require('../assets/images/diesel_logo_transparent_legend.png')} style={{ width: 70, height: 40, borderRadius: 0, resizeMode: 'stretch' }} />
                  {user && (
                    <View>
                      <Text style={{ color: 'white', fontSize: 12 }}>CONSUMIDOR FINAL</Text>
                      <Text style={{ color: 'white', fontSize: 12 }}>CUIT -123-4</Text>
                      <Text style={{ color: 'white', fontSize: 12 }}>Cliente 600</Text>
                    </View>
                  )}
                </View>
                  {/* Agregar para la seccion Catálogo los botones:Turbos y conjuntos - Partes de turbos - Otros productos, para la secc Cuenta: Estado de pedidos - Cuenta corriente - Mis datos - Cerrar sesión */}
                  {/* Usuario sin cuenta, ocultar de seccion Cuenta todo y colocar Iniciar sesion*/}
                <View style={{ padding: 10 }}>
                  <Text style={{fontSize:22,fontWeight:700}}>Catálogo</Text>
                    <View style={{justifyContent: 'space-between', marginTop:5}}>
                      <TouchableOpacity style={styles.buttonContainer} onPress={() => nav.navigate("HomeScreen")}>
                        <View style={styles.circle}></View>
                        <Text style={styles.buttonText}>Turbos y conjuntos</Text>
                      </TouchableOpacity>
                      <View style={styles.divider}></View>
                      <TouchableOpacity style={styles.buttonContainer} onPress={() => nav.navigate("TurboParts")}>
                        <View style={styles.circle}></View>
                        <Text style={styles.buttonText}>Partes de turbos</Text>
                      </TouchableOpacity>
                      <View style={styles.divider}></View>
                      <TouchableOpacity style={styles.buttonContainer} onPress={() => nav.navigate("OtherProducts")}>
                        <View style={styles.circle}></View>
                        <Text style={styles.buttonText}>Otros productos</Text>
                      </TouchableOpacity>
                    </View>
                  <Text style={{fontSize:22,fontWeight:700, marginTop:10}}>Cuenta</Text>
                    <View>
                    {!user ? (
                      <View style={{justifyContent: 'space-between', gap:10, marginTop:5}}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => nav.navigate("Login")}>
                          <View style={styles.circle}></View>
                          <Text style={styles.buttonText}>Iniciar sesión</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={{justifyContent: 'space-between', marginTop:5}}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => nav.navigate("OrderStatus")}>
                          <View style={styles.circle}></View>
                          <Text style={styles.buttonText}>Estado de pedidos</Text>
                        </TouchableOpacity>
                        <View style={styles.divider}></View>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => nav.navigate("AccountCondition")}>
                          <View style={styles.circle}></View>
                          <Text style={styles.buttonText}>Cuenta corriente</Text>
                        </TouchableOpacity>
                        <View style={styles.divider}></View>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => nav.navigate("UserData")}>
                          <View style={styles.circle}></View>
                          <Text style={styles.buttonText}>Mis datos</Text>
                        </TouchableOpacity>
                        <View style={styles.divider}></View>
                        <TouchableOpacity style={styles.buttonContainer} onPress={logoutSesion}>
                          <View style={styles.circle}></View>
                          <Text style={styles.buttonText}>Cerrar sesión</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    </View>
                </View>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = {
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#001f36',
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
};

export default Header;
