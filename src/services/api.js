import axios from "axios";
import urlMetadata from "url-metadata";

export const api = axios.create({
  baseURL: "https://linkr-driven-api.herokuapp.com"
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

export const getPostsByFollows = async (id, page) => {
  const userPosts = await api.get(`/timeline/${id}?page=${page}`);
  return userPosts;
}

export const getMetadata = async (link) => {
  const urlMeta = await urlMetadata(link);
  return urlMeta;
}

export const getPosts = async (id, page) => {
  const userPosts = await api.get(`/users/${id}?page=${page}`);
  return userPosts;
}

export const getSearch = async (name) => {
  const searchUser = await api.get(`/search/${name}`);
  return searchUser
}

export const getUserName = async (id) => {
  const user = await api.get(`/profile/${id}`);
  return user;
}

export const getPostsByHashtag = async (hashtag, page) => {
  const posts = await api.get(`/hashtag/${hashtag}?page=${page}`);
  return posts;
};

export const getHashtagsByQuantity = async () => {
  const posts = await api.get(`/hashtag`);
  return posts;
};

export const getLikes = async (postId) => {
  const likes = await api.get(`/likes/${postId}`);
  return likes;
}

export const addOrRemoveLike = async (userId, postId) => {
  const toogleLike = await api.patch(`/likes/${postId}`, { userId });
  return toogleLike;
}
export const updatePost = async (id, description) => {
  await api.put(`/post/${id}`, { description })
}

export const deletePost = async (id) => {
  await api.delete(`/post/${id}`)
}

export const getCommentByPostId = async (postId) => {
  const comments = await api.get(`/comments/${postId}`);
  return comments;
}

export const postComment = async (postId, comment) => {
  await api.post(`/comments/${postId}`, { comment });
}
export const getFollow = async (loggedUserId, id) => {
  const checkFollow = await api.get(`/follows/${loggedUserId}/${id}`);
  return checkFollow;
}

export const postFollow = async (object) => {
  await api.post("/follows/", object);
}

export const deleteFollow = async (loggedUserId, id) => {

  await api.delete(`/follows/${loggedUserId}/${id}`);
}

export const getFollowersById = async (name, loggedUserId) => {
  const followers = await api.get(`/follows/search/${name}/${loggedUserId}`);
  return followers;
}

export const getRePosts = async (postId) => {
  const count = await api.get(`/rePost/${postId}`)
  return count;
}

export const makeRePost = async (postId) => {
  const insertRePost = await api.post(`/rePost/${postId}`);
  return insertRePost;
}

export const getNewPostsByFollows = async (time) => {
  const newPosts = await api.post(`/new`, { time });
  return newPosts;
}

