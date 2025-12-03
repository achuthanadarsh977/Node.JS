

const {Rental , validateRental} = require('./rental')

const {Movie} = require('./movies')

const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected to MongoDB..'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const express = require('express')
const router = express.Router()


router.get('/' , async(req,res) => {
    const rentals = (await Rental.find()).toSorted('-dateOut')
    res.send(rentals)
})

router.post('/' , async(req,res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.movieId) 

    if(!customer) return res.status(400).send('Invalid Customer')
    
    const movie = await Movie.findById(req.body.movieId)
    if(!movie) return res.status(400).send('Invalid Movie')
    
    if(movie.numberInStock === 0) return res.status(400).send('Movie no stock')


    let rental = new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:cusotmer.phone
        },

        movie:{
            _id:movie_id,
            title:movie.title,
            dailyRentalRate: movie.dailyRentalState
        }

    });

    rental = await rental.save()

    movie.numberInStock--
    movie.save()
    
})

