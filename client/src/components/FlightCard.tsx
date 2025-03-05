
import { Clock, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Flight } from '@/types';

interface FlightCardProps {
  flight: Flight;
  onSelect?: (flight: Flight) => void;
}

export function FlightCard({ flight, onSelect }: FlightCardProps) {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300 p-4 md:p-6 md:w-2/3 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {flight.airline}
                </div>
                <div className="text-xs text-muted-foreground">
                  {flight.flightNumber}
                </div>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{flight.duration}</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-2">
              <div className="flex flex-col items-start">
                <span className="text-2xl font-bold">{formatTime(flight.departureTime)}</span>
                <span className="text-sm text-muted-foreground">{flight.departureAirport}</span>
              </div>
              
              <div className="flex items-center my-4 md:my-0 w-full md:w-auto justify-center">
                <div className="h-[1px] w-12 md:w-24 bg-border"></div>
                <Plane className="mx-2 h-4 w-4 text-muted-foreground" />
                <div className="h-[1px] w-12 md:w-24 bg-border"></div>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-2xl font-bold">{formatTime(flight.arrivalTime)}</span>
                <span className="text-sm text-muted-foreground">{flight.arrivalAirport}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 md:p-6 md:w-1/3 flex flex-col justify-between">
            <div className="mb-4 md:text-right">
              <div className="text-3xl font-bold">{formatCurrency(flight.price, flight.currency)}</div>
              <div className="text-xs text-muted-foreground">per passenger</div>
            </div>
            
            <Button 
              onClick={() => onSelect && onSelect(flight)} 
              className="w-full mt-2 transition-all duration-300"
            >
              Select
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
