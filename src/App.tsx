
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/history" element={<History />} />
          <Route path="/shop/:id" element={<ShopDetails />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/owner-history" element={<OwnerHistory />} />
          <Route path="/owner-account" element={<OwnerAccount />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
