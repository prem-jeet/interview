import API from "./axiosConfig";

const api = API();

export const getProducts = async () => {
  try {
    const response = await api.get("/index");
    const data = response.data;
    if (data.success) {
      return data.data.product_list;
    } else {
      return data.error;
    }
  } catch (err) {
    return [];
  }
};

export const createProduct = async (DATA) => {
  try {
    const response = await api.post("/create", DATA);
    const data = response.data;
    console.log(data);
    if (data.success) {
      return data.data.product;
    } else {
      return {};
    }
  } catch (err) {
    return {};
  }
};

export const updateProduct = async (id, DATA) => {
  try {
    const response = await api.patch(`/update/${id}`, DATA);
    const data = response.data;
    console.log(data);
  } catch (err) {
    return null;
  }
};
