import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Wifi, Zap, Car, Coffee, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const amenityIcons = {
  AC: Zap,
  WiFi: Wifi,
  Parking: Car,
  Food: Coffee,
  Charging: Zap,
  Washroom: User
};

const shopData = {
  1: {
    name: "Tech Hub Cafe",
    address: "Ring Road, Surat",
    rating: 4.3,
    reviews: 156,
    totalSeats: 30,
    availableSeats: 25,
    occupiedSeats: 5,
    amenities: ["AC", "WiFi", "Charging", "Food"],
    hours: "8:00 AM - 11:00 PM",
    price: 50,
    seatLayout: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      available: i < 25
    }))
  }
};

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBooking, setIsBooking] = useState(false);
  
  const shop = shopData[Number(id) as keyof typeof shopData];
  
  if (!shop) {
    return <div>Shop not found</div>;
  }

  const handleBookRequest = () => {
    setIsBooking(true);
    // Simulate booking request
    setTimeout(() => {
      setIsBooking(false);
      // Navigate to payment or confirmation
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">{shop.name}</h1>
            <div className="text-sm opacity-90">Shop Owner</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Shop Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                <Coffee className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{shop.name}</h2>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                  <MapPin className="h-3 w-3" />
                  <span>{shop.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{shop.rating} ({shop.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            {/* Amenities */}
            <div className="mt-4 flex flex-wrap gap-2">
              {shop.amenities.map((amenity) => {
                const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                return (
                  <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                    <Icon className="h-3 w-3" />
                    {amenity}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Seat Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{shop.totalSeats}</div>
              <div className="text-sm text-muted-foreground">Total Seats</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{shop.availableSeats}</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-destructive">{shop.occupiedSeats}</div>
              <div className="text-sm text-muted-foreground">Occupied</div>
            </CardContent>
          </Card>
        </div>

        {/* Seat Layout */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Seat Layout</h3>
              <Button 
                onClick={handleBookRequest}
                disabled={isBooking}
                className="bg-primary hover:bg-primary/90"
              >
                <Users className="h-4 w-4 mr-2" />
                {isBooking ? "Requesting..." : "Book for Customer"}
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted rounded"></div>
                <span className="text-sm">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-success rounded"></div>
                <span className="text-sm">Available</span>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {shop.seatLayout.map((seat) => (
                <div
                  key={seat.id}
                  className={`
                    aspect-square rounded flex items-center justify-center text-sm font-medium
                    ${seat.available 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}
                >
                  {seat.id}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShopDetails;