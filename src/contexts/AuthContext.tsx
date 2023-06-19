import React, { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { User } from "../hooks/useUser";

type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  login: (token: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type ProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: ProviderProps) => {
  const { user, isAuthenticated, authLoading, login, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, authLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useUserAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext, AuthProvider, useUserAuth };
