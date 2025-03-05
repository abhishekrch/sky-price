
import express from 'express';
import { searchFlights, getFlightById, createFlight } from '../controllers/flight.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/search', searchFlights);
router.get('/:id', getFlightById);
router.post('/', protect, createFlight);

export default router;
