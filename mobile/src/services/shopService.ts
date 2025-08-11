import api from "./api";

export const fetchShops = async () => {
  const res = await api.get("/shops");
  return res.data;
};
