
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

interface HistoryRequest {
  id: string;
  shopName: string;
  requestTime: string;
  status: 'pending' | 'accepted' | 'declined';
  address: string;
}

const History = () => {
  const [requests] = useState<HistoryRequest[]>([
    // This will be populated when user clicks "Request Seat" button
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="RestRoom"
        subtitle="History"
        showLogout={true}
        onLogout={() => window.location.href = '/'}
      />
      
      <div className="p-4 pb-20">
        {requests.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Requests</h3>
            {requests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{request.shopName}</h4>
                    <Badge 
                      variant={request.status === 'accepted' ? 'default' : 
                              request.status === 'pending' ? 'secondary' : 'destructive'}
                    >
                      {request.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" />
                    <span>{request.address}</span>
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
              Your booking history will appear here once you start making seat requests.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default History;
