import axios from "axios";
import urlMetadata from "url-metadata";

export const api = axios.create({
  /*Fix me: Ao criar uma nova instância do axios, a baseURL não está aceitando a variável de ambiente. */
  // baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  // baseURL: "https://linkr-driven-api.herokuapp.com",
  baseURL: "http://localhost:4000"
});

export const makeSignUp = async (formData) => {
  await api.post("/signup", formData);
};

export const makeSignIn = async (formData) => {
  const token = await api.post("/", formData);
  return token;
};

export const publishPost = async (formData) => {
  await api.post("/timeline", formData)
};

export const getAllPosts = async () => {
  const posts = await api.get("/timeline");
  return posts;
};

export const getMetadata = async (link) => {
  const urlMeta = await urlMetadata(link);
  return urlMeta;
}