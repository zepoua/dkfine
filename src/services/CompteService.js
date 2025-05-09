import axios from 'axios';
import { api_url } from './config';

const API_URL = `${api_url}/comptes`;

export const getComptes = () => axios.get(API_URL);
export const createCompte = (data) => axios.post(API_URL, data);
export const updateCompte = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCompte = (id) => axios.delete(`${API_URL}/${id}`);
