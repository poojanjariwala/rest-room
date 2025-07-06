import { useState } from "react";
import { ArrowLeft, X, User, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useSearchParams } from "react-router-dom";

type AuthMode = 'customer-login' | 'customer-signup' | 'owner-login' | 'owner-signup';

const shopTypes = ['Cafe', 'Restaurant', 'Barber Shop', 'Chai Stall', 'Business Lounge'];
const amenities = ['WiFi', 'AC', 'Parking', 'Food', 'Charging', 'Washroom'];

const Auth = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const [mode, setMode] = useState<AuthMode>(
    type === 'owner' ? 'owner-login' : 'customer-login'
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['WiFi']);
  const navigate = useNavigate();

  const handleCustomerAuth = () => {
    navigate('/home');
  };

  const handleOwnerAuth = () => {
    navigate('/owner-dashboard');
  };

  const renderCustomerLogin = () => (
    <div className="min-h-screen bg-background">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Customer Login</h1>
        </div>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleCustomerAuth}
            >
              Login
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-muted-foreground">OR</span>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-3 py-3 rounded-full border-2"
              onClick={handleCustomerAuth}
            >
              <img 
                src="/lovable-uploads/98076ada-1afe-45dc-b76b-cd228923d9f1.png" 
                alt="Google" 
                className="w-5 h-5"
              />
              Sign in with Google
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-muted-foreground">Don't have an account? </span>
              <Button 
                variant="link" 
                className="p-0 h-auto"
                onClick={() => setMode('customer-signup')}
              >
                Sign up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderOwnerLogin = () => (
    <div className="min-h-screen bg-background">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Shop Owner Login</h1>
        </div>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleOwnerAuth}
            >
              Login
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-muted-foreground">OR</span>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-3 py-3 rounded-full border-2"
              onClick={handleOwnerAuth}
            >
              <img 
                src="/lovable-uploads/98076ada-1afe-45dc-b76b-cd228923d9f1.png" 
                alt="Google" 
                className="w-5 h-5"
              />
              Sign in with Google
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-muted-foreground">Don't have an account? </span>
              <Button 
                variant="link" 
                className="p-0 h-auto"
                onClick={() => setMode('owner-signup')}
              >
                Sign up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCustomerSignup = () => (
    <div className="min-h-screen bg-background">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMode('customer-login')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Customer Signup</h1>
        </div>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" />
            </div>
            
            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
              <Input id="city" />
            </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" />
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleCustomerAuth}
            >
              Sign Up
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-muted-foreground">OR</span>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-3 py-3 rounded-full border-2"
              onClick={handleCustomerAuth}
            >
              <img 
                src="/lovable-uploads/98076ada-1afe-45dc-b76b-cd228923d9f1.png" 
                alt="Google" 
                className="w-5 h-5"
              />
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderOwnerSignup = () => (
    <div className="min-h-screen bg-background">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMode('owner-login')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Shop Owner Signup</h1>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" />
          </div>
          
          <div>
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input id="mobile" />
          </div>
          
          <div>
            <Label htmlFor="shopName">Shop Name</Label>
            <Input id="shopName" />
          </div>
          
          <div>
            <Label htmlFor="shopAddress">Shop Address</Label>
            <Input id="shopAddress" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" />
            </div>
          </div>
          
          <div>
            <Label>Shop Type</Label>
            <RadioGroup defaultValue="Cafe" className="mt-2">
              {shopTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type}>{type}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div>
            <Label>Amenities</Label>
            <div className="mt-2 space-y-2">
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
          
          <Button 
            className="w-full" 
            onClick={handleOwnerAuth}
          >
            Sign Up
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-muted-foreground">OR</span>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-3 py-3 rounded-full border-2"
            onClick={handleOwnerAuth}
          >
            <img 
              src="/lovable-uploads/98076ada-1afe-45dc-b76b-cd228923d9f1.png" 
              alt="Google" 
              className="w-5 h-5"
            />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );

  switch (mode) {
    case 'customer-login':
      return renderCustomerLogin();
    case 'customer-signup':
      return renderCustomerSignup();
    case 'owner-login':
      return renderOwnerLogin();
    case 'owner-signup':
      return renderOwnerSignup();
    default:
      return renderCustomerLogin();
  }
};

export default Auth;
