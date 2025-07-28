import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthUser, UserRole } from "../types";

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: Record<string, AuthUser & { password: string }> = {
  "super@admin.com": {
    id: "1",
    email: "super@admin.com",
    firstName: "Super",
    lastName: "Admin",
    role: "super_admin",
    password: "admin123",
  },
  "admin@kingdomheritage.edu": {
    id: "2",
    email: "admin@kingdomheritage.edu",
    firstName: "John",
    lastName: "Smith",
    role: "school_admin",
    schoolId: "school-1",
    password: "admin123",
  },
  "admin@YOUNIK.edu": {
    id: "3",
    email: "admin@YOUNIK.edu",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "school_admin",
    schoolId: "school-2",
    password: "admin123",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (email: string, password: string) => {
    const mockUser = mockUsers[email];
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userData } = mockUser;
      setUser(userData);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
