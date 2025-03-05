
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarIcon, Plane, Users } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  from: z.string().min(3, {
    message: "From location must be at least 3 characters.",
  }),
  to: z.string().min(3, {
    message: "To location must be at least 3 characters.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  passengers: z.number().min(1).max(10).default(1),
});

export type FlightFormValues = z.infer<typeof formSchema>;

interface FlightSearchFormProps {
  variant?: 'default' | 'hero';
  onSubmit?: (values: FlightFormValues) => void;
}

export function FlightSearchForm({ variant = 'default', onSubmit }: FlightSearchFormProps) {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();

  const form = useForm<FlightFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: '',
      to: '',
      passengers: 1,
    },
  });

  const handleSubmit = (values: FlightFormValues) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      navigate(`/search?from=${values.from}&to=${values.to}&date=${values.date.toISOString()}&passengers=${values.passengers}`);
    }
  };

  return (
    <Card className={cn(
      "w-full overflow-hidden transition-all duration-300 shadow-md", 
      variant === 'hero' ? "bg-white/80 backdrop-blur-lg border-white/20" : "bg-white"
    )}>
      <CardContent className={cn("p-6", variant === 'hero' ? "md:p-8" : "")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <Label>From</Label>
                    <FormControl>
                      <div className="relative">
                        <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="pl-10 input-focus-effect" 
                          placeholder="Departure city or airport" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <Label>To</Label>
                    <FormControl>
                      <div className="relative">
                        <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 rotate-90 text-muted-foreground" />
                        <Input 
                          className="pl-10 input-focus-effect" 
                          placeholder="Arrival city or airport" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Label>Departure Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal input-focus-effect",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="passengers"
                render={({ field }) => (
                  <FormItem>
                    <Label>Passengers</Label>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="input-focus-effect">
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            <SelectValue placeholder="Select passengers" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Passenger' : 'Passengers'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full">
                Search Flights
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
