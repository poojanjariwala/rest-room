
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, Wifi, Zap, Car, Coffee, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";
import techCafe from "@/assets/tech-cafe.jpg";

const amenityIcons = {
  AC: Zap,
  WiFi: Wifi,
  Parking: Car,
  Food: Coffee,
  Charging: Zap,
  Washroom: User
};

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState([
    {
      id: 1,
      customerName: "John Doe",
      requestTime: "2 mins ago",
      status: "pending"
    },
    {
      id: 2,
      customerName: "Jane Smith",
      requestTime: "5 mins ago", 
      status: "pending"
    }
  ]);

  const shop = {
    name: "Tech Hub Cafe",
    address: "Ring Road, Surat",
    rating: 4.3,
    reviews: 156,
    amenities: ["AC", "WiFi", "Charging", "Food"],
    image: techCafe
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleAccept = (requestId: number) => {
    setRequests(requests.filter(req => req.id !== requestId));
    toast({
      title: "Request Accepted",
      description: "Customer has been notified about the seat approval.",
    });
  };

  const handleDecline = (requestId: number) => {
    setRequests(requests.filter(req => req.id !== requestId));
    toast({
      title: "Request Declined",
      description: "Request has been declined.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="RestStop"
        subtitle="Shop Owner"
        showLogout={true}
        onLogout={handleLogout}
        logoHeight="h-12 w-12"
      />

      <div className="p-4 space-y-6 pb-20">
        {/* Shop Info Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={shop.image} 
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{shop.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3" />
                  <span>{shop.address}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{shop.rating} ({shop.reviews} reviews)</span>
                </div>
                
                {/* Amenities */}
                <div className="flex items-center gap-2 flex-wrap">
                  {shop.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                    return (
                      <Badge key={amenity} variant="outline" className="text-xs flex items-center gap-1">
                        <Icon className="h-3 w-3" />
                        {amenity}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Requests */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Requests</h3>
          {requests.length > 0 ? (
            <div className="space-y-3">
              {requests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{request.customerName}</h4>
                        <p className="text-sm text-muted-foreground">{request.requestTime}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDecline(request.id)}
                        >
                          Decline
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleAccept(request.id)}
                        >
                          Accept
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No pending requests</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <BottomNav isOwner={true} />
    </div>
  );
};

export default OwnerDashboard;
