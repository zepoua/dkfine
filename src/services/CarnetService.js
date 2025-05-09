import axios from 'axios';
import { api_url } from './config';

const API_URL = `${api_url}/carnets`;

export const getCarnets = () => axios.get(API_URL);
export const createCarnet = (data) => axios.post(API_URL, data);
export const updateCarnet = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCarnet = (id) => axios.delete(`${API_URL}/${id}`);
