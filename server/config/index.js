import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;

export const baseURL = `http://localhost:${PORT}`;

export const mongodb = process.env.CONNECTION_URL;