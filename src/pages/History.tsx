
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Clock, CheckCircle, XCircle, Circle } from "lucide-react";

interface SeatRequest {
  id: string;
  status: string;
  requested_at: string;
  approved_at: string | null;
  completed_at: string | null;
  notes: string | null;
  shops: {
    name: string;
    address: string;
    photo_url: string;
  };
}

const History = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<SeatRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('seat_requests')
        .select(`
          *,
          shops (
            name,
            address,
            photo_url
          )
        `)
        .order('requested_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
      toast({
        title: "Error loading history",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'pending':
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'completed':
        return "bg-success text-success-foreground";
      case 'rejected':
        return "bg-destructive text-destructive-foreground";
      case 'pending':
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <DesktopSidebar />
        <div className="flex flex-col flex-1">
          <Header title="Request History" />
          <div className="flex items-center justify-center flex-1">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DesktopSidebar />
      <div className="flex flex-col flex-1">
        <Header title="Request History" />
        <main className="flex-1 overflow-auto p-6 pb-20 md:pb-6">
          <div className="space-y-6">

        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={request.shops.photo_url || "/placeholder.svg"}
                      alt={request.shops.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{request.shops.name}</CardTitle>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="text-sm">{request.shops.address}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(request.status)}
                    <Badge className={getStatusColor(request.status)}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Requested: {formatDate(request.requested_at)}</span>
                  </div>
                  
                  {request.approved_at && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4" />
                      <span>Approved: {formatDate(request.approved_at)}</span>
                    </div>
                  )}
                  
                  {request.completed_at && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4" />
                      <span>Completed: {formatDate(request.completed_at)}</span>
                    </div>
                  )}

                  {request.notes && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Notes:</p>
                      <p className="text-sm text-muted-foreground">{request.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {requests.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No seat requests yet</p>
            <p className="text-muted-foreground text-sm mt-2">
              Start by requesting a seat at one of our partner shops
            </p>
          </div>
        )}
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default History;
