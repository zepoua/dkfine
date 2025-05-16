import axios from 'axios';
import { api_url } from './config';

const API_URL = `${api_url}/remboursements`; // adapte selon ton serveur
const API_URL2 = `${api_url}/dossier_rem`; // adapte selon ton serveur

export const getRemboursements = () => axios.get(API_URL);
export const getDossiers = () => axios.get(API_URL2);
export const createRemboursement = (data) => axios.post(API_URL, data);
export const updateRemboursement = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteRemboursement = (id) => axios.delete(`${API_URL}/${id}`);

