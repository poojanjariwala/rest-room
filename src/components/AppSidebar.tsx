import { Home, History, User, LogOut, MapPin } from "lucide-react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  isOwner?: boolean;
  onLogout?: () => void;
  userEmail?: string;
}

const customerNavItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/home' },
  { id: 'history', label: 'History', icon: History, path: '/history' },
  { id: 'account', label: 'Account', icon: User, path: '/account' },
];

const ownerNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/owner-dashboard' },
  { id: 'history', label: 'History', icon: History, path: '/owner-history' },
  { id: 'account', label: 'Account', icon: User, path: '/owner-account' },
];

export function AppSidebar({ isOwner = false, onLogout, userEmail }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const items = isOwner ? ownerNavItems : customerNavItems;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-lg flex items-center justify-center p-1.5 shadow-lg">
            <img 
              src="/lovable-uploads/23b453e4-446a-4f0b-adec-4130e91c2bfa.png" 
              alt="LazySpot Logo" 
              className="w-8 h-8"
            />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">LazySpot</h1>
              <div className="flex items-center gap-1 text-sidebar-foreground/70">
                <MapPin className="h-3 w-3" />
                <span className="text-xs">Surat, Gujarat</span>
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.path} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {onLogout && (
          <div className="mt-auto p-4">
            <Button
              variant="ghost"
              onClick={onLogout}
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Logout</span>}
            </Button>
            {!collapsed && userEmail && (
              <p className="text-xs text-sidebar-foreground/70 mt-2 truncate">{userEmail}</p>
            )}
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}