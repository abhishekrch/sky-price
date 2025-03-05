
import { Flight } from '@/types';
import { FlightSearchForm, FlightFormValues } from '@/components/FlightSearchForm';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { FlightCard } from '@/components/FlightCard';
import { PlaneTakeoff, Search as SearchIcon } from 'lucide-react';
import { toast } from 'sonner';
import { flightApi } from '@/services/api';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useState<FlightFormValues | null>(null);
  const [urlParams] = useSearchParams();

  useEffect(() => {
    const from = urlParams.get('from');
    const to = urlParams.get('to');
    const date = urlParams.get('date');
    const passengers = urlParams.get('passengers');

    if (from && to && date) {
      setSearchParams({
        from,
        to,
        date: new Date(date),
        passengers: passengers ? parseInt(passengers) : 1
      });
    }
  }, [urlParams]);

  const { data: flights, isLoading, error } = useQuery({
    queryKey: ['flights', searchParams],
    queryFn: () => {
      if (!searchParams?.from || !searchParams?.to || !searchParams?.date) {
        return Promise.resolve([]);
      }
      return flightApi.searchFlights({
        from: searchParams.from,
        to: searchParams.to,
        date: searchParams.date.toISOString().split('T')[0],
        passengers: searchParams.passengers
      });
    },
    enabled: !!searchParams,
  });

  const handleSearch = (values: FlightFormValues) => {
    setSearchParams(values);
  };

  const handleSelectFlight = (flight: Flight) => {
    if (isAuthenticated) {
      toast.success(`Selected flight: ${flight.airline} ${flight.flightNumber}`);
    } else {
      toast.error("Please login to book this flight", {
        description: "Create an account or login to continue with booking.",
        action: {
          label: "Login",
          onClick: () => window.location.href = "/login",
        },
      });
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="pt-24 pb-6 md:pb-12 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Find Your Perfect Flight</h1>
            <FlightSearchForm onSubmit={handleSearch} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8">
        {!searchParams && !flights?.length && (
          <div className="flex flex-col items-center justify-center text-center py-16 animate-fadeIn">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <SearchIcon className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Search for flights</h2>
            <p className="text-muted-foreground max-w-md">
              Enter your travel details to find the best flight options and prices.
            </p>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 animate-pulse">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <PlaneTakeoff className="h-8 w-8 text-primary animate-float" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Searching for flights...</h2>
            <p className="text-muted-foreground">
              Checking prices and availability for your journey.
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <h2 className="text-xl font-bold text-destructive mb-2">
              Error searching for flights
            </h2>
            <p className="text-muted-foreground">
              Please try again or modify your search criteria.
            </p>
          </div>
        )}

        {flights && flights.length > 0 && (
          <div className="pt-6">
            <h2 className="text-2xl font-bold mb-6">
              {flights.length} flights found from {flights[0].departureAirport} to {flights[0].arrivalAirport}
            </h2>
            <div className="space-y-6">
              {flights.map((flight) => (
                <div key={flight.id} className="animate-slideUp">
                  <FlightCard flight={flight} onSelect={handleSelectFlight} />
                </div>
              ))}
            </div>
          </div>
        )}

        {searchParams && flights && flights.length === 0 && !isLoading && !error && (
          <div className="text-center py-16">
            <h2 className="text-xl font-bold mb-2">No flights found</h2>
            <p className="text-muted-foreground">
              Try different dates or destinations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
