import axios from 'axios';
export const url = process.env.REACT_APP_API_URL || 'http://localhost:5000' ;
const API = axios.create({ baseURL: url });

export const uploadImage = (endpoint, image) => API.post(endpoint, image,{})
export const postData = (endpoint,formData) => API.post(endpoint, formData);
export const getData = (endpoint) => API.get(endpoint);