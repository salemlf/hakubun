import { useState } from "react";
import { useStorage } from "./useStorage";

export interface User {
  username: string;
  level: number;
}

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

  // TODO: prob delete
  const setLevel = (level: number) => {
    if (user === null) {
      console.error("User is null!");
      return;
    }

    let updatedUser = user;
    updatedUser.level = level;
    setUser(updatedUser);
    setItem("user", updatedUser);
  };

  return { user, addUser, removeUser, setLevel };
};
