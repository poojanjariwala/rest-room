import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Clock, CheckCircle, XCircle, Circle, Users, AlertCircle } from "lucide-react";

interface SeatRequest {
  id: string;
  status: string;
  requested_at: string;
  customer_id: string;
  profiles: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

interface Shop {
  id: string;
  name: string;
  description: string;
  address: string;
  photo_url: string;
  total_seats: number;
}

const OwnerDashboard = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<SeatRequest[]>([]);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShopData();
  }, []);

  const fetchShopData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch owner's shop
      const { data: shopData, error: shopError } = await supabase
        .from('shops')
        .select('*')
        .eq('owner_id', user.id)
        .single();

      if (shopError) throw shopError;
      setShop(shopData);

      // Fetch pending requests for this shop
      const { data: requestsData, error: requestsError } = await supabase
        .from('seat_requests')
        .select(`
          *,
          profiles (
            first_name,
            last_name,
            email,
            phone
          )
        `)
        .eq('shop_id', shopData.id)
        .eq('status', 'pending')
        .order('requested_at', { ascending: false });

      if (requestsError) throw requestsError;
      setRequests(requestsData || []);
    } catch (error) {
      console.error('Error fetching shop data:', error);
      toast({
        title: "Error loading dashboard",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      const { error } = await supabase
        .from('seat_requests')
        .update({
          status: action === 'approve' ? 'approved' : 'rejected',
          approved_at: action === 'approve' ? new Date().toISOString() : null,
        })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: `Request ${action === 'approve' ? 'approved' : 'rejected'}`,
        description: `The seat request has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
      });

      await fetchShopData();
    } catch (error) {
      console.error('Error updating request:', error);
      toast({
        title: "Error updating request",
        description: "Please try again later.",
        variant: "destructive",
      });
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
        <DesktopSidebar isOwner />
        <div className="flex flex-col flex-1">
          <Header title="Dashboard" />
          <div className="flex items-center justify-center flex-1">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
        <BottomNav isOwner />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DesktopSidebar isOwner />
      <div className="flex flex-col flex-1">
        <Header title="Dashboard" />
        <main className="flex-1 overflow-auto p-6 pb-20 md:pb-6">
          <div className="space-y-6">

        {/* Shop Overview */}
        {shop && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {shop.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <img
                  src={shop.photo_url || "/placeholder.svg"}
                  alt={shop.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{shop.address}</span>
                  </div>
                  {shop.description && (
                    <p className="text-sm text-muted-foreground mb-2">{shop.description}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {shop.total_seats} Total Seats
                    </Badge>
                    <Badge variant="outline">
                      {requests.length} Pending Requests
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pending Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Pending Requests ({requests.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {requests.length > 0 ? (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">
                          {request.profiles.first_name} {request.profiles.last_name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{request.profiles.email}</p>
                        {request.profiles.phone && (
                          <p className="text-sm text-muted-foreground">{request.profiles.phone}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(request.requested_at)}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleRequestAction(request.id, 'approve')}
                        className="bg-success hover:bg-success/90"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRequestAction(request.id, 'reject')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Circle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No pending requests</p>
              </div>
            )}
          </CardContent>
        </Card>
          </div>
        </main>
      </div>
      <BottomNav isOwner />
    </div>
  );
};

export default OwnerDashboard;