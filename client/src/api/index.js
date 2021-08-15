import axios from 'axios';
export const url = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API = axios.create({ baseURL: url });

export const uploadImage = async (endpoint, e) => {
    try {
        const fd = new FormData();
        fd.append('file', e.target.files[0]);
        return await API.post(endpoint, fd, {});
    } catch (error) {
        console.log(error);
    }
    
};
export const postData = (endpoint, formData) => API.post(endpoint, formData);
export const getData = (endpoint) => API.get(endpoint);
export const updateData = (endpoint, data) => API.patch(endpoint, data);