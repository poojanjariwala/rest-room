import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Wifi, Zap, Coffee, Volume2, Car } from "lucide-react";

interface Shop {
  id: string;
  name: string;
  description: string;
  address: string;
  photo_url: string;
  wifi_available: boolean;
  power_outlets: boolean;
  food_available: boolean;
  quiet_environment: boolean;
  parking_available: boolean;
}

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shops, setShops] = useState<Shop[]>([]);
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    wifi: false,
    power: false,
    food: false,
    quiet: false,
    parking: false,
  });

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, shops]);

  const fetchShops = async () => {
    try {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setShops(data || []);
    } catch (error) {
      console.error('Error fetching shops:', error);
      toast({
        title: "Error loading shops",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = shops;

    if (filters.wifi) {
      filtered = filtered.filter(shop => shop.wifi_available);
    }
    if (filters.power) {
      filtered = filtered.filter(shop => shop.power_outlets);
    }
    if (filters.food) {
      filtered = filtered.filter(shop => shop.food_available);
    }
    if (filters.quiet) {
      filtered = filtered.filter(shop => shop.quiet_environment);
    }
    if (filters.parking) {
      filtered = filtered.filter(shop => shop.parking_available);
    }

    setFilteredShops(filtered);
  };

  const handleShopClick = (shopId: string) => {
    navigate(`/shop/${shopId}`);
  };

  const renderAmenities = (shop: Shop) => {
    const amenities = [];
    if (shop.wifi_available) amenities.push({ icon: Wifi, label: "WiFi" });
    if (shop.power_outlets) amenities.push({ icon: Zap, label: "Power" });
    if (shop.food_available) amenities.push({ icon: Coffee, label: "Food" });
    if (shop.quiet_environment) amenities.push({ icon: Volume2, label: "Quiet" });
    if (shop.parking_available) amenities.push({ icon: Car, label: "Parking" });

    return amenities.slice(0, 3).map((amenity, index) => (
      <Badge key={index} variant="secondary" className="text-xs">
        <amenity.icon className="w-3 h-3 mr-1" />
        {amenity.label}
      </Badge>
    ));
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <DesktopSidebar />
        <div className="flex flex-col flex-1">
          <Header title="Find Your Perfect Spot" />
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
        <Header title="Find Your Perfect Spot" />
        <main className="flex-1 overflow-auto p-6 pb-20 md:pb-6">
          <div className="space-y-6">

        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.wifi ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, wifi: !prev.wifi }))}
          >
            <Wifi className="w-4 h-4 mr-2" />
            WiFi
          </Button>
          <Button
            variant={filters.power ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, power: !prev.power }))}
          >
            <Zap className="w-4 h-4 mr-2" />
            Power
          </Button>
          <Button
            variant={filters.food ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, food: !prev.food }))}
          >
            <Coffee className="w-4 h-4 mr-2" />
            Food
          </Button>
          <Button
            variant={filters.quiet ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, quiet: !prev.quiet }))}
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Quiet
          </Button>
          <Button
            variant={filters.parking ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, parking: !prev.parking }))}
          >
            <Car className="w-4 h-4 mr-2" />
            Parking
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <Card 
              key={shop.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleShopClick(shop.id)}
            >
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={shop.photo_url || "/placeholder.svg"}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{shop.name}</h3>
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground line-clamp-2">{shop.address}</p>
                </div>
                
                {shop.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {shop.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {renderAmenities(shop)}
                </div>

                <Button className="w-full" onClick={() => handleShopClick(shop.id)}>
                  Request Seat
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredShops.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No shops found matching your criteria</p>
            <Button 
              variant="outline" 
              onClick={() => setFilters({ wifi: false, power: false, food: false, quiet: false, parking: false })}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
