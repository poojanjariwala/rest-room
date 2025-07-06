
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Store } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleCustomerLogin = () => {
    navigate('/auth?type=customer');
  };

  const handleOwnerLogin = () => {
    navigate('/auth?type=owner');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Welcome */}
        <div className="text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <img 
              src="/lovable-uploads/23b453e4-446a-4f0b-adec-4130e91c2bfa.png" 
              alt="RestRoom Logo" 
              className="w-12 h-12"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to RestRoom</h1>
          <p className="text-gray-600">Choose your login type</p>
        </div>

        {/* Login Options */}
        <div className="space-y-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleCustomerLogin}>
            <CardContent className="p-6 text-center">
              <User className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Customer</h3>
              <p className="text-gray-600 text-sm">Find and book seats at local shops</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleOwnerLogin}>
            <CardContent className="p-6 text-center">
              <Store className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Shop Owner</h3>
              <p className="text-gray-600 text-sm">Manage your shop and customer requests</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
