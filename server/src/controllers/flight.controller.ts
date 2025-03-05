
import { Request, Response } from 'express';
import Flight from '../models/Flight';


export const searchFlights = async (req: Request, res: Response) => {
  try {
    const { from, to, date, passengers = 1 } = req.query;

    if (!from || !to || !date) {
      return res.status(400).json({ message: 'From, to, and date are required parameters' });
    }

    const searchDate = new Date(date as string);
    
    const startDate = new Date(searchDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(searchDate);
    endDate.setHours(23, 59, 59, 999);

    const flights = await Flight.find({
      departureAirport: { $regex: new RegExp(`^${from}`, 'i') },
      arrivalAirport: { $regex: new RegExp(`^${to}`, 'i') },
      departureTime: { $gte: startDate, $lte: endDate }
    }).sort({ price: 1 });

    res.json(flights);
  } catch (error: any) {
    console.error('Search flights error:', error);
    res.status(500).json({ message: error.message || 'Server error searching flights' });
  }
};


export const getFlightById = async (req: Request, res: Response) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.json(flight);
  } catch (error: any) {
    console.error('Get flight by ID error:', error);
    res.status(500).json({ message: error.message || 'Server error getting flight details' });
  }
};


export const createFlight = async (req: Request, res: Response) => {
  try {
    const {
      airline,
      flightNumber,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      price,
      currency = 'USD'
    } = req.body;

    const flight = await Flight.create({
      airline,
      flightNumber,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      price,
      currency
    });

    res.status(201).json(flight);
  } catch (error: any) {
    console.error('Create flight error:', error);
    res.status(500).json({ message: error.message || 'Server error creating flight' });
  }
};
