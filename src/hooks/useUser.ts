import { useState } from "react";
import { useStorage } from "./useStorage";
import { User } from "../types/UserTypes";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const { setItem, removeItem } = useStorage();

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", user);
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
  };

  return { user, addUser, removeUser };
};
