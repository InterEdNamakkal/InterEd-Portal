import React, { useState } from 'react';
import { Redirect } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Check } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

export default function AuthPage() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('login');

  // If user is already logged in, redirect to dashboard
  if (user && !isLoading) {
    return <Redirect to="/" />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Auth Form Section */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">InterEd Portal</h1>
            <p className="text-gray-500 mt-2">Student Recruitment Management</p>
          </div>
          
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="border rounded-md">
            <TabsList className="w-full grid grid-cols-2 bg-gray-100 rounded-t-md p-0 h-auto">
              <TabsTrigger 
                value="login" 
                className={`py-3 rounded-none border-r ${activeTab === 'login' ? 'border-b-0' : 'border-b'}`}
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className={`py-3 rounded-none ${activeTab === 'register' ? 'border-b-0' : 'border-b'}`}
              >
                Register
              </TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="login" className="m-0 pt-4">
                <h2 className="text-xl font-medium mb-4">Sign In</h2>
                <p className="text-gray-500 text-sm mb-6">Enter your credentials to access your account</p>
                <LoginForm />
                <div className="mt-4 text-center text-sm">
                  <span className="text-gray-500">Don't have an account? </span>
                  <button 
                    onClick={() => setActiveTab('register')} 
                    className="text-blue-600 hover:underline"
                  >
                    Register
                  </button>
                </div>
              </TabsContent>
              
              <TabsContent value="register" className="m-0 pt-4">
                <h2 className="text-xl font-medium mb-4">Create an Account</h2>
                <p className="text-gray-500 text-sm mb-6">Fill in your details to register</p>
                <RegisterForm />
                <div className="mt-4 text-center text-sm">
                  <span className="text-gray-500">Already have an account? </span>
                  <button 
                    onClick={() => setActiveTab('login')} 
                    className="text-blue-600 hover:underline"
                  >
                    Login
                  </button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-500 items-center justify-center p-8">
        <div className="max-w-xl text-white">
          <h2 className="text-4xl font-bold mb-4">InterEd Student Recruitment Platform</h2>
          <p className="text-xl mb-8">
            A comprehensive solution for educational institutions to manage their student recruitment process, from lead generation to enrollment and beyond.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Check className="h-6 w-6 mr-2 flex-shrink-0 mt-0.5" />
              <span>Centralized student data management</span>
            </li>
            <li className="flex items-start">
              <Check className="h-6 w-6 mr-2 flex-shrink-0 mt-0.5" />
              <span>Streamlined application processing</span>
            </li>
            <li className="flex items-start">
              <Check className="h-6 w-6 mr-2 flex-shrink-0 mt-0.5" />
              <span>Agent and partner relationship management</span>
            </li>
            <li className="flex items-start">
              <Check className="h-6 w-6 mr-2 flex-shrink-0 mt-0.5" />
              <span>Advanced analytics and reporting</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}