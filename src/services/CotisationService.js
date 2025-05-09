import axios from 'axios';
import { api_url } from './config';

const API_URL = `${api_url}/cotisations`; // adapte selon ton serveur
const API_URL2 = `${api_url}/carnets_membre`; // adapte selon ton serveur

export const getCotisations = () => axios.get(API_URL);
export const getCarnets = (membre_id) => axios.get(`${API_URL2}/${membre_id}`);
export const createCotisation = (data) => axios.post(API_URL, data);
export const updateCotisation = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCotisation = (id) => axios.delete(`${API_URL}/${id}`);

