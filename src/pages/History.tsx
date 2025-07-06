
import { Clock, MapPin, Star, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const bookingHistory = [
  {
    id: 1,
    shopName: "Tech Hub Cafe",
    address: "Ring Road, Surat",
    date: "2024-01-15",
    time: "2:30 PM",
    duration: "2 hours",
    amount: 100,
    status: "completed",
    rating: 4.5
  },
  {
    id: 2,
    shopName: "Diamond City Rest",
    address: "Athwa Lines, Surat",
    date: "2024-01-12",
    time: "11:00 AM",
    duration: "1.5 hours",
    amount: 75,
    status: "completed",
    rating: 4.2
  },
  {
    id: 3,
    shopName: "Relax Zone Surat",
    address: "Citylight, Surat",
    date: "2024-01-10",
    time: "4:00 PM",
    duration: "3 hours",
    amount: 150,
    status: "cancelled",
    rating: null
  },
  {
    id: 4,
    shopName: "Coffee Corner",
    address: "Varachha Road, Surat",
    date: "2024-01-08",
    time: "9:30 AM",
    duration: "1 hour",
    amount: 50,
    status: "pending",
    rating: null
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-success';
    case 'cancelled':
      return 'text-destructive';
    case 'pending':
      return 'text-yellow-600';
    default:
      return 'text-muted-foreground';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return CheckCircle;
    case 'cancelled':
      return XCircle;
    case 'pending':
      return AlertCircle;
    default:
      return Clock;
  }
};

const History = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="RestRoom"
        subtitle="Surat, Gujarat"
        showLogout={true}
      />

      <div className="p-4 pb-20">
        <h2 className="text-2xl font-semibold mb-6">Booking History</h2>
        
        {bookingHistory.length > 0 ? (
          <div className="space-y-4">
            {bookingHistory.map((booking) => {
              const StatusIcon = getStatusIcon(booking.status);
              return (
                <Card key={booking.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{booking.shopName}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                          <MapPin className="h-3 w-3" />
                          <span>{booking.address}</span>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(booking.status)} border-current`}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Date & Time</p>
                        <p className="font-medium">{booking.date}</p>
                        <p className="text-sm">{booking.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{booking.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        {booking.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{booking.rating}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">₹{booking.amount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Clock className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
            <p className="text-muted-foreground">Your booking history will appear here</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default History;
