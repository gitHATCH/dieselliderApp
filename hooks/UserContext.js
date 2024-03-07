import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  const login = async (username,password,idType) => {
    setUser("saf")
    console.log(username,password,idType);
  };

  const contextValue = {
    login,
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
