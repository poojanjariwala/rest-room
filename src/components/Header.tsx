
import { LogOut, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showLogout?: boolean;
  onLogout?: () => void;
  showStats?: boolean;
  stats?: {
    shops: number;
    availableSeats: number;
    totalSeats: number;
  };
}

export const Header = ({ title, subtitle, showLogout = false, onLogout, showStats = false, stats }: HeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-primary to-accent text-white">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">R</span>
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

      {showStats && stats && (
        <div className="px-4 pb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{stats.shops}</div>
              <div className="text-sm opacity-90">Shops</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.availableSeats}</div>
              <div className="text-sm opacity-90">Available Seats</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalSeats}</div>
              <div className="text-sm opacity-90">Total Seats</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
