import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api, makeSignIn } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(recoveredUser);
      api.defaults.headers.Authorization = `Bearer ${recoveredUser}`;
    }

    setLoading(false);
  }, []);

  const login = async (email, password, isLoading, setIsLoading) => {
    const formData = {
      email: email,
      password: password,
    };
    try {
      const response = await makeSignIn(formData);
      console.log(response);

      const loggedUser = response.data;
      localStorage.setItem("user", loggedUser);

      api.defaults.headers.Authorization = `Bearer ${loggedUser}`;

      setUser(loggedUser);
      navigate("/");
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
