
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { BottomNav } from "@/components/BottomNav";

const OwnerAccount = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <DesktopSidebar isOwner />
      <div className="flex flex-col flex-1">
        <Header title="Account Settings" />
        <main className="flex-1 overflow-auto p-6 pb-20 md:pb-6">
        {/* Profile Section */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-12 w-12 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Demo Owner</h2>
          <p className="text-muted-foreground">owner@example.com</p>
        </div>

        {/* Account Details */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Account Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">Demo Owner</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">owner@example.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Type:</span>
                <span className="font-medium">Shop Owner</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shop:</span>
                <span className="font-medium">Tech Hub Cafe</span>
              </div>
            </div>
          </CardContent>
        </Card>
        </main>
      </div>
      <BottomNav isOwner />
    </div>
  );
};

export default OwnerAccount;
