import mongoose from "mongoose";
import tourModel from "../models/tourModel.js";
import TourModel from "../models/tourModel.js";

export const createTour = async (req, res) => {
    
    const tour = req.body
    console.log(tour);
    try {
        const createTour = new TourModel({
            ...tour,
            creator : req.user._id,
            name : req.user.name
        })

        await createTour.save();
        res.status(201).json(createTour)
        
    } catch (error) {
        res.status(404).json({ message : 'something went wrong'})
    }
}

export const getTours = async (req, res) => {
   try {
       const tours = await TourModel.find()
       res.status(200).json(tours)
   } catch (error) {
    res.status(404).json({ message : 'something went wrong'})
   }
}

export const getTour = async(req, res) => {
    try {
        const { id } = req.params;
        const tour = await TourModel.findById(id);
        res.status(200).json(tour)
    } catch (error) {
        res.status(404).json({ message : 'something went wrong'})
    }

}

export const getToursByUser = async(req, res) => {
    console.log('hii');
    try {
        const userTours = await TourModel.find({creator : req.user._id})
        res.status(200).json(userTours)
    } catch (error) {
        res.status(400).json({message : 'something went wrong'})
    }
}

export const deleteTour = async(req, res) => {
    try {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ message : `no tour exist with this ${id}`})
        }
        await tourModel.findByIdAndRemove(id)
        res.status(200).json({ message : "tour deleted successfully"})
    } catch (error) {
        return res.status(404).json({ message : "something went wrong"})
    }
}

export const updateTour = async(req, res) => {
    try {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ message : `no tour exist with this ${id}`})
        }
        const updatedTour = await TourModel.findByIdAndUpdate(id, req.body , {new:true});
        res.status(201).json(updatedTour) 
    } catch (error) {
        return res.status(404).json({ message : "something went wrong"})
    }
}