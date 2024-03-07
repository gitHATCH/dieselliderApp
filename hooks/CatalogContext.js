import React, { createContext, useContext, useEffect, useState } from 'react';

const CatalogContext = createContext();

const CatalogProvider = ({ children }) => {

  const [catalog, setCatalog] = useState(null)

  const loadCatalog = async () => {
    setTimeout(() => {
      setCatalog({})
    }, 2000);
  };

  const contextValue = {
    loadCatalog,
    catalog
  };

  return (
    <CatalogContext.Provider value={contextValue}>
      {children}
    </CatalogContext.Provider>
  );
};

const useCatalogContext = () => {
  return useContext(CatalogContext);
};

export { CatalogProvider, useCatalogContext };
