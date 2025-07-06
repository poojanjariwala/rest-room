import { useState } from "react";
import { Search, Filter, MapPin, Star, Wifi, Zap, Car, Coffee, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import techCafe from "@/assets/tech-cafe.jpg";
import restaurantWorkspace from "@/assets/restaurant-workspace.jpg";
import businessLounge from "@/assets/business-lounge.jpg";

const shops = [
  {
    id: 1,
    name: "Tech Hub Cafe",
    address: "Ring Road, Surat",
    distance: "0.2 km",
    type: "Cafe",
    rating: 4.3,
    reviews: 156,
    availableSeats: 25,
    totalSeats: 30,
    price: 50,
    amenities: ["AC", "WiFi", "Charging", "Food"],
    hours: "8:00 AM - 11:00 PM",
    image: techCafe
  },
  {
    id: 2,
    name: "Diamond City Rest",
    address: "Athwa Lines, Surat",
    distance: "0.9 km",
    type: "Restaurant",
    rating: 4.6,
    reviews: 89,
    availableSeats: 12,
    totalSeats: 18,
    price: 50,
    amenities: ["AC", "Parking", "Washroom"],
    hours: "7:30 AM - 10:30 PM",
    image: restaurantWorkspace
  },
  {
    id: 3,
    name: "Relax Zone Surat",
    address: "Citylight, Surat",
    distance: "1.5 km",
    type: "Cafe",
    rating: 4.4,
    reviews: 203,
    availableSeats: 16,
    totalSeats: 22,
    price: 50,
    amenities: ["AC", "WiFi", "Food", "Charging"],
    hours: "9:00 AM - 12:00 AM",
    image: businessLounge
  }
];

const amenityIcons = {
  AC: Zap,
  WiFi: Wifi,
  Parking: Car,
  Food: Coffee,
  Charging: Zap,
  Washroom: User
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleShopClick = (shopId: number) => {
    navigate(`/shop/${shopId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="RestRoom"
        subtitle="Surat, Gujarat"
        showLogout={true}
      />

      {/* Search Section */}
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search shops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button size="icon" variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats */}
        <Card className="bg-gradient-to-r from-primary to-accent text-white">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">10</div>
                <div className="text-sm opacity-90">Shops</div>
              </div>
              <div>
                <div className="text-2xl font-bold">204</div>
                <div className="text-sm opacity-90">Available Seats</div>
              </div>
              <div>
                <div className="text-2xl font-bold">260</div>
                <div className="text-sm opacity-90">Total Seats</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shop Listings */}
      <div className="px-4 pb-20 space-y-4">
        {shops
          .filter(shop => 
            shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shop.address.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((shop) => (
            <Card 
              key={shop.id} 
              className="cursor-pointer transition-all hover:shadow-lg"
              onClick={() => handleShopClick(shop.id)}
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img 
                      src={shop.image} 
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{shop.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                          <MapPin className="h-3 w-3" />
                          <span>{shop.address}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{shop.rating} rating</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge 
                          variant="secondary" 
                          className="bg-success text-success-foreground mb-1"
                        >
                          {shop.availableSeats}/{shop.totalSeats}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-primary">{shop.distance}</span>
                      <Badge variant="outline" className="text-xs">
                        {shop.type}
                      </Badge>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center gap-2 mb-2">
                      {shop.amenities.slice(0, 3).map((amenity) => {
                        const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                        return (
                          <div key={amenity} className="flex items-center gap-1">
                            <Icon className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{shop.hours}</span>
                      <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                        ₹{shop.price}/hr
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;