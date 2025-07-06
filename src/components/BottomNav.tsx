
import { Home, History, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/home' },
  { id: 'history', label: 'History', icon: History, path: '/history' },
  { id: 'account', label: 'Account', icon: User, path: '/account' },
];

const ownerNavItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/owner-dashboard' },
  { id: 'history', label: 'History', icon: History, path: '/history' },
  { id: 'account', label: 'Account', icon: User, path: '/account' },
];

export const BottomNav = ({ isOwner = false }: { isOwner?: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = isOwner ? ownerNavItems : navItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
      <div className="flex">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex-1 py-3 px-4 flex flex-col items-center gap-1 transition-colors rounded-t-lg",
                isActive 
                  ? "text-white bg-primary" 
                  : "text-muted-foreground hover:text-foreground bg-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
