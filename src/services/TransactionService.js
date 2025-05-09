import axios from 'axios';
import { api_url } from './config';

const API_URL = `${api_url}/transactions`; // adapte selon ton serveur
const API_URL2 = `${api_url}/comptes_membre`; // adapte selon ton serveur

export const getTransactions = () => axios.get(API_URL);
export const getComptes = (membre_id) => axios.get(`${API_URL2}/${membre_id}`);
export const createTransaction = (data) => axios.post(API_URL, data);
export const updateTransaction = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteTransaction = (id) => axios.delete(`${API_URL}/${id}`);

