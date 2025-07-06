
import { Home, History, User, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/home' },
  { id: 'history', label: 'History', icon: History, path: '/history' },
  { id: 'account', label: 'My Account', icon: User, path: '/account' },
];

const ownerNavItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/owner-dashboard' },
  { id: 'history', label: 'History', icon: History, path: '/owner-history' },
  { id: 'account', label: 'My Account', icon: User, path: '/owner-account' },
];

export const DesktopSidebar = ({ isOwner = false }: { isOwner?: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = isOwner ? ownerNavItems : navItems;

  return (
    <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-border">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 mb-8">
          <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-lg flex items-center justify-center p-3 shadow-lg mr-3">
            <img 
              src="/lovable-uploads/23b453e4-446a-4f0b-adec-4130e91c2bfa.png" 
              alt="RestRoom Logo" 
              className="w-10 h-10"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-primary">RestStop</h1>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="text-sm">Surat, Gujarat</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-2 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full transition-colors",
                  isActive 
                    ? "bg-primary text-white" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
