const Joi = require('joi');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected to MongoDB..'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const rentalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },

    isGold: {
        type: Boolean,
        required: true
    },

    phone: {
        type: String,
        minlength: 5,
        maxlength: 10
    },

    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255
    },

    rentalfee: {
        type: Number,
        required: true
    },

    dateReturned: {
        type: Date
    },

    dateOut: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

async function createRental() {
    const rent = new Rental({
        name: 'Car',
        isGold: true,
        phone: '9677012341',
        rentalfee: 60000,
        dateReturned: new Date('2023-10-10'),
        dateOut: new Date('2025-10-10')
    });

    const result = await rent.save();
    console.log(result);
}

createRental();

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });

    return schema.validate(rental);
}

exports.validateRental = validateRental;
exports.Rental = Rental;
