
import { useState } from "react";
import { Search, MapPin, Star, Wifi, Zap, Car, Coffee, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Filter } from "@/components/Filter";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { useNavigate } from "react-router-dom";
import techCafe from "@/assets/tech-cafe.jpg";
import restaurantWorkspace from "@/assets/restaurant-workspace.jpg";
import businessLounge from "@/assets/business-lounge.jpg";

const shops = [
  {
    id: 1,
    name: "Tech Hub Cafe",
    address: "Ring Road, Surat",
    distance: "0.2",
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
    distance: "0.9",
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
    distance: "1.5",
    type: "Cafe",
    rating: 4.4,
    reviews: 203,
    availableSeats: 16,
    totalSeats: 22,
    price: 50,
    amenities: ["AC", "WiFi", "Food", "Charging"],
    hours: "9:00 AM - 12:00 AM",
    image: businessLounge
  },
  {
    id: 4,
    name: "Coffee Corner",
    address: "Varachha Road, Surat",
    distance: "2.1",
    type: "Cafe",
    rating: 4.2,
    reviews: 78,
    availableSeats: 8,
    totalSeats: 15,
    price: 50,
    amenities: ["WiFi", "Charging", "Food"],
    hours: "7:00 AM - 10:00 PM",
    image: techCafe
  },
  {
    id: 5,
    name: "Business Hub",
    address: "Adajan, Surat",
    distance: "3.2",
    type: "Business Lounge",
    rating: 4.7,
    reviews: 145,
    availableSeats: 20,
    totalSeats: 25,
    price: 50,
    amenities: ["AC", "WiFi", "Charging", "Parking"],
    hours: "6:00 AM - 11:00 PM",
    image: businessLounge
  },
  {
    id: 6,
    name: "Quick Bite Cafe",
    address: "Katargam, Surat",
    distance: "4.0",
    type: "Restaurant",
    rating: 4.1,
    reviews: 92,
    availableSeats: 14,
    totalSeats: 20,
    price: 50,
    amenities: ["AC", "Food", "Washroom"],
    hours: "8:00 AM - 10:30 PM",
    image: restaurantWorkspace
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

const typeColors = {
  'Cafe': 'bg-orange-100 text-orange-800',
  'Restaurant': 'bg-green-100 text-green-800',
  'Business Lounge': 'bg-purple-100 text-purple-800',
  'Barber Shop': 'bg-blue-100 text-blue-800',
  'Chai Stall': 'bg-yellow-100 text-yellow-800'
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShops, setFilteredShops] = useState(shops);
  const navigate = useNavigate();

  const handleShopClick = (shopId: number) => {
    navigate(`/shop/${shopId}`);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleFilterChange = (filters: any) => {
    let filtered = shops;
    
    if (filters.type && filters.type !== 'All Types') {
      filtered = filtered.filter(shop => shop.type === filters.type);
    }
    
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(shop => 
        filters.amenities.some((amenity: string) => {
          const amenityMap: { [key: string]: string } = {
            'Air Conditioning': 'AC',
            'WiFi': 'WiFi',
            'Parking': 'Parking',
            'Food Available': 'Food',
            'Charging Points': 'Charging',
            'Washroom': 'Washroom'
          };
          return shop.amenities.includes(amenityMap[amenity] || amenity);
        })
      );
    }
    
    // Sort by selected option
    if (filters.sortBy === 'Rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'Availability') {
      filtered.sort((a, b) => b.availableSeats - a.availableSeats);
    } else {
      filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    }
    
    setFilteredShops(filtered);
  };

  const searchFilteredShops = filteredShops.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <DesktopSidebar />
      
      <div className="lg:pl-80">
        <Header 
          title="RestRoom"
          subtitle="Surat, Gujarat"
          showLogout={true}
          onLogout={handleLogout}
          logoHeight="w-12 h-8"
        />

        {/* Search Section */}
        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search shops or areas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Filter onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Shop Listings */}
        <div className="px-4 pb-20 lg:pb-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {searchFilteredShops.map((shop) => (
              <Card 
                key={shop.id} 
                className="cursor-pointer transition-all hover:shadow-lg"
                onClick={() => handleShopClick(shop.id)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={shop.image} 
                        alt={shop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{shop.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                            <MapPin className="h-3 w-3" />
                            <span>{shop.address}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{shop.rating}</span>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`text-xs px-2 py-0.5 ${typeColors[shop.type as keyof typeof typeColors] || 'bg-gray-100 text-gray-800'}`}
                            >
                              {shop.type}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="text-right flex flex-col items-end gap-1">
                          <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                            {shop.distance}km
                          </div>
                          <div className="bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
                            {shop.availableSeats}/{shop.totalSeats}
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {shop.amenities.slice(0, 4).map((amenity) => {
                          const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                          return (
                            <Badge key={amenity} variant="outline" className="text-xs flex items-center gap-1">
                              <Icon className="h-3 w-3" />
                              {amenity}
                            </Badge>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          <Clock className="h-3 w-3" />
                          <span>{shop.hours}</span>
                        </div>
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
        </div>
      </div>

      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default Home;
