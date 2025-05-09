import axios from 'axios';
import { api_url } from './config';

const API_URL = `${api_url}/retraits`; // adapte selon ton serveur
const API_URL2 = `${api_url}/cycles_cotisation`; // adapte selon ton serveur

export const getRetraits = () => axios.get(API_URL);
export const getCycles = (carnet_id) => axios.get(`${API_URL2}/${carnet_id}`);
export const createRetrait = (data) => axios.post(API_URL, data);
export const updateRetrait = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteRetrait = (id) => axios.delete(`${API_URL}/${id}`);

