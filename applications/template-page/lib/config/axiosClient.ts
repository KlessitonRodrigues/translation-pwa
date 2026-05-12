import axios from 'axios';

import dotenv from '../constants/dotenv';

export const translationApiClient = axios.create({
  baseURL: dotenv.TRANSLATION_API_URL,
  headers: { 'Content-Type': 'application/json', lang: 'pt' },
});
