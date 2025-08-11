import api from "./api";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const register = async (username: string, email: string, password: string) => {
  const res = await api.post("/auth/register", { username, email, password });
  return res.data;
};
