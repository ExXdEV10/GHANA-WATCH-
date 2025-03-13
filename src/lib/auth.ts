import React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  JSX,
} from "react";

interface User {
  id: string;
  username: string;
  name: string;
  role: string;
  avatar: string;
  email?: string;
  phone?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserProfile: (userData: Partial<User>) => void;
}

const defaultUser: User = {
  id: "user-001",
  username: "admin",
  name: "John Doe",
  role: "DVLA",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  email: "admin@example.com",
  phone: "+233 20 123 4567",
  department: "Road Safety Division",
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  updateUserProfile: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    // In a real app, this would make an API call to authenticate
    if (username === "admin" && password === "password123") {
      setUser(defaultUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(defaultUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { user, login, logout, isAuthenticated, updateUserProfile } },
    children,
  );
};
