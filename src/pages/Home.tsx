import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { FilterModal } from "@/components/FilterModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, MapPin, Wifi, Zap, Coffee, Volume2, Car, Star, Clock } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    shopType: "all",
    sortBy: "distance",
    maxDistance: 5,
    minRating: 1,
    amenities: {
      ac: false,
      wifi: false,
      parking: false,
      food: false,
      charging: false,
      washroom: false,
    },
  });

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, shops, searchQuery]);

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

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(shop => 
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Amenity filters
    if (filters.amenities.wifi) {
      filtered = filtered.filter(shop => shop.wifi_available);
    }
    if (filters.amenities.charging) {
      filtered = filtered.filter(shop => shop.power_outlets);
    }
    if (filters.amenities.food) {
      filtered = filtered.filter(shop => shop.food_available);
    }
    if (filters.amenities.parking) {
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
    if (shop.power_outlets) amenities.push({ icon: Zap, label: "Charging" });
    if (shop.food_available) amenities.push({ icon: Coffee, label: "Food" });
    if (shop.parking_available) amenities.push({ icon: Car, label: "Parking" });

    return amenities;
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    applyFilters();
  };

  const handleClearFilters = () => {
    setFilters({
      shopType: "all",
      sortBy: "distance",
      maxDistance: 5,
      minRating: 1,
      amenities: {
        ac: false,
        wifi: false,
        parking: false,
        food: false,
        charging: false,
        washroom: false,
      },
    });
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <Header title="RestRoom" subtitle="Surat, Gujarat" showLogo={true} />
        <div className="flex items-center justify-center flex-1">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header title="RestRoom" subtitle="Surat, Gujarat" showLogo={true} />
      
      {/* Search Bar */}
      <div className="p-4 bg-white border-b border-gray-100">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search shops or areas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-lg border-gray-200"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setIsFilterModalOpen(true)}
            className="px-4 rounded-lg border-gray-200"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Shop List */}
      <div className="flex-1 overflow-auto pb-20">
        {filteredShops.map((shop, index) => (
          <div
            key={shop.id}
            className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
            onClick={() => handleShopClick(shop.id)}
          >
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
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{shop.name}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500 truncate">{shop.address}</span>
                    </div>
                    
                    {/* Rating and Category */}
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">4.{Math.floor(Math.random() * 5) + 3}</span>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {shop.food_available ? "Cafe" : "Restaurant"}
                      </span>
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

                    {/* Timing and Price */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-xs text-gray-500">8:00 AM - 11:00 PM</span>
                      </div>
                      <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                        ₹50/hr
                      </div>
                    </div>
                  </div>

                  {/* Distance */}
                  <div className="text-sm text-blue-500 font-medium ml-2">
                    {(Math.random() * 2 + 0.1).toFixed(1)}km
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredShops.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-lg mb-4">No shops found</p>
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <BottomNav />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
};

export default Home;