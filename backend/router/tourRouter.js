import express from 'express'
import { createTour, deleteTour, getTour, getTours, getToursByUser, updateTour } from '../controllers/tourController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/',protect, createTour)

router.get('/', getTours)

router.get('/userTour', protect, getToursByUser);

router.get('/:id', getTour);

router.delete('/:id', protect, deleteTour);

router.put('/:id', protect, updateTour);

export default router