import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Wifi, Zap, Coffee, Car, Star, Users } from "lucide-react";

interface Shop {
  id: string;
  name: string;
  description: string;
  address: string;
  photo_url: string;
  wifi_available: boolean;
  power_outlets: boolean;
  food_available: boolean;
  parking_available: boolean;
  total_seats: number;
}

interface SeatRequest {
  id: string;
  customer_id: string;
  status: string;
  requested_at: string;
  notes: string;
  profiles: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shop, setShop] = useState<Shop | null>(null);
  const [requests, setRequests] = useState<SeatRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOwnerData();
  }, []);

  const fetchOwnerData = async () => {
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

      // Fetch seat requests for the shop
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
      console.error('Error fetching owner data:', error);
      toast({
        title: "Error loading data",
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

      await fetchOwnerData();
    } catch (error) {
      console.error('Error updating request:', error);
      toast({
        title: "Error updating request",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const renderAmenities = (shop: Shop) => {
    const amenities = [];
    if (shop.wifi_available) amenities.push({ icon: Wifi, label: "WiFi" });
    if (shop.power_outlets) amenities.push({ icon: Zap, label: "Charging" });
    if (shop.food_available) amenities.push({ icon: Coffee, label: "Food" });
    if (shop.parking_available) amenities.push({ icon: Car, label: "Parking" });

    return amenities;
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <Header title="RestStop" subtitle="Shop Owner" showLogo={true} isOwner={true} />
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
        <BottomNav isOwner={true} />
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <Header title="RestStop" subtitle="Shop Owner" showLogo={true} isOwner={true} />
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">No shop found</p>
            <Button onClick={() => navigate("/owner/account")}>
              Set Up Shop
            </Button>
          </div>
        </div>
        <BottomNav isOwner={true} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header title="RestStop" subtitle="Shop Owner" showLogo={true} isOwner={true} />
      
      <div className="flex-1 overflow-auto pb-20">
        {/* Shop Details */}
        <div className="p-4 bg-white border-b border-gray-100">
          <div className="flex space-x-3">
            {/* Shop Image */}
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={shop.photo_url || "/placeholder.svg"}
                alt={shop.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Shop Details */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900">{shop.name}</h3>
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">{shop.address}</span>
              </div>
              
              {/* Rating and Reviews */}
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.3 (156 reviews)</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex items-center space-x-3 mt-2">
                {renderAmenities(shop).map((amenity, idx) => (
                  <div key={idx} className="flex items-center space-x-1">
                    <amenity.icon className="h-4 w-4 text-gray-600" />
                    <span className="text-xs text-gray-600">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Requests Section */}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Requests</h2>
          
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No pending requests</p>
              <p className="text-gray-400 text-sm mt-2">
                Customer requests will appear here when they request seats at your shop.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((request) => (
                <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {request.profiles?.first_name} {request.profiles?.last_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(request.requested_at).toLocaleString()}
                      </p>
                      {request.profiles?.email && (
                        <p className="text-sm text-gray-600">{request.profiles.email}</p>
                      )}
                      {request.notes && (
                        <p className="text-sm text-gray-600 mt-1">{request.notes}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRequestAction(request.id, 'reject')}
                      >
                        Decline
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleRequestAction(request.id, 'approve')}
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav isOwner={true} />
    </div>
  );
};

export default OwnerDashboard;