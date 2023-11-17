"use client";
import React, { useContext, createContext, FC } from "react";

import { AuthProviderProps, AuthContextType } from "@/types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<AuthProviderProps> = async ({
  session,
  children,
}) => {
  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
