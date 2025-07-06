
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

const History = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="RestRoom"
        subtitle="History"
        showLogout={true}
        onLogout={() => window.location.href = '/'}
      />
      
      <div className="p-4 pb-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No History Yet</h3>
          <p className="text-muted-foreground text-sm max-w-sm">
            Your booking history will appear here once you start making seat requests.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default History;
