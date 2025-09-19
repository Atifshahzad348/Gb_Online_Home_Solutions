import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './auth';

const CategoryServicesContext = createContext();

export const useCategoryServices = () => {
  const context = useContext(CategoryServicesContext);
  if (!context) {
    throw new Error('useCategoryServices must be used within a CategoryServicesProvider');
  }
  return context;
};

export const CategoryServicesProvider = ({ children }) => {
  const [categoryServices, setCategoryServices] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchServices } = useAuth();

  const getServicesByCategory = async (category) => {
    if (categoryServices[category]) {
      return categoryServices[category]; // Return cached services
    }

    setLoading(true);
    setError(null);
    try {
      const allServices = await fetchServices();
      const filteredServices = allServices.filter(service => 
        service.category === category
      );
      
      setCategoryServices(prev => ({
        ...prev,
        [category]: filteredServices
      }));
      
      return filteredServices;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    categoryServices,
    loading,
    error,
    getServicesByCategory
  };

  return (
    <CategoryServicesContext.Provider value={value}>
      {children}
    </CategoryServicesContext.Provider>
  );
};