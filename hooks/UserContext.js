import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])

  const login = async (username,password,idType) => {
    setUser("User")
  };

  const logout = async () => {
    setUser(null)
  }

  const addProduct = (product) => {
    setProducts([...products, product])
  }

  const removeProduct = (product) => {
    setProducts(products.filter(p => p.id !== product.id))
  }

  const isInProducts = (products) => {
    return products.some(p => p.id === product.id)
  }

  const clearProducts = () => {
    setProducts([])
  }

  const contextValue = {
    login,
    logout,
    user,
    isInProducts,
    addProduct,
    removeProduct,
    clearProducts,
    products
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
