
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { useNavigate, useLocation } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOwner = location.pathname.includes('owner') || localStorage.getItem('userType') === 'owner';

  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="RestRoom"
        showLogout={true}
        onLogout={handleLogout}
      />

      <div className="p-4 pb-20">
        {/* Profile Section */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-12 w-12 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Demo User</h2>
          <p className="text-muted-foreground">demo@example.com</p>
        </div>

        {/* Account Details */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Account Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">Demo User</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">demo@example.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Type:</span>
                <span className="font-medium">{isOwner ? 'Shop Owner' : 'Customer'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav isOwner={isOwner} />
    </div>
  );
};

export default Account;
