const Joi = require('joi');
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to mongodb...',err))


// Embedded Genre schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalState: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model("Movie", movieSchema);


// async function createMovie(){
//     const movie1 = new Movie({
//         title:'Terminator',
//         genre:{name:'Horror'},
//         numberInStock:100,
//         dailyRentalState:100
//     })

//     const movie2 = new Movie({
//         title:'LionHeart',
//         genre:{name:'Action'},
//         numberInStock:50,
//         dailyRentalState:50
//     })

//    const result1 = await movie1.save()
//    const result2 = await movie2.save()

//    console.log(result1)
//    console.log(result2)
// }

// createMovie()


// async function  createMovie2(){
//       const movie3 = new Movie({
//         title:'Riddick',
//         genre:{name:'Science Fiction'},
//         numberInStock:120,
//         dailyRentalState:120
//       })

//       const movie4 = new Movie({
//         title:'Seven',
//         genre:{name:'Thriller'},
//         numberInStock:140,
//         dailyRentalState:140
//       })


//       console.log(await movie3.save())
//       console.log(await movie4.save())
// }

// createMovie2()

async function findMovie(){
    const movie = await Movie.find()
    console.log(movie)
}

findMovie()

// Joi Validation
function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalState: Joi.number().min(0).required()
    });

    return schema.validate(movie);
}


exports.Movie = Movie;
exports.validate = validateMovie;
