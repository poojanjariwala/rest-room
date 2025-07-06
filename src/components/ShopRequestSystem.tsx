
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Check, X } from "lucide-react";

interface ShopRequest {
  id: string;
  customerName: string;
  requestTime: string;
  status: 'pending' | 'accepted' | 'declined';
}

export const ShopRequestSystem = () => {
  const [requests, setRequests] = useState<ShopRequest[]>([
    {
      id: '1',
      customerName: 'John Doe',
      requestTime: '2 min ago',
      status: 'pending'
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      requestTime: '5 min ago',
      status: 'pending'
    }
  ]);

  const handleAccept = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'accepted' as const } : req
    ));
  };

  const handleDecline = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'declined' as const } : req
    ));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Seat Requests</h3>
      {requests.map((request) => (
        <Card key={request.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{request.customerName}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{request.requestTime}</span>
                  </div>
                </div>
              </div>
              
              {request.status === 'pending' && (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleAccept(request.id)}
                    className="bg-success hover:bg-success/90"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDecline(request.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                </div>
              )}
              
              {request.status !== 'pending' && (
                <Badge variant={request.status === 'accepted' ? 'default' : 'destructive'}>
                  {request.status}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
