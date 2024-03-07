// CatalogContext.js
import React, { createContext, useContext, useEffect } from 'react';

const CatalogContext = createContext();

const CatalogProvider = ({ children }) => {

  const loadCatalog = async () => {
    // Simulamos una carga de catálogo con un timeout
    console.log('Cargando catálogo...');
  };

  useEffect(() => {
    // Puedes realizar acciones adicionales cuando se carga el componente.
  }, []);

  const contextValue = {
    loadCatalog,
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
