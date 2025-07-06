import { Clock } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";

const History = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="RestRoom"
        subtitle="Surat, Gujarat"
        showLogout={true}
      />

      <div className="p-4 pb-20">
        <h2 className="text-2xl font-semibold mb-6">Booking History</h2>
        
        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Clock className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
          <p className="text-muted-foreground">Your booking history will appear here</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default History;