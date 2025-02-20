import api from "./api";

const endpoint = "/clients";

export const getClients = async () => {
  const response = await api.get(endpoint);
  console.log(response.data);
  return response.data;
};

export const getClientById = async (id: number) => {
  const response = await api.get(`${endpoint}/${id}`);
  return response.data;
};

export const createClient = async (data: object) => {
  const response = await api.post(endpoint, data);
  return response.data;
};

export const updateClient = async (id: number, data: object) => {
  const response = await api.put(`${endpoint}/${id}`, data);
  return response.data;
};

export const deleteClient = async (id: number) => {
  const response = await api.delete(`${endpoint}/${id}`);
  return response.data;
};
