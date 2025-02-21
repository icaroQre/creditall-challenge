import api from "./api";

const endpoint = "/products";

export const getProducts = async () => {
  const response = await api.get(endpoint);
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await api
    .get(`${endpoint}/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error;
    });
  return response.data;
};

export const createProduct = async (data: object) => {
  const response = await api
    .post(endpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Define apenas para essa requisição
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data.error;
    });
  return response.data;
};

export const updateProduct = async (id: number, data: FormData) => {
  try {
    const response = await api.put(`${endpoint}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Define apenas para essa requisição
      },
    });

    return response.data;
  } catch (error) {
    throw error || "Erro desconhecido ao atualizar o produto.";
  }
};

export const deleteProduct = async (id: number) => {
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
