
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Wifi, Zap, Car, Coffee, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import techCafe from "@/assets/tech-cafe.jpg";
import restaurantWorkspace from "@/assets/restaurant-workspace.jpg";
import businessLounge from "@/assets/business-lounge.jpg";

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
    type: "Cafe",
    image: techCafe
  },
  2: {
    name: "Diamond City Rest",
    address: "Athwa Lines, Surat",
    rating: 4.6,
    reviews: 89,
    totalSeats: 18,
    availableSeats: 12,
    occupiedSeats: 6,
    amenities: ["AC", "Parking", "Washroom"],
    hours: "7:30 AM - 10:30 PM",
    price: 50,
    type: "Restaurant",
    image: restaurantWorkspace
  },
  3: {
    name: "Relax Zone Surat",
    address: "Citylight, Surat",
    rating: 4.4,
    reviews: 203,
    totalSeats: 22,
    availableSeats: 16,
    occupiedSeats: 6,
    amenities: ["AC", "WiFi", "Food", "Charging"],
    hours: "9:00 AM - 12:00 AM",
    price: 50,
    type: "Cafe",
    image: businessLounge
  },
  4: {
    name: "Coffee Corner",
    address: "Varachha Road, Surat",
    rating: 4.2,
    reviews: 78,
    totalSeats: 15,
    availableSeats: 8,
    occupiedSeats: 7,
    amenities: ["WiFi", "Charging", "Food"],
    hours: "7:00 AM - 10:00 PM",
    price: 50,
    type: "Cafe",
    image: techCafe
  },
  5: {
    name: "Business Hub",
    address: "Adajan, Surat",
    rating: 4.7,
    reviews: 145,
    totalSeats: 25,
    availableSeats: 20,
    occupiedSeats: 5,
    amenities: ["AC", "WiFi", "Charging", "Parking"],
    hours: "6:00 AM - 11:00 PM",
    price: 50,
    type: "Business Lounge",
    image: businessLounge
  },
  6: {
    name: "Quick Bite Cafe",
    address: "Katargam, Surat",
    rating: 4.1,
    reviews: 92,
    totalSeats: 20,
    availableSeats: 14,
    occupiedSeats: 6,
    amenities: ["AC", "Food", "Washroom"],
    hours: "8:00 AM - 10:30 PM",
    price: 50,
    type: "Restaurant",
    image: restaurantWorkspace
  }
};

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRequesting, setIsRequesting] = useState(false);
  
  const shop = shopData[Number(id) as keyof typeof shopData];
  
  if (!shop) {
    navigate('/home');
    return null;
  }

  const handleSeatRequest = () => {
    setIsRequesting(true);
    // Simulate request sending
    setTimeout(() => {
      setIsRequesting(false);
      toast({
        title: "Request Sent!",
        description: "Your seat request has been sent to the shop owner. You'll be notified once they respond.",
      });
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
            <div className="text-sm opacity-90">Shop Details</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Shop Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <img 
                  src={shop.image} 
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{shop.name}</h2>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                  <MapPin className="h-3 w-3" />
                  <span>{shop.address}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{shop.rating} ({shop.reviews} reviews)</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {shop.type}
                </Badge>
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

            {/* Hours and Price */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                <span>{shop.hours}</span>
              </div>
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium">
                ₹{shop.price}/hr
              </div>
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

        {/* Request Button */}
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Request a Seat</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Send a request to the shop owner. They will accept or decline your request.
            </p>
            <Button 
              onClick={handleSeatRequest}
              disabled={isRequesting || shop.availableSeats === 0}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              {isRequesting ? "Sending Request..." : 
               shop.availableSeats === 0 ? "No Seats Available" : 
               "Request Seat"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShopDetails;
