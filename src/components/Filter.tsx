
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter as FilterIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const shopTypes = ['All Types', 'Cafe', 'Restaurant', 'Barber Shop', 'Chai Stall', 'Business Lounge'];
const amenities = ['Air Conditioning', 'WiFi', 'Parking', 'Food Available', 'Charging Points', 'Washroom'];
const sortOptions = ['Distance', 'Rating', 'Availability'];

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

export const Filter = ({ onFilterChange }: FilterProps) => {
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Distance');
  const [maxDistance, setMaxDistance] = useState([5]);
  const [minRating, setMinRating] = useState([1]);
  const [isOpen, setIsOpen] = useState(false);

  const handleApplyFilters = () => {
    onFilterChange({
      type: selectedType,
      amenities: selectedAmenities,
      sortBy,
      maxDistance: maxDistance[0],
      minRating: minRating[0]
    });
    setIsOpen(false);
  };

  const handleClearAll = () => {
    setSelectedType('All Types');
    setSelectedAmenities([]);
    setSortBy('Distance');
    setMaxDistance([5]);
    setMinRating([1]);
    onFilterChange({
      type: 'All Types',
      amenities: [],
      sortBy: 'Distance',
      maxDistance: 5,
      minRating: 1
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-2">
          <FilterIcon className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-4">
          <DialogTitle>Filter & Sort</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <Label className="text-base font-semibold mb-3 block">Shop Type</Label>
            <RadioGroup value={selectedType} onValueChange={setSelectedType} className="space-y-2">
              {shopTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type}>{type}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div>
            <Label className="text-base font-semibold mb-3 block">Sort By</Label>
            <RadioGroup value={sortBy} onValueChange={setSortBy} className="space-y-2">
              {sortOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Maximum Distance: {maxDistance[0]} km
            </Label>
            <Slider
              value={maxDistance}
              onValueChange={setMaxDistance}
              max={10}
              min={1}
              step={0.5}
              className="w-full"
            />
          </div>
          
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Minimum Rating: {minRating[0]} stars
            </Label>
            <Slider
              value={minRating}
              onValueChange={setMinRating}
              max={5}
              min={1}
              step={0.5}
              className="w-full"
            />
          </div>
          
          <div>
            <Label className="text-base font-semibold mb-3 block">Amenities</Label>
            <div className="space-y-2">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox 
                    id={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedAmenities([...selectedAmenities, amenity]);
                      } else {
                        setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                      }
                    }}
                  />
                  <Label htmlFor={amenity}>{amenity}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={handleClearAll} className="flex-1 rounded-xl">
              Clear All
            </Button>
            <Button onClick={handleApplyFilters} className="flex-1 rounded-xl">
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
