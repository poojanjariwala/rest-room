
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

import Index from "./pages/Index";
import Home from "./pages/Home";
import Account from "./pages/Account";
import History from "./pages/History";
import ShopDetails from "./pages/ShopDetails";
import Auth from "./pages/Auth";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerHistory from "./pages/OwnerHistory";
import OwnerAccount from "./pages/OwnerAccount";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, isOwner = false }: { children: React.ReactNode, isOwner?: boolean }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Get user type from profile
        supabase
          .from('profiles')
          .select('user_type')
          .eq('user_id', session.user.id)
          .single()
          .then(({ data }) => {
            setUserType(data?.user_type || null);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('user_id', session.user.id)
          .single();
        setUserType(data?.user_type || null);
      } else {
        setUserType(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (isOwner && userType !== 'owner') {
    return <Navigate to="/home" replace />;
  }

  if (!isOwner && userType === 'owner') {
    return <Navigate to="/owner-dashboard" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Customer Routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } />
          <Route path="/shop/:id" element={
            <ProtectedRoute>
              <ShopDetails />
            </ProtectedRoute>
          } />
          
          {/* Owner Routes */}
          <Route path="/owner-dashboard" element={
            <ProtectedRoute isOwner>
              <OwnerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/owner-history" element={
            <ProtectedRoute isOwner>
              <OwnerHistory />
            </ProtectedRoute>
          } />
          <Route path="/owner-account" element={
            <ProtectedRoute isOwner>
              <OwnerAccount />
            </ProtectedRoute>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
