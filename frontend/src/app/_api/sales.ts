import api from "./api";

const endpoint = "/sales";

export const getSales = async () => {
  const response = await api.get(endpoint);
  return response.data;
};

export const getSaleById = async (id: number) => {
  const response = await api.get(`${endpoint}/${id}`);
  return response.data;
};

export const createSale = async (data: object) => {
  const response = await api
    .post(endpoint, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error;
    });
  return response.data;
};

export const updateSale = async (id: number, data: object) => {
  const response = await api.put(`${endpoint}/${id}`, data);
  return response.data;
};

export const deleteSale = async (id: number) => {
  const response = await api
    .delete(`${endpoint}/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error;
    });
  return response.data;
};
