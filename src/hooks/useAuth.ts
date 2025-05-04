import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("user");
  });

  const login = (username: string) => {
    setUser(username);
    localStorage.setItem("user", username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, login, logout };
}
