
const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/test').then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to mongodb...',err))


const genreSchema = new mongoose.Schema({
    name:{type:String , required:true}
})




const Genre = mongoose.model('Genre',genreSchema)

// async function createGenre(){
//     const genre1 = new Genre({
//         name:'Spy'
//     })

//     const genre2 = new Genre({
//         name:'Thriller'
//     })

//     const result1 = await genre1.save()
//     const result2 = await genre2.save()
//     console.log(result1)
//     console.log(result2)
// }

// createGenre()

// async function createGenre1(){
//     const genre2 = new Genre({
//         name:'Science Fiction'
//     })

//     console.log(await genre2.save())
// }

// createGenre1()


async function findGenre(){
    const genre = await Genre.find()
    console.log(genre)
}

findGenre()

exports.Genre = Genre
exports.genreSchema = genreSchema