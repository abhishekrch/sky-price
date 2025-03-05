
import mongoose, { Document, Schema } from 'mongoose';

export interface IFlight extends Document {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: Date;
  arrivalTime: Date;
  price: number;
  currency: string;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
}

const FlightSchema = new Schema<IFlight>(
  {
    airline: {
      type: String,
      required: [true, 'Airline name is required'],
      trim: true,
    },
    flightNumber: {
      type: String,
      required: [true, 'Flight number is required'],
      trim: true,
    },
    departureAirport: {
      type: String,
      required: [true, 'Departure airport is required'],
      trim: true,
    },
    arrivalAirport: {
      type: String,
      required: [true, 'Arrival airport is required'],
      trim: true,
    },
    departureTime: {
      type: Date,
      required: [true, 'Departure time is required'],
    },
    arrivalTime: {
      type: Date,
      required: [true, 'Arrival time is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'INR'],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },
  },
  {
    timestamps: true,
  }
);


FlightSchema.pre('save', function (next) {
  if (this.departureTime && this.arrivalTime) {
    const durationMs = this.arrivalTime.getTime() - this.departureTime.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    this.duration = `${hours}h ${minutes}m`;
  }
  next();
});

export default mongoose.model<IFlight>('Flight', FlightSchema);
