import { api } from 'src/utils/api';

export async function signupUser({ name, email, password, role }) {
  const response = await api.post('/users', { name, email, password, role });
  return response.data;
}

export async function loginUser({ email, password }) {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
}

export async function getProfile() {
  const response = await api.get('/users/profile');
  return response.data;
}

export async function logoutUser() {
  const response = await api.post('/auth/logout', undefined, {
    validateStatus: (status) => status < 500,
  });
  return response.data;
}
