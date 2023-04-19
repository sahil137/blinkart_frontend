import { getAuthCredentials } from '@/utils/auth-utils';
import axios from 'axios';

const ROOT_URL = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

ROOT_URL.interceptors.request.use((req) => {
  const token = getAuthCredentials().token;
  req.headers.authorization = `${token}`;
  return req;
});

export const createUpdateUser = () =>
  ROOT_URL.post('/auth/create-or-update-user', {});
