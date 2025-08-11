import api from "./api";

export const fetchItems = async () => {
  const res = await api.get("/items");
  return res.data;
};
