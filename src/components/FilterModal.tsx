import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    shopType: string;
    sortBy: string;
    maxDistance: number;
    minRating: number;
    amenities: {
      ac: boolean;
      wifi: boolean;
      parking: boolean;
      food: boolean;
      charging: boolean;
      washroom: boolean;
    };
  };
  onFiltersChange: (filters: any) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export function FilterModal({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
}: FilterModalProps) {
  if (!isOpen) return null;

  const handleShopTypeChange = (value: string) => {
    onFiltersChange({ ...filters, shopType: value });
  };

  const handleSortByChange = (value: string) => {
    onFiltersChange({ ...filters, sortBy: value });
  };

  const handleDistanceChange = (value: number[]) => {
    onFiltersChange({ ...filters, maxDistance: value[0] });
  };

  const handleRatingChange = (value: number) => {
    onFiltersChange({ ...filters, minRating: value });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      amenities: { ...filters.amenities, [amenity]: checked },
    });
  };

  const handleApply = () => {
    onApplyFilters();
    onClose();
  };

  const handleClearAll = () => {
    onClearFilters();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Shop Type */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Shop Type</h3>
          <RadioGroup value={filters.shopType} onValueChange={handleShopTypeChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Types</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cafe" id="cafe" />
              <Label htmlFor="cafe">Cafe</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="restaurant" id="restaurant" />
              <Label htmlFor="restaurant">Restaurant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="barber" id="barber" />
              <Label htmlFor="barber">Barber Shop</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="chai" id="chai" />
              <Label htmlFor="chai">Chai Stall</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="business" id="business" />
              <Label htmlFor="business">Business Lounge</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Sort By */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Sort By</h3>
          <RadioGroup value={filters.sortBy} onValueChange={handleSortByChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="distance" id="distance" />
              <Label htmlFor="distance">Distance</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rating" id="rating" />
              <Label htmlFor="rating">Rating</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="availability" id="availability" />
              <Label htmlFor="availability">Availability</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Maximum Distance */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Maximum Distance: {filters.maxDistance} km</h3>
          <Slider
            value={[filters.maxDistance]}
            onValueChange={handleDistanceChange}
            max={50}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Minimum Rating */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Minimum Rating: {filters.minRating} stars</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRatingChange(Math.max(1, filters.minRating - 1))}
              disabled={filters.minRating <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center">{filters.minRating}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRatingChange(Math.min(5, filters.minRating + 1))}
              disabled={filters.minRating >= 5}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">Amenities</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ac"
                checked={filters.amenities.ac}
                onCheckedChange={(checked) => handleAmenityChange("ac", checked as boolean)}
              />
              <Label htmlFor="ac">Air Conditioning</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="wifi"
                checked={filters.amenities.wifi}
                onCheckedChange={(checked) => handleAmenityChange("wifi", checked as boolean)}
              />
              <Label htmlFor="wifi">WiFi</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="parking"
                checked={filters.amenities.parking}
                onCheckedChange={(checked) => handleAmenityChange("parking", checked as boolean)}
              />
              <Label htmlFor="parking">Parking</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="food"
                checked={filters.amenities.food}
                onCheckedChange={(checked) => handleAmenityChange("food", checked as boolean)}
              />
              <Label htmlFor="food">Food Available</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="charging"
                checked={filters.amenities.charging}
                onCheckedChange={(checked) => handleAmenityChange("charging", checked as boolean)}
              />
              <Label htmlFor="charging">Charging Points</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="washroom"
                checked={filters.amenities.washroom}
                onCheckedChange={(checked) => handleAmenityChange("washroom", checked as boolean)}
              />
              <Label htmlFor="washroom">Washroom</Label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleClearAll} className="flex-1">
            Clear All
          </Button>
          <Button onClick={handleApply} className="flex-1 bg-blue-500 hover:bg-blue-600">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}