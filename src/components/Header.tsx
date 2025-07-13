import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
  onProfileClick?: () => void;
  onNotificationClick?: () => void;
}

export function Header({ 
  title, 
  showNotifications = true, 
  onProfileClick,
  onNotificationClick 
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        
        <div className="flex items-center space-x-3">
          {showNotifications && (
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={onNotificationClick}
            >
              <Bell className="h-5 w-5" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={onProfileClick}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}