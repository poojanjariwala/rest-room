
import { useState, useEffect } from "react";
import { ArrowLeft, User, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    state: '',
    shopName: '',
    shopAddress: '',
    shopType: 'Cafe'
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already authenticated
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase
          .from('profiles')
          .select('user_type')
          .eq('user_id', session.user.id)
          .maybeSingle()
          .then(({ data }) => {
            if (data?.user_type === 'owner') {
              navigate('/owner-dashboard');
            } else {
              navigate('/home');
            }
          });
      }
    });
  }, [navigate]);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      if (data.user) {
        // Get user type from profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('user_id', data.user.id)
          .maybeSingle();

        if (profile?.user_type === 'owner') {
          navigate('/owner-dashboard');
        } else {
          navigate('/home');
        }
      }
    } catch (error: any) {
      toast({
        title: "Login Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!formData.email || !formData.password || !formData.firstName) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const userType = mode.includes('owner') ? 'owner' : 'customer';
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            user_type: userType,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Success",
          description: "Account created successfully!",
        });

        // If owner, create shop as well
        if (userType === 'owner' && formData.shopName) {
          await supabase.from('shops').insert({
            name: formData.shopName,
            address: formData.shopAddress,
            owner_id: data.user.id,
            wifi_available: selectedAmenities.includes('WiFi'),
            power_outlets: selectedAmenities.includes('Charging'),
            food_available: selectedAmenities.includes('Food'),
            parking_available: selectedAmenities.includes('Parking'),
            quiet_environment: true,
          });
        }

        // Navigate based on user type
        if (userType === 'owner') {
          navigate('/owner-dashboard');
        } else {
          navigate('/home');
        }
      }
    } catch (error: any) {
      toast({
        title: "Signup Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderCustomerLogin = () => (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-muted-foreground">OR</span>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-3 py-3 rounded-full border-2"
              disabled
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
              <Label htmlFor="owner-email">Email</Label>
              <Input 
                id="owner-email" 
                type="email" 
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="owner-password">Password</Label>
              <Input 
                id="owner-password" 
                type="password" 
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-muted-foreground">OR</span>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-3 py-3 rounded-full border-2"
              disabled
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
              <Label htmlFor="customer-email">Email</Label>
              <Input 
                id="customer-email" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="customer-password">Password</Label>
              <Input 
                id="customer-password" 
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="customer-fullName">Full Name</Label>
              <Input 
                id="customer-fullName"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="customer-mobile">Mobile Number</Label>
              <Input 
                id="customer-mobile"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer-city">City</Label>
                <Input 
                  id="customer-city"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="customer-state">State</Label>
                <Input 
                  id="customer-state"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                />
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-muted-foreground">OR</span>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-3 py-3 rounded-full border-2"
              disabled
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
            <Label htmlFor="owner-signup-email">Email</Label>
            <Input 
              id="owner-signup-email" 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="owner-signup-password">Password</Label>
            <Input 
              id="owner-signup-password" 
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="owner-fullName">Full Name</Label>
            <Input 
              id="owner-fullName"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="owner-mobile">Mobile Number</Label>
            <Input 
              id="owner-mobile"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="owner-shopName">Shop Name</Label>
            <Input 
              id="owner-shopName"
              value={formData.shopName}
              onChange={(e) => setFormData({...formData, shopName: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="owner-shopAddress">Shop Address</Label>
            <Input 
              id="owner-shopAddress"
              value={formData.shopAddress}
              onChange={(e) => setFormData({...formData, shopAddress: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="owner-city">City</Label>
              <Input 
                id="owner-city"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="owner-state">State</Label>
              <Input 
                id="owner-state"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label>Shop Type</Label>
            <RadioGroup 
              value={formData.shopType} 
              onValueChange={(value) => setFormData({...formData, shopType: value})}
              className="mt-2"
            >
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
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-muted-foreground">OR</span>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-3 py-3 rounded-full border-2"
            disabled
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
