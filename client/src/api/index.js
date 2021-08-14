import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const uploadImage = (endpoint, image) => API.post(endpoint, image,{})
export const postData = (endpoint,formData) => API.post(endpoint, formData);