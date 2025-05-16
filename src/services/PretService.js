import axios from 'axios';
import { api_url } from './config';

const API_URL = `${api_url}/prets`; // adapte selon ton serveur
const API_URL2 = `${api_url}/dossiers`;

export const getPrets = () => axios.get(API_URL);
export const getDossiers = () => axios.get(API_URL2);
export const createPret = (data) => axios.post(API_URL, data);
export const updatePret = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deletePret = (id) => axios.delete(`${API_URL}/${id}`);

