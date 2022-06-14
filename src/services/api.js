import axios from "axios";

export const api = axios.create({
  /*Fix me: Ao criar uma nova instância do axios, a baseURL não está aceitando a variável de ambiente. */
  // baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  baseURL: "https://linkr-driven-api.herokuapp.com",
  //baseURL: "http://localhost:3000",
});

export const makeSignUp = async (formData) => {
  await api.post("/signup", formData);
};

export const makeSignIn = async (formData) => {
  const token = await api.post("/signin", formData);
  return token;
};
