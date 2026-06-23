import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export const getCompanies = (params) => API.get('/companies', { params });
export const getCompany = (id) => API.get(`/companies/${id}`);
export const getIndustries = () => API.get('/companies/industries');
export const createCompany = (data) => API.post('/companies', data);
export const updateCompany = (id, data) => API.put(`/companies/${id}`, data);
export const deleteCompany = (id) => API.delete(`/companies/${id}`);

export default API;
