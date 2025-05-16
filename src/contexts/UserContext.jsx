// src/contexts/UserContext.jsx
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { api_url } from '../services/config';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [membres, setMembres] = useState([]);
  const [microfinance, setMicrofinance] = useState();

  // Charger l'utilisateur depuis le localStorage au chargement
  useEffect(() => {  
    fetchMembres();
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchMembres = async () => {
    try {
      const res = await axios.get(`${api_url}/membres`);
      setMembres(res.data);
      const res1 = await axios.get(`${api_url}/microfinance`);
      setMicrofinance(res1.data);        
    } catch (error) {
      console.error('Erreur lors de la récupération des membres:', error);
    }
  };
  
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, microfinance, login, logout, setUser, membres, setMembres, setMicrofinance, fetchMembres }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useUser = () => useContext(UserContext);
