const Review = require('../modelos/review');
const mongoose = require('mongoose');

//get all reviews
const getReviews = async (req, res) =>{
    const Reviews = await Review.find({}).sort({createdAt: -1});
        res.status(200).json(Reviews)
}
//get Game by id
const getReview = async (req, res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'review inexistente'})
    }
    const review = await Review.findById(id)
    if(!review){
        return res.status(404).json({error: 'Review no encontrado'})
    }
    res.status(200).json(review)
}
module.exports = {
    getReviews,
    getReview
}