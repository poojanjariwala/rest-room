import { LogOut, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  isOwner?: boolean;
}

export function Header({ 
  title, 
  subtitle,
  showLogo = false,
  isOwner = false
}: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="bg-blue-500 text-white px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showLogo && (
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <img
                src="/lovable-uploads/23b453e4-446a-4f0b-adec-4130e91c2bfa.png"
                alt="Logo"
                className="w-8 h-8"
              />
            </div>
          )}
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            {subtitle && (
              <div className="flex items-center space-x-1 text-blue-100">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{subtitle}</span>
              </div>
            )}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-blue-600 p-2"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-2">Logout</span>
        </Button>
      </div>
    </header>
  );
}