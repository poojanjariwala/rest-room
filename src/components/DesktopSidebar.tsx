import { Home, History, User, Store, Clock, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DesktopSidebarProps {
  isOwner?: boolean;
}

export function DesktopSidebar({ isOwner = false }: DesktopSidebarProps) {
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
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="/lovable-uploads/23b453e4-446a-4f0b-adec-4130e91c2bfa.png"
                alt="LazySpot"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">LazySpot</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-primary/10 text-primary"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}