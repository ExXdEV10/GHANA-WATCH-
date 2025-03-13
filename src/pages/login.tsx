import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (values: any) => {
    // Reset error state
    setError(null);
    setIsLoading(true);

    // In a real application, this would authenticate with a backend
    console.log("Login values:", values);

    try {
      const success = await login(values.username, values.password);
      if (success) {
        navigate("/");
      } else {
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      setIsLoading(false);
    }
  };

  const handleRegister = (values: any) => {
    // Reset error state
    setError(null);
    setIsLoading(true);

    // In a real application, this would register a new user with a backend
    console.log("Register values:", values);

    // Simulate successful registration
    setTimeout(() => {
      setIsLoading(false);
      // Switch to login tab after successful registration
      setActiveTab("login");
      // Show success message
      alert("Registration successful! Please login with your new credentials.");
    }, 1500);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full flex items-center justify-center">
      <Card className="w-[500px] p-6">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error}
            />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </Card>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
