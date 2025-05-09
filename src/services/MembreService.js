import axios from 'axios';
import { api_url } from './config';

const API_MEMBRE_URL = `${api_url}/membres`; // adapte selon ton serveur

export const getMembres = () => axios.get(API_MEMBRE_URL);
export const createMembre = (data) => axios.post(API_MEMBRE_URL, data);
export const updateMembre = (id, data) => axios.put(`${API_MEMBRE_URL}/${id}`, data);
export const deleteMembre = (id) => axios.delete(`${API_MEMBRE_URL}/${id}`);
