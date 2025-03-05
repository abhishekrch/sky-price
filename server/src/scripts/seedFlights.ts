import mongoose from 'mongoose';
import Flight from '../models/Flight';
import dotenv from 'dotenv';

dotenv.config();

const airlines = [
  { name: 'Indigo', code: '6E' },
  { name: 'Air Asia', code: 'I5' },
  { name: 'Vistara', code: 'UK' },
  { name: 'Air India', code: 'AI' },
  { name: 'SpiceJet', code: 'SG' }
];

const routes = [
  {
    from: 'Delhi',
    to: 'Jaipur',
    basePrice: 1500,
    flightTime: 55, 
  },
  {
    from: 'Mumbai',
    to: 'Delhi',
    basePrice: 2500,
    flightTime: 120,
  },
  {
    from: 'Bangalore',
    to: 'Mumbai',
    basePrice: 2200,
    flightTime: 105,
  }
];

const generateFlightNumber = (airlineCode: string) => {
  return `${airlineCode}${Math.floor(1000 + Math.random() * 9000)}`;
};

const generatePrice = (basePrice: number) => {
  const variation = basePrice * 0.3; // 30% variation
  return Math.round(basePrice + (Math.random() * variation - variation/2));
};

const generateFlightsForDate = (date: Date) => {
  const flights = [];

  for (const route of routes) {
    for (const airline of airlines) {
      const numFlights = 2 + Math.floor(Math.random() * 2);
      
      for (let i = 0; i < numFlights; i++) {
        const departureHour = 6 + Math.floor(Math.random() * 15);
        const departureMinute = Math.floor(Math.random() * 60);
        
        const departureTime = new Date(date);
        departureTime.setHours(departureHour, departureMinute, 0, 0);
        
        const arrivalTime = new Date(departureTime.getTime() + route.flightTime * 60000);
        
        flights.push({
          airline: airline.name,
          flightNumber: generateFlightNumber(airline.code),
          departureAirport: route.from,
          arrivalAirport: route.to,
          departureTime,
          arrivalTime,
          price: generatePrice(route.basePrice),
          currency: 'INR',
          duration: `${Math.floor(route.flightTime/60)}h ${route.flightTime%60}m`
        });
      }
    }
  }

  return flights;
};

const seedFlights = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB');

    
    await Flight.deleteMany({});
    console.log('Cleared existing flights');

    
    const flights = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      flights.push(...generateFlightsForDate(date));
    }

    await Flight.insertMany(flights);
    console.log(`Seeded ${flights.length} flights`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedFlights();