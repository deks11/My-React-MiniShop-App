import { createContext, useContext, useState } from "react";

import {
  registerUser,
  loginUser,
} from "../services/authService";

const AuthContext = createContext();


// =================================
// AUTH PROVIDER
// =================================

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;

  });


  // REGISTER

  const register = async (userData) => {

    const newUser = await registerUser(userData);

    setUser(newUser);

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );

    return newUser;

  };


  // LOGIN

  const login = async (email, password) => {

    const loggedUser = await loginUser(email, password);

    setUser(loggedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(loggedUser)
    );

    return loggedUser;

  };


  // LOGOUT

  const logout = () => {

    setUser(null);

    localStorage.removeItem("user");

  };


  return (

    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}


// =================================
// CUSTOM HOOK
// =================================

export function useAuth() {

  return useContext(AuthContext);

}