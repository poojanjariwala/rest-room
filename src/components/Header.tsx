
import { LogOut, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showLogout?: boolean;
  onLogout?: () => void;
  logoHeight?: string;
}

export const Header = ({ title, subtitle, showLogout = false, onLogout, logoHeight = "w-6 h-12" }: HeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-primary to-accent text-white">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center p-2 shadow-lg">
              <img 
                src="/lovable-uploads/23b453e4-446a-4f0b-adec-4130e91c2bfa.png" 
                alt="RestRoom Logo" 
                className={logoHeight}
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{title}</h1>
              {subtitle && (
                <div className="flex items-center gap-1 opacity-90">
                  <MapPin className="h-3 w-3" />
                  <span className="text-sm">{subtitle}</span>
                </div>
              )}
            </div>
          </div>
          
          {showLogout && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onLogout}
              className="text-white hover:bg-white/20"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
