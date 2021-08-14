import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const uploadImage = (endpoint, image) => API.post(endpoint, image,{})
export const postData = (endpoint,formData) => API.post(endpoint, formData);