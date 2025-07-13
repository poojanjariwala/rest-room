
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { historyService, HistoryRequest } from "@/services/historyService";

const OwnerHistory = () => {
  const [requests, setRequests] = useState<HistoryRequest[]>([]);

  useEffect(() => {
    // Load owner history
    const ownerHistory = historyService.getOwnerHistory();
    setRequests(ownerHistory);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <DesktopSidebar isOwner />
      <div className="flex flex-col flex-1">
        <Header title="Request History" />
        <main className="flex-1 overflow-auto p-6 pb-20 md:pb-6">
        {requests.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Request History</h3>
            {requests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{request.customerName}</h4>
                    <Badge 
                      variant={request.status === 'accepted' ? 'default' : 
                              request.status === 'pending' ? 'secondary' : 'destructive'}
                    >
                      {request.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" />
                    <span>{request.shopName}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{request.requestTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No History Yet</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Your request history will appear here once you start processing customer requests.
            </p>
          </div>
        )}
        </main>
      </div>
      <BottomNav isOwner />
    </div>
  );
};

export default OwnerHistory;
