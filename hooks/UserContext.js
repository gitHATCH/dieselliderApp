import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  const login = async (username,password,idType) => {
    setUser("User")
  };

  const logout = async () => {
    setUser(null)
  }

  const contextValue = {
    login,
    logout,
    user
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
