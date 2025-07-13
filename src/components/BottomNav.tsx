import { Home, History, User, Store, Clock, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  isOwner?: boolean;
}

export function BottomNav({ isOwner = false }: BottomNavProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const customerItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: History, label: "History", path: "/history" },
    { icon: User, label: "Account", path: "/account" },
  ];

  const ownerItems = [
    { icon: Store, label: "Dashboard", path: "/owner/dashboard" },
    { icon: Clock, label: "History", path: "/owner/history" },
    { icon: Settings, label: "Account", path: "/owner/account" },
  ];

  const items = isOwner ? ownerItems : customerItems;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "flex-1 flex flex-col items-center py-2 px-1 text-xs",
                isActive && "bg-primary/10 text-primary"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5 mb-1" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}