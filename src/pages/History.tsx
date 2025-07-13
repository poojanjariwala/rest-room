
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
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
      <div className="flex flex-col h-screen bg-white">
        <Header title="RestRoom" subtitle="History" showLogo={true} />
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header title="RestRoom" subtitle="History" showLogo={true} />
      
      <div className="flex-1 overflow-auto pb-20">
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No History Yet</p>
            <p className="text-gray-400 text-sm mt-2 text-center px-8">
              Your booking history will appear here once you start making seat requests.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex space-x-3">
                  <img
                    src={request.shops.photo_url || "/placeholder.svg"}
                    alt={request.shops.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{request.shops.name}</h3>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span className="text-sm">{request.shops.address}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {formatDate(request.requested_at)}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${
                        request.status === 'approved' || request.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : request.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default History;
