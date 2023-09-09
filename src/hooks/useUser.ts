import { useState } from "react";
import { useStorage } from "./useStorage";
import { User } from "../types/UserTypes";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [hasPaidSubscription, setHasPaidSubscription] =
    useState<boolean>(false);
  const { setItem, removeItem } = useStorage();

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", user);
    let hasPaidSubscription = user.subscription.type !== "free";
    setHasPaidSubscription(hasPaidSubscription);
    setItem("hasPaidSubscription", hasPaidSubscription);
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
    setHasPaidSubscription(false);
    removeItem("hasPaidSubscription");
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

  return { user, hasPaidSubscription, addUser, removeUser, setLevel };
};
