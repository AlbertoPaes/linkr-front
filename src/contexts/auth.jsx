import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api, makeSignIn } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const recoveredUser = localStorage.getItem("user");

  if (recoveredUser) {
    api.defaults.headers.Authorization = `Bearer ${recoveredUser}`;
  }

  useEffect(() => {
    if (recoveredUser) {
      setUser(recoveredUser);
    }

    setLoading(false);
  }, [recoveredUser]);

  const login = async (email, password, id, isLoading, setIsLoading) => {
    const formData = {
      email: email,
      password: password,
      id: id
    };
    try {
      const response = await makeSignIn(formData);

      const loggedUser = response.data.token;
      const userImage = response.data.image;
      const loggedUserId = response.data.id;

      localStorage.setItem("user", loggedUser);
      localStorage.setItem("image", userImage);
      localStorage.setItem("id", loggedUserId)

      api.defaults.headers.Authorization = `Bearer ${loggedUser}`;

      setUser(loggedUser);
      navigate("/timeline");
    } catch {
      alert("User not registered, make your registration!");
      isLoading.placeholder = "Entrar";
      isLoading.disabled = false;
      setIsLoading({ ...isLoading });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");

    api.defaults.headers.Authorization = null;

    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
